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

  updateBenefitValue() {
    let { name, expiresIn, benefit } = this;

    expiresIn--;

    switch (name) {
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
  }
}
