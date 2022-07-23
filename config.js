module.exports = {
    TOKEN: process.env.TOKEN,
    px: "::",
    playing: "❤️",

    opt: {
        DJ: {
            enabled: false, //IF YOU WANT ONLY DJS TO USE IT, set false to true.
            roleName: "DJ",
            commands: [
                "back",
                "clear",
                "filter",
                "loop",
                "pause",
                "resume",
                "skip",
                "stop",
                "volume",
            ],
        },
        maxVol: 250,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: "highestaudio",
                highWaterMark: 1 << 25,
            },
        },
    },
};