'use client';

interface ValueItem { title: string; description: string; icon?: string }
interface ValuesProps { items: ValueItem[] }

export default function Values({ items = [] }: ValuesProps) {
  if (!items.length) return null;
  return (
    <section className="bg-neutral-50 py-12" aria-labelledby="about-values">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="about-values" className="text-center text-2xl font-display font-bold text-stout-700">Our Values</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((v, i) => (
            <div key={i} className="card bg-white shadow-lg ring-1 ring-brand-100">
              <div className="card-body">
                <div className="flex items-center gap-2">
                  {v.icon ? <span aria-hidden className="text-2xl">{v.icon}</span> : null}
                  <h3 className="card-title text-lg">{v.title}</h3>
                </div>
                <p className="text-sm text-brand-700">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

