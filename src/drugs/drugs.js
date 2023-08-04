import { drugBaseConfig } from "./config";

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  increaseBenefit(amount) {
    const { maxBenefit } = drugBaseConfig;
    return Math.min(maxBenefit, this.benefit + amount);
  }

  decreaseBenefit(amount) {
    const { minBenefit } = drugBaseConfig;
    return Math.max(minBenefit, this.benefit - amount);
  }

  validateBenefit() {
    const { minBenefit, maxBenefit } = drugBaseConfig;
    if (this.benefit < minBenefit)
      throw new Error("Benefit cannot be negative");
    if (this.benefit > maxBenefit)
      throw new Error("Benefit cannot be greater than 50");
  }

  updateBenefitValue() {
    let { name, expiresIn, benefit } = this;

    expiresIn--;

    switch (name) {
      case "Dafalgan":
        if (expiresIn < 0) benefit = this.decreaseBenefit(4);
        else benefit = this.decreaseBenefit(2);
        break;
      case "Fervex":
        if (expiresIn > 9) benefit = this.increaseBenefit(1);
        else if (expiresIn > 4) benefit = this.increaseBenefit(2);
        else if (expiresIn >= 0) benefit = this.increaseBenefit(3);
        else benefit = 0;
        break;
      case "Herbal Tea":
        if (expiresIn < 0) benefit = this.increaseBenefit(2);
        else benefit = this.increaseBenefit(1);
        break;
      case "Magic Pill":
        expiresIn++;
        break;
      default:
        if (expiresIn < 0) benefit = this.decreaseBenefit(2);
        else benefit = this.decreaseBenefit(1);
        break;
    }
    this.expiresIn = expiresIn;
    this.benefit = benefit;
    this.validateBenefit();
  }
}
