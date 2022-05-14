const { DiscordTogether } = require("discord-together");

module.exports = {
    name: "tit",
    aliases: ["y"],
    utilisation: "{prefix}tit",
    voiceChannel: true,
    execute(client, message) {
        client.discordTogether = new DiscordTogether(client);
        if (message.member.voice.channel) {
            client.discordTogether
                .createTogetherCode(message.member.voice.channel.id, "youtube")
                .then(async (invite) => {
                    return message.channel.send(`${invite.code}`);
                });
        }
    },
};
