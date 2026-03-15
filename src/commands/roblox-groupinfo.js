const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'roblox-groupinfo',
    description: 'Affiche les infos d’un groupe Roblox',

    async execute(client, message, args) {

        if (!args[0]) {
            return message.reply("❌ Utilisation : `+roblox-groupinfo <groupId>`");
        }

        const groupId = args[0];

        try {

            // infos du groupe
            const res = await fetch(`https://groups.roblox.com/v1/groups/${groupId}`);
            const data = await res.json();

            if (!data.id) {
                return message.reply("❌ Groupe introuvable.");
            }

            // logo du groupe
            const thumbRes = await fetch(`https://thumbnails.roblox.com/v1/groups/icons?groupIds=${groupId}&size=420x420&format=Png`);
            const thumbData = await thumbRes.json();

            const icon = thumbData.data?.[0]?.imageUrl || null;

            const embed = new EmbedBuilder()
                .setTitle(`👥 Groupe Roblox : ${data.name}`)
                .setURL(`https://www.roblox.com/groups/${groupId}`)
                .setDescription(data.description || "Aucune description")
                .addFields(
                    { name: "ID", value: `${data.id}`, inline: true },
                    { name: "Propriétaire", value: data.owner ? data.owner.username : "Aucun", inline: true },
                    { name: "Membres", value: `${data.memberCount}`, inline: true },
                    { name: "Public", value: data.publicEntryAllowed ? "✅ Oui" : "❌ Non", inline: true }
                )
                .setColor("#FF4500")
                .setThumbnail(icon)
                .setFooter({ text: "Roblox Group Info" })
                .setTimestamp();

            message.channel.send({ embeds: [embed] });

        } catch (err) {
            console.error(err);
            message.reply("❌ Impossible de récupérer les infos du groupe.");
        }

    }
};