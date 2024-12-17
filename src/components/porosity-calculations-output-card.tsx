import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function PorosityCalculationsOutputCard() {
  return (
    <Card className="w-[280px]">
      <CardHeader>
        <CardTitle className="text-xl text-white/80">Calculations</CardTitle>
      </CardHeader>
      <CardContent>
        <h1>25.43783314</h1>
      </CardContent>
    </Card>
  );
}
