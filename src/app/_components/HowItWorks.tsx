// src/app/_components/HowItWorks.tsx
type Step = {
  id: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: '1',
    title: 'Crie sua conta',
    description: 'Crie um login no SWAPP para desbloquear salvamento de presets, builds e configurações.',
  },
  {
    id: '2',
    title: 'Importe seus dados',
    description: 'Use a página de importação para enviar o JSON da sua conta com runas, monstros e artefatos.',
  },
  {
    id: '3',
    title: 'Otimize e acompanhe',
    description: 'Gere builds ideais, compare opções de runas e acompanhe a evolução da sua conta ao longo do tempo.',
  },
];

export default function HowItWorks() {
  return (
    <section className="mt-10 rounded-3xl border border-white/10 bg-black/40 px-6 py-8 md:px-8">
      <h2 className="text-lg font-semibold text-white md:text-xl">
        Como o SWAPP funciona?
      </h2>
      <p className="mt-1 text-sm text-white/60">
        Em poucos passos você conecta sua conta e deixa a IA trabalhar pelas melhores combinações de runas.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.id}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#cbb797]/50 hover:bg-white/[0.06]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#cbb797]/15 text-xs font-semibold text-[#cbb797]">
              {step.id}
            </div>
            <h3 className="mt-3 text-sm font-semibold text-white">{step.title}</h3>
            <p className="mt-1 text-xs text-white/60">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
