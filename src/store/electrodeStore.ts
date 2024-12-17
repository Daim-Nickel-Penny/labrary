import { create } from "zustand";
import type { ElectrodeInput } from "~/types/electrode";

interface ElectrodeState {
  electrodeData: ElectrodeInput;
  setElectrodeData: (data: Partial<ElectrodeInput>) => void;
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
  },
  setElectrodeData: (data) =>
    set((state) => ({
      electrodeData: { ...state.electrodeData, ...data },
    })),
}));
