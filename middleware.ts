import { NextRequest, NextResponse } from 'next/server';
import { getProductionConfig } from './src/lib/config/production';
import { cdnOptimizationMiddleware } from './src/lib/cdnStrategy';

// Define a minimal local type to avoid coupling to optional package types
type CreateMiddlewareClientFn = (args: { req: any; res: any }) => {
  auth: { getSession: () => Promise<unknown> };
};

const loggedSupabaseWarnings = new Set<'missing-env' | 'unsupported-runtime' | 'import-error'>();
let supabaseClientLoader: Promise<CreateMiddlewareClientFn | null> | null = null;

function cleanEnvValue(value?: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed === 'undefined' || trimmed === 'null') {
    return null;
  }
  return trimmed;
}

function hasSupabaseCredentials(): boolean {
  const url = cleanEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const anon = cleanEnvValue(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const service = cleanEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY);
  return Boolean(url && (anon || service));
}

function isEdgeRuntime(): boolean {
  const globalAny = globalThis as { EdgeRuntime?: string };
  return typeof globalAny.EdgeRuntime !== 'undefined' || process.env.NEXT_RUNTIME === 'edge';
}

async function loadSupabaseMiddlewareClient(): Promise<CreateMiddlewareClientFn | null> {
  if (supabaseClientLoader) {
    return supabaseClientLoader;
  }
  // Use a computed specifier so bundlers don't resolve an optional dependency
  const spec = ['@supabase', 'auth-helpers-nextjs'].join('/');
  supabaseClientLoader = import(spec)
    .then((mod: any) => mod.createMiddlewareClient as CreateMiddlewareClientFn)
    .catch((error): CreateMiddlewareClientFn | null => {
      if (!loggedSupabaseWarnings.has('import-error')) {
        console.warn('Supabase middleware disabled: package could not be loaded.', error);
        loggedSupabaseWarnings.add('import-error');
      }
      return null;
    });

  return supabaseClientLoader;
}

function logSupabaseSkip(reason: 'missing-env' | 'unsupported-runtime') {
  if (loggedSupabaseWarnings.has(reason)) {
    return;
  }

  const messages: Record<typeof reason, string> = {
    'missing-env': 'Supabase middleware disabled: required env vars are missing.',
    'unsupported-runtime': 'Supabase middleware disabled: auth helpers are not supported on the Edge runtime.',
  };

  console.info(messages[reason]);
  loggedSupabaseWarnings.add(reason);
}

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  // Supabase auth middleware - only use in Node.js runtime
  const supabaseReady = hasSupabaseCredentials();
  const edge = isEdgeRuntime();

  if (!supabaseReady) {
    logSupabaseSkip('missing-env');
  } else if (edge) {
    logSupabaseSkip('unsupported-runtime');
  } else {
    try {
      const createClient = await loadSupabaseMiddlewareClient();
      if (createClient) {
        const supabase = createClient({ req: request, res });
        await supabase.auth.getSession();
      }
    } catch (err: any) {
      console.warn('Supabase middleware skipped:', err?.message || err);
    }
  }

  // Apply CDN optimization middleware first
  const cdnResponse = cdnOptimizationMiddleware(request);
  if (cdnResponse !== NextResponse.next()) {
    return cdnResponse;
  }

  const config = getProductionConfig();
  const { pathname } = request.nextUrl;
  
  // Apply to all API routes under /api/*
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Rate limiting check
  if (config.rateLimiting.enabled) {
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitKey = `rate_limit:${clientIP}`;
    
    // In production, you'd use Redis or similar for distributed rate limiting
    // For now, we'll let the API endpoints handle rate limiting
  }
  
  // Security headers for content API
  const response = NextResponse.next();
  
  // Add security headers
  if (config.environment === 'prod') {
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }
  
  // CORS configuration for API routes (centralized)
  const origin = request.headers.get('origin');
  if (config.allowedOrigins.length > 0 && origin && (config.allowedOrigins.includes('*') || config.allowedOrigins.includes(origin))) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Environment, X-Content-Version, Authorization');
    response.headers.set('Access-Control-Max-Age', '86400');
    // Expose useful headers to the browser
    response.headers.set('Access-Control-Expose-Headers', 'etag,last-modified,x-request-id,x-load-time,x-cached,x-source');
  }
  
  // Performance headers
  response.headers.set('X-Environment', config.environment);
  response.headers.set('X-Content-System', 'modular');
  response.headers.set('X-Content-Version', config.contentVersion);
  
  // Compression hint
  if (config.caching.compression && request.headers.get('accept-encoding')?.includes('gzip')) {
    response.headers.set('Vary', 'Accept-Encoding');
  }
  
  // If this is a preflight request, respond here centrally to avoid having to add
  // OPTIONS handlers to every API route. Return 204 No Content.
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: response.headers });
  }

  return response;
}

// Configure middleware to run only on API routes to avoid Edge Runtime issues
export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
