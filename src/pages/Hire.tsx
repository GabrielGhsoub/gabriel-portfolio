import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Boxes,
  Cloud,
  Database,
  LayoutPanelTop,
  Mail,
  MapPin,
  ScanSearch,
} from 'lucide-react';

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

const domains = [
  {
    domain: 'Health insurance',
    detail: 'EmblemHealth, legacy claims and rules-engine modernisation',
  },
  {
    domain: 'Government and digital identity',
    detail:
      'Lawyers Syndicate of Lebanon, national digital identity card, 15,000+ holders',
  },
  {
    domain: 'Satellite and telecom',
    detail: 'Intelsat, network telemetry at terabyte scale',
  },
  {
    domain: 'Banking and payments',
    detail:
      'Blom Bank, plus e-wallet and fee processing for a national ID programme',
  },
  {
    domain: 'Property and casualty insurance',
    detail:
      'Current engagement, carrier platform work on Java/Spring and React',
  },
];

const services = [
  {
    icon: Boxes,
    title: 'Legacy modernisation',
    description:
      'Monolith to microservices, without a rewrite that never lands. Strangler-fig migrations, rules-engine extraction, reactive re-architecture.',
    proof:
      'Migrated a monolithic health-insurance claims application with an embedded rules engine onto a BPM platform and reactive Spring WebFlux microservices. Deployment time went from four hours to fifteen minutes.',
  },
  {
    icon: LayoutPanelTop,
    title: 'Platform and portal build',
    description:
      'Customer, partner, and internal portals on Java/Spring Boot and React, with the auth, audit, and role model that regulated environments require.',
    proof:
      'Built eBareau, a national digital identity platform serving 15,000+ users at 99.9% uptime, led end to end with a team of five.',
  },
  {
    icon: Database,
    title: 'High-throughput data systems',
    description:
      'Ingest, timeseries storage, and analytics for telemetry and event streams.',
    proof:
      'Terabyte-scale satellite telemetry pipeline enabling predictive analytics that removed 15+ hours of manual analysis every week.',
  },
  {
    icon: Cloud,
    title: 'Cloud, IaC and delivery pipelines',
    description:
      'Terraform, Kubernetes, GitLab, Jenkins, GitHub Actions. Getting deployment off the critical path.',
    proof:
      '60% reduction in deployment overhead, with 99.95% uptime sustained in production.',
  },
  {
    icon: ScanSearch,
    title: 'Architecture review and technical due diligence',
    description:
      'An independent read on a system before you commit budget to it, or before you acquire it.',
    proof:
      'Written recommendations and architecture decision records, not a verbal opinion on a call.',
  },
];

const engagements = [
  {
    model: 'Architecture review',
    shape: 'Fixed fee',
    duration: '1 to 2 weeks',
    best: 'Is this design going to hold? Pre-investment diligence.',
  },
  {
    model: 'Build sprint',
    shape: 'Fixed fee, defined scope',
    duration: '2 to 6 weeks',
    best: 'A specific feature, service, integration, or migration phase.',
  },
  {
    model: 'Project delivery',
    shape: 'Fixed fee, milestone-based',
    duration: '2 to 4 months',
    best: 'A portal, platform, or modernisation programme end to end.',
  },
  {
    model: 'Retained advisory',
    shape: 'Monthly, capped hours',
    duration: 'Ongoing',
    best: 'A team that needs senior review, not another pair of hands.',
  },
];

const results = [
  { value: '99.95', suffix: '%', label: 'production uptime' },
  { value: '93', suffix: '%', label: 'faster deployments' },
  { value: '40', suffix: '%', label: 'faster under load' },
  { value: '15,000', suffix: '+', label: 'users on a national platform' },
];

const principles = [
  {
    title: 'Strategy before code',
    body: 'The first deliverable is usually a written recommendation, not a commit.',
  },
  {
    title: 'You own everything',
    body: 'Code, infrastructure, documentation, and the reasoning behind the decisions.',
  },
  {
    title: 'Written by default',
    body: 'Architecture decision records, not tribal knowledge in a call I attended.',
  },
  {
    title: 'Tested by default',
    body: '90% coverage is a habit, not a line item you pay extra for.',
  },
];

const stack = [
  {
    group: 'Backend',
    items:
      'Java · Spring Boot · Spring WebFlux · NestJS · Node.js · GraphQL · Elixir',
  },
  { group: 'Frontend', items: 'React · TypeScript · Next.js · Angular' },
  { group: 'Mobile', items: 'React Native · Expo · SwiftUI' },
  {
    group: 'Data',
    items: 'PostgreSQL · TimescaleDB · MongoDB · MS SQL Server · Redis · dbt',
  },
  {
    group: 'Cloud',
    items: 'AWS · Terraform · Kubernetes · Docker · Helm · GitLab CI · Jenkins',
  },
  {
    group: 'AI',
    items: 'Claude API · OpenAI · LangChain · multi-agent systems',
  },
];

const SectionHeading = ({
  number,
  title,
}: {
  number: string;
  title: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, ease }}
    className="mb-12 flex items-center gap-4"
  >
    <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
      <span className="font-mono text-lg md:text-xl text-accent mr-3 align-middle">
        {number}
      </span>
      {title}
    </h2>
    <div aria-hidden="true" className="h-px flex-1 bg-line" />
  </motion.div>
);

export const Hire = () => {
  return (
    <div className="min-h-screen bg-background text-ink">
      <header className="border-b border-line">
        <div className="container max-w-5xl mx-auto px-6 py-5">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-ink-muted hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            gabrielghsoub.com
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero-backdrop border-b border-line">
          <div className="container max-w-5xl mx-auto px-6 py-20 md:py-28">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-ink-secondary"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                />
                Available for contract work
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-ink"
              >
                Engineering for
                <br />
                <span className="text-accent">regulated systems</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-6 max-w-2xl text-lg text-ink-secondary leading-relaxed"
              >
                I build production software for insurers, banks, and government:
                domains where correctness, auditability, and uptime are
                contractual rather than aspirational. Five years across two
                major insurance carriers, a national digital identity programme,
                a commercial bank, and a satellite network operator.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href="mailto:ghoussoubgabriel@gmail.com?subject=Contract%20engineering%20enquiry"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-medium text-background hover:bg-accent-bright transition-colors"
                >
                  <Mail size={16} aria-hidden="true" />
                  Start a conversation
                </a>
                <span className="inline-flex items-center gap-2 font-mono text-xs text-ink-muted">
                  <MapPin
                    size={14}
                    aria-hidden="true"
                    className="text-accent"
                  />
                  Beirut, Lebanon (UTC+2) · Remote worldwide
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Who I work with */}
        <section className="py-24 md:py-28">
          <div className="container max-w-5xl mx-auto px-6">
            <SectionHeading number="01." title="Who I work with" />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.p
                variants={itemVariants}
                className="mb-10 max-w-2xl text-ink-secondary leading-relaxed"
              >
                Companies whose software carries regulatory, financial, or
                safety weight, where a bug is not a bad review but an audit
                finding. I do not need the domain explained to me, and that is
                most of what you are buying.
              </motion.p>

              <div className="grid gap-3">
                {domains.map((d) => (
                  <motion.div
                    key={d.domain}
                    variants={itemVariants}
                    className="grid gap-1 rounded-xl border border-line bg-surface p-5 hover:border-line-bright transition-colors duration-300 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-6"
                  >
                    <div className="font-display font-semibold text-ink">
                      {d.domain}
                    </div>
                    <div className="text-sm text-ink-secondary">{d.detail}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* What I do */}
        <section className="py-24 md:py-28 border-t border-line">
          <div className="container max-w-5xl mx-auto px-6">
            <SectionHeading number="02." title="What I do" />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid gap-4 md:grid-cols-2"
            >
              {services.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.title}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-6 hover:border-line-bright transition-colors duration-300"
                  >
                    <Icon
                      size={20}
                      aria-hidden="true"
                      className="shrink-0 text-accent"
                    />
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {s.title}
                    </h3>
                    <p className="text-sm text-ink-secondary leading-relaxed">
                      {s.description}
                    </p>
                    <p className="mt-auto border-l-2 border-accent-deep/50 pl-3 text-sm text-ink-muted leading-relaxed">
                      {s.proof}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* How to engage */}
        <section className="py-24 md:py-28 border-t border-line">
          <div className="container max-w-5xl mx-auto px-6">
            <SectionHeading number="03." title="How to engage me" />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.p
                variants={itemVariants}
                className="mb-10 max-w-2xl text-ink-secondary leading-relaxed"
              >
                I work project-based, which means you buy an outcome rather than
                a calendar.
              </motion.p>

              <div className="grid gap-4 md:grid-cols-2">
                {engagements.map((e) => (
                  <motion.div
                    key={e.model}
                    variants={itemVariants}
                    className="rounded-xl border border-line bg-surface p-6 hover:border-line-bright transition-colors duration-300"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-ink">
                        {e.model}
                      </h3>
                      <span className="font-mono text-xs text-accent">
                        {e.duration}
                      </span>
                    </div>
                    <div className="mt-1 font-mono text-xs text-ink-muted">
                      {e.shape}
                    </div>
                    <p className="mt-3 text-sm text-ink-secondary leading-relaxed">
                      {e.best}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                className="mt-6 grid gap-6 rounded-xl border border-line-bright bg-elevated p-6 sm:grid-cols-3"
              >
                <div>
                  <div className="font-mono text-xs text-ink-muted">Rate</div>
                  <div className="mt-1 font-display text-2xl font-semibold text-ink">
                    $75
                    <span className="text-accent">/hr</span>
                  </div>
                  <div className="mt-1 text-xs text-ink-muted">
                    Fixed-fee quotes on scoped work
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xs text-ink-muted">
                    Availability
                  </div>
                  <div className="mt-1 text-sm text-ink-secondary">
                    Taking on new work now. Timeline discussed per engagement.
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xs text-ink-muted">
                    Payment
                  </div>
                  <div className="mt-1 text-sm text-ink-secondary">
                    USD invoicing. International transfer by SWIFT, Deel, or
                    Wise.
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Results */}
        <section className="py-24 md:py-28 border-t border-line">
          <div className="container max-w-5xl mx-auto px-6">
            <SectionHeading number="04." title="Selected results" />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-2 gap-4 md:grid-cols-4"
            >
              {results.map((r) => (
                <motion.div
                  key={r.label}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-line bg-surface p-5 hover:border-line-bright transition-colors duration-300"
                >
                  <div className="font-display text-2xl md:text-3xl font-semibold text-ink">
                    {r.value}
                    <span className="text-accent">{r.suffix}</span>
                  </div>
                  <div className="mt-1 font-mono text-xs text-ink-muted">
                    {r.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mt-10 grid gap-4 md:grid-cols-2"
            >
              {principles.map((p) => (
                <motion.div
                  key={p.title}
                  variants={itemVariants}
                  className="border-l-2 border-line pl-4"
                >
                  <div className="font-display font-semibold text-ink">
                    {p.title}
                  </div>
                  <p className="mt-1 text-sm text-ink-secondary leading-relaxed">
                    {p.body}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stack */}
        <section className="py-24 md:py-28 border-t border-line">
          <div className="container max-w-5xl mx-auto px-6">
            <SectionHeading number="05." title="Stack" />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid gap-3"
            >
              {stack.map((s) => (
                <motion.div
                  key={s.group}
                  variants={itemVariants}
                  className="grid gap-1 border-b border-line pb-3 md:grid-cols-[minmax(0,8rem)_1fr] md:gap-6"
                >
                  <div className="font-mono text-xs text-accent">{s.group}</div>
                  <div className="text-sm text-ink-secondary">{s.items}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 border-t border-line">
          <div className="container max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
                Start here
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-ink-secondary leading-relaxed">
                Send me the problem in a paragraph. If it is something I can
                help with, you get a written scoping note: what I would do, in
                what order, what it costs, and what could go wrong, before you
                commit to anything.
              </p>
              <a
                href="mailto:ghoussoubgabriel@gmail.com?subject=Contract%20engineering%20enquiry"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-background hover:bg-accent-bright transition-colors"
              >
                <Mail size={16} aria-hidden="true" />
                ghoussoubgabriel@gmail.com
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-8">
        <div className="container max-w-5xl mx-auto px-6 text-center font-mono text-xs text-ink-muted">
          Gabriel Ghoussoub · Beirut, Lebanon ·{' '}
          <a href="/" className="hover:text-accent transition-colors">
            gabrielghsoub.com
          </a>
        </div>
      </footer>
    </div>
  );
};
