const fetch = require('node-fetch');
const { Client } = require('discord.js');

const defaultApplications = {
  youtube: '880218394199220334', 
  youtubedev: '880218832743055411',
};

/**
 * Class symbolizing a YoutubeTogether
 * @template {Object.<string, string>} T
 */
class DiscordTogether {
  /**
   * Create a new YoutubeTogether
   * @param {Client} client Discord.Client
   * @param {T} applications
   * @example
   * const Discord = require('discord.js');
   * const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
   * const { DiscordTogether } = require('discord-together');
   *
   * client.discordTogether = new DiscordTogether(client);
   *
   * client.on('message', async message => {
   *      if (message.content === 'start') {
   *          client.discordTogether.createTogetherCode(message.member.voice.channelID, 'puttparty').then(async invite => {
   *              return message.channel.send(`${invite.code}`);
   *           });
   *      };
   * });
   *
   * client.login('your token');
   */
  constructor(client, applications = defaultApplications) {
    if (!client) throw new SyntaxError('Invalid Discord.Client !');

    /**
     * Discord.Client
     */
    this.client = client;

    /**
     * Discord Together applications
     */
    this.applications = { ...defaultApplications, ...applications };
  }

  /**
   * Create a Youtube Together invite code (note: send the invite using markdown link)
   * @param {string} voiceChannelId
   * @param {keyof (defaultApplications & T)} option
   * @example
   * client.on('message', async message => {
   *      if (message.content === 'start') {
   *          client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
   *              return message.channel.send(`${invite.code}`); // Click the blue link
   *           });
   *      };
   * });
   * @returns {Promise<{ code: string; }>}
   */
  async createTogetherCode(voiceChannelId, option) {
    /**
     * @param {string} code The invite link (only use the blue link)
     */
    let returnData = {
      code: 'none',
    };
    if (option && this.applications[option.toLowerCase()]) {
      let applicationID = this.applications[option.toLowerCase()];
      try {
        await fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
          method: 'POST',
          body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: applicationID,
            target_type: 2,
            temporary: false,
            validate: null,
          }),
          headers: {
            Authorization: `Bot ${this.client.token}`,
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((invite) => {
            if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
            if (Number(invite.code) === 50013) console.warn('Your bot lacks permissions to perform that action');
            returnData.code = `https://discord.com/invite/${invite.code}`;
          });
      } catch (err) {
        throw new Error('An error occured while starting Youtube together !');
      }
      return returnData;
    } else {
      throw new SyntaxError('Invalid option !');
    }
  }
}

module.exports = DiscordTogether;