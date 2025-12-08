interface StoryCommitment {
  title: string;
  description: string;
}

interface StoryNote {
  eyebrow?: string;
  title: string;
  copy: string;
  footer?: string;
}

interface StorySectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
  commitments?: StoryCommitment[];
  note?: StoryNote;
}

export default function StorySection({
  eyebrow = 'Our story',
  title = 'Neighbourhood roots',
  subtitle,
  paragraphs = [],
  commitments = [],
  note,
}: StorySectionProps) {
  const safeParagraphs = paragraphs.length ? paragraphs : [
    'Built as a 1930s corner pub, the house has welcomed generations of Cambridge neighbours for matchdays, Sunday roasts, and every toast in between.',
  ];

  const safeCommitments = commitments.length
    ? commitments
    : [
        {
          title: 'Community living room',
          description: 'Inclusive space for family lunches, late kick-offs, and solo pints at the marble bar.',
        },
        {
          title: 'Nepalese warmth',
          description: 'Himali chefs layer momo steam and charcoal grill smoke with proper pub hospitality.',
        },
        {
          title: 'Art-deco soul',
          description: 'Curved glass, brass rails, and soft glows restored with modern comfort in mind.',
        },
      ];

  const noteCard = note ?? {
    eyebrow: 'Neighbourhood promise',
    title: 'Come hungry, leave as family',
    copy: 'We keep tables for walk-ins, hold the matchday sound, and pour pints the way regulars prefer.',
    footer: '— Team Lapen Inns',
  };

  return (
    <section className="bg-gradient-to-b from-brand-25 via-white to-brand-100 py-16 text-brand-900 sm:py-20" aria-labelledby="about-story">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-6 rounded-[2.5rem] border border-brand-100 bg-white/95 p-6 shadow-2xl sm:p-9">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-500">{eyebrow}</p>
              <div>
                <h2 id="about-story" className="text-3xl font-display font-bold text-stout-800 sm:text-4xl">
                  {title}
                </h2>
                {subtitle ? (
                  <p className="mt-2 text-lg font-semibold text-accent-600">{subtitle}</p>
                ) : null}
              </div>
            </div>
            <div className="prose prose-brand max-w-none text-brand-700">
              {safeParagraphs.map((paragraph, idx) => (
                <p key={`story-paragraph-${idx}`}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-brand-100 bg-white p-6 shadow-xl">
              {noteCard.eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-500">{noteCard.eyebrow}</p>
              ) : null}
              <h3 className="mt-2 text-2xl font-display font-semibold text-stout-800">
                {noteCard.title}
              </h3>
              <p className="mt-3 text-brand-600">{noteCard.copy}</p>
              {noteCard.footer ? (
                <p className="mt-4 text-sm font-semibold text-brand-500">{noteCard.footer}</p>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {safeCommitments.map((commitment, idx) => (
                <article
                  key={`story-commitment-${idx}`}
                  className="rounded-2xl border border-brand-100 bg-brand-50/80 p-4 shadow-inner"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-500">0{idx + 1}</p>
                  <h4 className="mt-2 text-lg font-semibold text-stout-800">{commitment.title}</h4>
                  <p className="mt-1 text-sm text-brand-600">{commitment.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
