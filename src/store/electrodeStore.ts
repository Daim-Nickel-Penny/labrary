import { create } from "zustand";
import type { ElectrodeInput } from "~/types/electrode";

interface ElectrodeCalculatedOutputs {
  porosity: {
    am: number;
    ca: number;
    b: number;
  };
  calculations: {
    sum: number;
    sumMass: number;
    volume: number;
  };
}
interface ElectrodeState {
  electrodeData: ElectrodeInput;
  calculatedOutputs: ElectrodeCalculatedOutputs;
  setElectrodeData: (data: Partial<ElectrodeInput>) => void;
  setCalculatedOutputs: (data: Partial<ElectrodeCalculatedOutputs>) => void;
}

export const useElectrodeStore = create<ElectrodeState>((set) => ({
  electrodeData: {
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
    materialFractions: {
      activeMaterial: 0,
      carbonAdditive: 0,
      binder: 0,
    },
    densities: {
      activeMaterial: 0,
      carbonAdditive: 0,
      binder: 0,
    },
    massMg: 0,
    outputs: {
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
    },
  },
  calculatedOutputs: {
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
  },
  setElectrodeData: (data) =>
    set((state) => ({
      electrodeData: { ...state.electrodeData, ...data },
    })),

  setCalculatedOutputs: (data) =>
    set((state) => ({
      calculatedOutputs: { ...state.calculatedOutputs, ...data },
    })),
}));
