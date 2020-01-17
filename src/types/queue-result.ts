export default class QueueResult {
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