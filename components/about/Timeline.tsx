'use client';

interface TimelineItem { period: string; title: string; description: string }
interface TimelineStat { label: string; value: string; description?: string }
interface TimelineProps { items: TimelineItem[]; intro?: string; stats?: TimelineStat[] }

export default function Timeline({ items = [], intro, stats = [] }: TimelineProps) {
  if (!items.length) return null;
  return (
    <section className="bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 py-16 text-white" aria-labelledby="about-milestones">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Since 1930</p>
                <h2 id="about-milestones" className="mt-2 text-3xl font-display font-bold text-white">Corner House milestones</h2>
                {intro ? (
                  <p className="mt-3 text-white/80">{intro}</p>
                ) : (
                  <p className="mt-3 text-white/70">
                    Art-deco beginnings, CAMRA recognition, and a full Nepalese relaunch – a few highlights from Newmarket Road.
                  </p>
                )}
              </div>
              {stats.length ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {stats.slice(0, 4).map((stat) => (
                    <div key={stat.label} className="rounded-3xl border border-white/15 bg-white/10 p-4 shadow-lg">
                      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">{stat.label}</p>
                      <p className="text-3xl font-display font-bold text-white">{stat.value}</p>
                      {stat.description ? <p className="text-sm text-white/70">{stat.description}</p> : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="relative pl-5" aria-labelledby="about-milestones">
              <div className="absolute left-1 top-1 bottom-1 w-0.5 bg-white/25" aria-hidden="true" />
              <ol className="space-y-5">
                {items.map((it, i) => (
                  <li key={i} className="relative">
                    <div className="absolute left-0 top-3 h-3 w-3 -translate-x-1 rounded-full bg-accent-200" aria-hidden="true" />
                    <div className="ml-6 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg">
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-100">{it.period}</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{it.title}</h3>
                      <p className="mt-1 text-sm text-white/85">{it.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

