import { Pharmacy } from "../pharmacy/pharmacy";
import { Drug } from "../drugs/drugs";
import { createDrugs } from "./test-utils";

const emptyPharmacy = new Pharmacy();

describe("Pharmacy", () => {
  describe("Pharmacy unit", () => {
    it("should decrease the benefit and expiresIn", () => {
      expect(
        new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()
      ).toEqual([new Drug("test", 1, 2)]);
    });
    it("should decrease the benefit twice as fast when expired", () => {
      expect(
        new Pharmacy([new Drug("test", 0, 3)]).updateBenefitValue()
      ).toEqual([new Drug("test", -1, 1)]);
    });
    it("should not decrease the benefit below 0", () => {
      expect(
        new Pharmacy([new Drug("test", -1, 1)]).updateBenefitValue()
      ).toEqual([new Drug("test", -2, 0)]);
    });
    it("should not increase the benefit above 50", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 2, 50)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 1, 50)]);
    });
    it("should not change the benefit of Magic Pill", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 2, 50)]).updateBenefitValue()
      ).toEqual([new Drug("Magic Pill", 2, 50)]);
    });
    it("should increase the benefit of Herbal Tea", () => {
      const herbalPharmacy = new Pharmacy([new Drug("Herbal Tea", 1, 40)]);
      herbalPharmacy.updateBenefitValue();
      expect(herbalPharmacy).toEqual(
        new Pharmacy([new Drug("Herbal Tea", 0, 41)])
      );
      herbalPharmacy.updateBenefitValue();
      expect(herbalPharmacy).toEqual(
        new Pharmacy([new Drug("Herbal Tea", -1, 43)])
      );
    });

    it("should not trigger anything on an empty pharmacy", () => {
      expect(emptyPharmacy.updateBenefitValue()).toEqual([]);
    });
  });

  describe("Pharmacy integration", () => {
    let pharmacy;
    beforeEach(() => {
      pharmacy = new Pharmacy(Object.values(createDrugs()));
    });
    it("should update the benefit value of all drugs", () => {
      pharmacy.updateBenefitValue();
      expect(pharmacy).toEqual(
        new Pharmacy([
          new Drug("Standard", 1, 29),
          new Drug("Dafalgan", 19, 28),
          new Drug("Fervex", 10, 31),
          new Drug("Herbal Tea", 0, 31),
          new Drug("Magic Pill", 15, 40),
          new Drug("Standard2", 9, 0),
        ])
      );
      pharmacy.updateBenefitValue();
      expect(pharmacy).toEqual(
        new Pharmacy([
          new Drug("Standard", 0, 28),
          new Drug("Dafalgan", 18, 26),
          new Drug("Fervex", 9, 33),
          new Drug("Herbal Tea", -1, 33),
          new Drug("Magic Pill", 15, 40),
          new Drug("Standard2", 8, 0),
        ])
      );
      pharmacy.updateBenefitValue();
      expect(pharmacy).toEqual(
        new Pharmacy([
          new Drug("Standard", -1, 26),
          new Drug("Dafalgan", 17, 24),
          new Drug("Fervex", 8, 35),
          new Drug("Herbal Tea", -2, 35),
          new Drug("Magic Pill", 15, 40),
          new Drug("Standard2", 7, 0),
        ])
      );
    });

    it("should only leave Herbal Tea and Magic Pill with benefits over a long period of time", () => {
      const herbal2 = new Drug("Herbal Tea", 2, 50);
      const magic2 = new Drug("Magic Pill", 2, 2);
      pharmacy.drugs.push(herbal2, magic2);
      for (let i = 0; i < 1000; i++) {
        pharmacy.updateBenefitValue();
      }
      const herbalTea = pharmacy.drugs.filter(
        (drug) => drug.name === "Herbal Tea"
      );
      const magicPills = pharmacy.drugs.filter(
        (drug) => drug.name === "Magic Pill"
      );
      const benefitSum = pharmacy.drugs.reduce((a, b) => a + b.benefit, 0);
      const herbalTeaCount = herbalTea.length;
      const magicPillSum = magicPills
        .filter((drug) => drug.name === "Magic Pill")
        .reduce((a, b) => a + b.benefit, 0);
      expect(herbalTea.reduce((a, b) => a + b.benefit, 0)).toEqual(
        50 * herbalTeaCount
      );

      expect(benefitSum).toEqual(herbalTeaCount * 50 + magicPillSum);
    });
  });
});
