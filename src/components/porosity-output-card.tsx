import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Button } from "./ui/button";

export function PorosityOutputCard() {
  return (
    <Card className="w-[280px]">
      <CardHeader>
        <CardTitle className="text-xl text-white/80">
          Porosity of Electrode
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className="p-2 font-mono text-4xl font-semibold text-white/80">
          25.43783314
        </h1>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Clear All</Button>
        <Button variant="default">Calculate</Button>
      </CardFooter>
    </Card>
  );
}
