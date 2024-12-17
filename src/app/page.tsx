import { DensityCard } from "~/components/DensityCard";
import { DimensionCard } from "~/components/DimensionCard";
import { MassCard } from "~/components/MassCard";
import { MaterialFractionCard } from "~/components/MaterialFractionCard";
import { MgMassCard } from "~/components/MgMassCard";
import { ThicknessCard } from "~/components/ThicknessCard";

export default function HomePage() {
  return (
    //show a 2 row grid with a left and right column and centered cells
    <main className="grid grid-cols-3 gap-4 p-4">
      <ThicknessCard />
      <MassCard />
      <DimensionCard />
      <MaterialFractionCard />
      <DensityCard />
      <MgMassCard />

      {/* <Button variant={"ghost"}>Button</Button> */}
    </main>
  );
}
