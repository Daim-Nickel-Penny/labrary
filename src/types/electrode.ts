export interface ElectrodeInput {
  thickness: {
    coatedElectrode: number;
    foil: number;
    material: number;
  };
  mass: {
    electrodeWithFoil: number;
    foil: number;
    electrode: number;
  };
  dimensions: {
    length: number;
    breadth: number;
    area: number;
    volume: number;
  };
  materialFractions: {
    activeMaterial: number;
    carbonAdditive: number;
    binder: number;
  };
  densities: {
    activeMaterial: number;
    carbonAdditive: number;
    binder: number;
  };
  massMg: number;
}
