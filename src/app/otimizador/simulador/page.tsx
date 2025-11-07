import AtbSimulatorPanel from "../../../components/AtbSimulatorPanel";

export const metadata = {
  title: "Simulador ATB • SWAPP",
};

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Simulador de Velocidade (ATB)</h1>
      <p className="opacity-70">Monte 2 aliados e 1 inimigo (exemplo) e veja a ordem dos turnos.</p>
      <AtbSimulatorPanel />
    </div>
  );
}
