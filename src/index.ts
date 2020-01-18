import * as Discord from 'discord.js';
import handleNumber from './commands/handle-number';
import sendNamingRules from './common/send-naming-rules';
import postQueueResults from './common/post-queue-results';
import QueueResult from './types/queue-result';
import Config from './types/config';
import { loginKey } from './secret';

interface TimeoutDictionary {
  [index: string]: NodeJS.Timeout;
}

const config = new Config();
const client = new Discord.Client();
let queueResults: QueueResult[] = [];
const postQueueResultsTimeouts: TimeoutDictionary = {};

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {

  // Only parse numbers in the configured channel
  // <any> is a hack to work around missing definition in discord.js typescript types
  if ((<any>message.channel).name === config.numbersChannel) {

    // Was a number posted?
    if (message.content.match(/^(\d{1,3})$/)) {
      if (Number(message.content) > 0 && Number(message.content) < config.avIdMax) {
        // Check if poster has a valid Discord nickname, if not DM with instruction to change it
        if (!message.member.nickname?.match(RegExp(config.nicknameMask))) {
          sendNamingRules(message);
        }
        // Add number and player information to results
        handleNumber(message, queueResults, config);

        // Wait for followup numbers, if none received during timeout window post results
        const guildId = message.guild.id;
        if (postQueueResultsTimeouts[guildId]) clearTimeout(postQueueResultsTimeouts[guildId]);
        postQueueResultsTimeouts[guildId] = setTimeout(() => {
          postQueueResults(message, queueResults, config);
          // Clear out QueueResults for this guild
          queueResults = queueResults.filter(qr => qr.guildId != message.guild.id);
        }, config.postResultsDelay);
      }
    }

  }

});

client.login(loginKey);