export class Config {
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
    this.nicknameMask = nicknameMask || '^\(.*\) .* <.*>$';
    this.minPlayers = minPlayers || 3;
    this.minHealers = minHealers || 1;
    this.minTanks = minTanks || 0;
  }
}

export class QueueResult {
  guildId!: string;
  avId!: number;
  totalPlayers!: number;
  possibleHealers!: number;
  possibleTanks!: number;

  constructor(guildId: string, avId: number) {
    this.guildId = guildId;
    this.avId = avId;
    this.totalPlayers = 0;
    this.possibleHealers = 0;
    this.possibleTanks = 0;
  }
}

