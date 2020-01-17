import * as Discord from 'discord.js';
import QueueResult from '../types/queue-result';
import Config from '../types/config';

export default async function postQueueResults(message: Discord.Message, queueResults: QueueResult[], config: Config) {
  let avIds = '';
  let playerCounts = '';
  let voiceChannels = '';
  const guildId = message.guild.id;
  const allocatedVoiceChannels: string[] = [];
  // <any> is a hack to work around missing definition in discord.js typescript types
  const availableVoiceChannels = message.guild.channels.filter(c => c.type === 'voice' && c.name.startsWith('AV') && (<any>c).members.size <= 0);
  // availableVoiceChannels.forEach(vc => { vc.createInvite({ maxAge: 300 }).then(invite => message.channel.send(vc.name + ': ' + invite.url)); });

  // Construct queue result strings. Note: <array>.forEach doesnt work with async/await
  for (const qr of queueResults.filter(qr => qr.guildId === guildId)) {
    // Only add to results if viable group
    if (qr.totalPlayers >= config.minPlayers && qr.possibleHealers >= config.minHealers && qr.possibleTanks >= config.minTanks) {
      avIds += '`' + qr.avId + '`\r\n';
      playerCounts += '`';
      playerCounts += qr.totalPlayers.toString().padStart(5);
      playerCounts += qr.possibleTanks.toString().padStart(6);
      playerCounts += qr.possibleHealers.toString().padStart(8);
      playerCounts += '`\r\n';
      // Select 1st available not yet allocated voice channel and create an invite for it
      const chosenChannel = availableVoiceChannels.filter(vc => !allocatedVoiceChannels.includes(vc.id)).first();
      if (chosenChannel) {
        allocatedVoiceChannels.push(chosenChannel.id);
        const invite = await chosenChannel.createInvite({ maxAge: 300 });
        voiceChannels += chosenChannel.name + ': ' + invite.url + '\r\n';
      }
      else {
        voiceChannels += 'No empty voice channel available\r\n';
      }
    }
  }
  // avIds += '`';
  // playerCounts += '`';

  if (avIds.length > 0) {
    const embed = new Discord.RichEmbed()
      // Set the title of the field
      .setTitle('Queue results')
      // Set the color of the embed
      .setColor(0x00FF00)
      .addField('`AV#`', avIds, true)
      .addField('`Total Tanks Healers`', playerCounts, true)
      .addField('`Voice Channel`', voiceChannels, true)
      // Set the footer of the embed
      .setFooter('Note: Tanks and Healers count includes offspec.');
    // Send the embed to the same channel as the message
    message.channel.send(embed);
  } else {
    message.channel.send('No viable groups created.');
  }
  // Clear out QueueResults for this guild
  queueResults = queueResults.filter(qr => qr.guildId != guildId);
}