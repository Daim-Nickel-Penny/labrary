"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Button } from "./ui/button";
import { useElectrodeStore } from "~/store/electrodeStore";
import { useRouter } from "next/navigation";

export function PorosityOutputCard() {
  const {
    electrodeData,
    setElectrodeData,
    calculatedOutputs,
    setCalculatedOutputs,
  } = useElectrodeStore();

  const router = useRouter();

  const calculateElectrodeDimensions = () => {
    const { length, breadth } = electrodeData.dimensions;
    const { coatedElectrode, foil, material } = electrodeData.thickness;

    const area = length * breadth;
    const volume = area * material;

    return { area, volume, thickness: material };
  };

  const calculateElectrodeMass = () => {
    const { electrodeWithFoil, foil } = electrodeData.mass;
    return electrodeWithFoil - foil; // mass of electrode material
  };

  const calculatePorosity = (volume: number, electrodeMass: number) => {
    const { activeMaterial, carbonAdditive, binder } =
      electrodeData.materialFractions;
    const {
      activeMaterial: rhoAM,
      carbonAdditive: rhoCA,
      binder: rhoB,
    } = electrodeData.densities;

    // True density (weighted average of material fractions)
    const trueDensity =
      activeMaterial * rhoAM + carbonAdditive * rhoCA + binder * rhoB;

    // Electrode density
    const electrodeDensity = electrodeMass / volume;

    // Porosity calculation
    const porosity = 1 - electrodeDensity / trueDensity;

    return {
      porosityAM: 1 - electrodeDensity / rhoAM, // Porosity from active material
      porosityCA: 1 - electrodeDensity / rhoCA, // Porosity from carbon additive
      porosityBinder: 1 - electrodeDensity / rhoB,
      totalPorosity: porosity,
    };
  };

  const handleCalculate = () => {
    console.log("Calculate called");

    console.log(electrodeData);

    // Step 1: Calculate dimensions (area, volume, thickness)
    const { area, volume } = calculateElectrodeDimensions();

    console.log(area, volume);

    // Step 2: Calculate electrode mass
    const electrodeMass = calculateElectrodeMass();

    // Step 3: Set calculated outputs
    setElectrodeData({
      dimensions: { ...electrodeData.dimensions, area, volume },
      mass: { ...electrodeData.mass, electrode: electrodeMass },
    });

    // // Step 4: Calculate porosity
    const porosityResults = calculatePorosity(volume, electrodeMass);

    setCalculatedOutputs({
      porosity: {
        am: porosityResults.porosityAM,
        ca: porosityResults.porosityCA,
        b: porosityResults.porosityBinder,
      },
      calculations: {
        sum: porosityResults.totalPorosity,
        sumMass: electrodeMass,
        volume,
      },
    });
  };

  // Clear all data
  const handleClear = () => {
    setElectrodeData({
      thickness: {
        coatedElectrode: 0,
        foil: 0,
        material: 0,
      },
      mass: {
        electrodeWithFoil: 0,
        foil: 0,
        electrode: 0,
      },
      dimensions: {
        length: 0,
        breadth: 0,
        area: 0,
        volume: 0,
      },
    });
    setCalculatedOutputs({
      porosity: {
        am: 0,
        ca: 0,
        b: 0,
      },
      calculations: {
        sum: 0,
        sumMass: 0,
        volume: 0,
      },
    });

    // router.push("/");
    window.location.reload();
  };

  return (
    <Card className="w-[280px]">
      <CardHeader>
        <CardTitle className="text-xl text-white/80">
          Porosity of Electrode
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className="p-2 font-mono text-4xl font-semibold text-white/80">
          {calculatedOutputs.porosity.am.toFixed(2)}
        </h1>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleClear}>
          Clear All
        </Button>
        <Button variant="default" onClick={handleCalculate}>
          Calculate
        </Button>
      </CardFooter>
    </Card>
  );
}
