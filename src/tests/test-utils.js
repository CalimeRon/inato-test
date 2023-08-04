import { Drug } from "../drugs/drugs";

export const createDrugs = () => ({
  standard: new Drug("Standard", 2, 30),
  dafalgan: new Drug("Dafalgan", 20, 30),
  fervex: new Drug("Fervex", 11, 30),
  herbalTea: new Drug("Herbal Tea", 1, 30),
  magicPill: new Drug("Magic Pill", 15, 40),
  standard2: new Drug("Standard2", 10, 0),
});

export const updateBenefitMultipleTimes = (drug, times) => {
  for (let i = 0; i < times; i++) {
    drug.updateBenefitValue();
  }
  return drug;
};
