import * as Discord from 'discord.js';

export default async function sendNamingRules(message: Discord.Message) {
  const instructionText = 'Your nickname is invalid, change it to the following convention "(Role) Name <Realm>" and press ctrl-r.\r\nFor full details please read the #rules channel.';

  try {
    message.author.send(instructionText);
  }
  catch (error) {
    console.error(`Could not send DM to ${message.author.tag}.\n`, error);
    message.reply(instructionText);
  }
}
