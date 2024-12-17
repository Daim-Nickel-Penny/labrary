import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function PorosityCalculationsOutputCard() {
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
                0.635135
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-xs font-medium text-white/60">
                Mass/Density
                <span className="p-1 font-serif text-xs italic">(CA)</span>
              </div>
              <div className="text-wrap break-words font-mono text-lg font-bold">
                0.3125
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-xs font-medium text-white/60">
                Mass/Density
                <span className="p-1 font-serif text-xs italic">(B)</span>
              </div>
              <div className="text-wrap break-words font-mono text-lg font-bold">
                0.00555
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
                0.9531
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-xs font-medium text-white/60">
                Sum x Mass of Electrode
                <span className="p-1 font-serif text-xs italic">(CA)</span>
              </div>
              <div className="text-wrap break-words font-mono text-lg font-bold">
                0.00943
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-xs font-medium text-white/60">
                Volume - (Mass x Sum)
                <span className="p-1 font-serif text-xs italic">(B)</span>
              </div>
              <div className="text-wrap break-words font-mono text-lg font-bold">
                0.003
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
