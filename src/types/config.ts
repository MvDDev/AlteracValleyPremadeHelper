export default class Config {
  postResultsDelay!: number;
  avIdMax!: number;
  numbersChannel!: string;
  nicknameMask!: string;
  minPlayers!: number;
  minHealers!: number;
  minTanks!: number;

  constructor(postResultsDelay?: number, avIdMax?: number, numbersChannel?: string, nicknameMask?: string, minPlayers?: number, minHealers?: number, minTanks?: number) {
    this.postResultsDelay = postResultsDelay || 3000;
    this.avIdMax = avIdMax || 200;
    this.numbersChannel = numbersChannel || 'numbers';
    this.nicknameMask = nicknameMask || '^\((?<role>.*)\) .* <.*>$';
    this.minPlayers = minPlayers || 2;
    this.minHealers = minHealers || 1;
    this.minTanks = minTanks || 0;
  }
}