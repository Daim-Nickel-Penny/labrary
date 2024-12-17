import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useElectrodeStore } from "~/store/electrodeStore";

export function PorosityCalculationsOutputCard() {
  const { calculatedOutputs } = useElectrodeStore();
  return (
    <Card className="w-[280px]">
      <CardHeader>
        <CardTitle className="text-xl text-white/80">Calculations</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="text-xs font-medium text-white/60">
                Mass/Density
                <span className="p-1 font-serif text-xs italic">(AM)</span>
              </div>
              <div className="text-wrap break-words font-mono text-lg font-bold">
                {calculatedOutputs.porosity.am}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-xs font-medium text-white/60">
                Mass/Density
                <span className="p-1 font-serif text-xs italic">(CA)</span>
              </div>
              <div className="text-wrap break-words font-mono text-lg font-bold">
                {calculatedOutputs.porosity.ca}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-xs font-medium text-white/60">
                Mass/Density
                <span className="p-1 font-serif text-xs italic">(B)</span>
              </div>
              <div className="text-wrap break-words font-mono text-lg font-bold">
                {calculatedOutputs.porosity.b}
              </div>
            </div>
          </div>
          <hr className="my-3 w-full border-t border-white/20" />
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="text-xs font-medium text-white/60">
                Sum
                <span className="p-1 font-serif text-xs italic">(AM)</span>
              </div>
              <div className="text-wrap break-words font-mono text-lg font-bold">
                {calculatedOutputs.calculations.sum}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-xs font-medium text-white/60">
                Sum x Mass of Electrode
                <span className="p-1 font-serif text-xs italic">(CA)</span>
              </div>
              <div className="text-wrap break-words font-mono text-lg font-bold">
                {calculatedOutputs.calculations.sumMass}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-xs font-medium text-white/60">
                Volume - (Mass x Sum)
                <span className="p-1 font-serif text-xs italic">(B)</span>
              </div>
              <div className="text-wrap break-words font-mono text-lg font-bold">
                {calculatedOutputs.calculations.volume}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
