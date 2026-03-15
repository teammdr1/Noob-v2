const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'roblox-game',
    description: 'Affiche les informations d’un jeu Roblox avec son lien',

    async execute(client, message, args) {

        if (!args[0]) {
            return message.reply("❌ Utilisation : `+roblox-game <lien-du-jeu>`");
        }

        const url = args[0];

        const match = url.match(/roblox\.com\/games\/(\d+)/);

        if (!match) {
            return message.reply("❌ Lien Roblox invalide.");
        }

        const placeId = match[1];

        try {

            // placeId -> universeId
            const uniRes = await fetch(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);
            const uniData = await uniRes.json();

            const universeId = uniData.universeId;

            // infos du jeu
            const gameRes = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`);
            const gameData = await gameRes.json();

            if (!gameData.data || !gameData.data.length) {
                return message.reply("❌ Impossible de récupérer ce jeu.");
            }

            const game = gameData.data[0];

            // image du jeu
            const thumbRes = await fetch(`https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&size=512x512&format=Png`);
            const thumbData = await thumbRes.json();
            const thumbnail = thumbData.data[0].imageUrl;

            const embed = new EmbedBuilder()
                .setTitle(`🎮 ${game.name}`)
                .setURL(`https://www.roblox.com/games/${placeId}`)
                .setDescription(game.description || "Aucune description.")
                .setThumbnail(thumbnail)
                .addFields(
                    { name: "Créateur", value: game.creator.name, inline: true },
                    { name: "Joueurs actifs", value: `${game.playing}`, inline: true },
                    { name: "Visites", value: `${game.visits}`, inline: true },
                    { name: "Likes", value: `${game.upVotes}`, inline: true }
                )
                .setColor("#00A2FF")
                .setFooter({ text: "Roblox Game Info" })
                .setTimestamp();

            message.channel.send({ embeds: [embed] });

        } catch (err) {
            console.error(err);
            message.reply("❌ Impossible de récupérer les informations du jeu.");
        }

    }
};