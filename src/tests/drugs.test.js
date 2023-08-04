import { createDrugs, updateBenefitMultipleTimes } from "./test-utils";
import { drugBaseConfig } from "../drugs/config"

const { maxBenefit, minBenefit } = drugBaseConfig;

describe("Drug", () => {
  let testDrugs;
  let standard;
  let fervex;
  let herbalTea;
  let magicPill;
  beforeEach(() => {
    testDrugs = createDrugs();
    standard = testDrugs.standard;
    fervex = testDrugs.fervex;
    herbalTea = testDrugs.herbalTea;
    magicPill = testDrugs.magicPill;
  });
  describe("increaseBenefit", () => {
    it("should increase the benefit", () => {
      expect(standard.increaseBenefit(1)).toEqual(31);
    });
    it("should not increase the benefit above the maximum benefit", () => {
      expect(standard.increaseBenefit(100)).toEqual(maxBenefit);
    });
  });
  describe("decreaseBenefit", () => {
    it("should decrease the benefit", () => {
      expect(standard.decreaseBenefit(1)).toEqual(29);
    });
    it("should not decrease the benefit below the minimum", () => {
      expect(standard.decreaseBenefit(100)).toEqual(minBenefit);
    });
  });
  describe("updateBenefitValue", () => {
    describe("Standard drug", () => {
      it("should decrease expiresIn", () => {
        standard.updateBenefitValue();
        expect(standard.expiresIn).toEqual(1);
      });
      it("should decrease the benefit by 1 unit if not expired", () => {
        standard.updateBenefitValue();
        expect(standard.benefit).toEqual(29);
      });
      it("should decrease the benefit by 2 units if expired", () => {
        updateBenefitMultipleTimes(standard, 3);
        expect(standard.benefit).toEqual(26);
      });
    });
    describe("Fervex", () => {
      it("should increase the benefit by 1 unit if expiresIn > 9", () => {
        fervex.updateBenefitValue();
        expect(fervex.benefit).toEqual(31);
      });
      it("should increase the benefit by 2 units if expiresIn <= 9", () => {
        fervex.expiresIn = 10;
        fervex.updateBenefitValue();
        expect(fervex.benefit).toEqual(32);
      });
      it("should increase the benefit by 3 units if expiresIn <= 4", () => {
        fervex.expiresIn = 5;
        fervex.updateBenefitValue();
        expect(fervex.benefit).toEqual(33);
      });
      it("should set the benefit to 0 if expired", () => {
        fervex.expiresIn = 0;
        fervex.updateBenefitValue();
        expect(fervex.benefit).toEqual(0);
      });
    });
    describe("Herbal Tea", () => {
      it("should increase the benefit by 1 unit if not expired", () => {
        herbalTea.updateBenefitValue();
        expect(herbalTea.benefit).toEqual(31);
      });
      it("should increase the benefit by 2 units if expired", () => {
        updateBenefitMultipleTimes(herbalTea, 2);
        expect(herbalTea.benefit).toEqual(33);
      });
    });
    describe("Magic Pill", () => {
      it("should not change the benefit", () => {
        magicPill.updateBenefitValue();
        expect(magicPill.benefit).toEqual(40);
      });
      it("should not change expiresIn", () => {
        magicPill.updateBenefitValue();
        expect(magicPill.expiresIn).toEqual(15);
      });
    });
  });
});
