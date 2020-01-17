import * as Discord from 'discord.js';
import QueueResult from '../types/queue-result';
import Config from '../types/config';


export default async function handleNumber(message: Discord.Message, queueResults: QueueResult[], config: Config) {
  // message.content is a number from 1 to config.avIdMax
  const avId = Number(message.content);
  const guildId = message.guild.id;

  let avIdIndex = queueResults.findIndex(qr => qr.guildId === guildId && qr.avId === avId);
  if (avIdIndex === -1) {
    avIdIndex = queueResults.push(new QueueResult(guildId, avId));
    avIdIndex--;
  }
  // Increase total player count
  queueResults[avIdIndex].totalPlayers++;

  // Check if poster has a valid Discord nickname, extract role (Tank/Healer/DPS) if so
  const roleMatch = message.member.nickname?.match(RegExp(config.nicknameMask));

  // Does the player have the Tank role?
  if (roleMatch?.groups?.role.toUpperCase().includes('T')) {
    // Increase possible tank count
    queueResults[avIdIndex].possibleTanks++;
  }

  // Does the player have the Healer role?
  if (roleMatch?.groups?.role.toUpperCase().includes('H')) {
    // Increase possible healer count
    queueResults[avIdIndex].possibleHealers++;
  }

}
