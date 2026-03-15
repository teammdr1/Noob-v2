const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'alladmins',
    description: 'Affiche la liste des administrateurs du serveur',

    async execute(client, message, args) {
        if (!message.guild) return;

        // Récupérer tous les membres (important si cache incomplet)
        await message.guild.members.fetch();

        // Filtrer ceux qui ont la permission ADMINISTRATOR
        const admins = message.guild.members.cache.filter(member =>
            member.permissions.has(PermissionFlagsBits.Administrator)
        );

        if (admins.size === 0) {
            return message.reply("Aucun administrateur trouvé.");
        }

        const adminList = admins.map(member => `• ${member.user.tag}`).join('\n');

        const embed = new EmbedBuilder()
            .setTitle('📜 Liste des Administrateurs')
            .setDescription(adminList)
            .setColor('#5865F2')
            .setFooter({ text: `Total : ${admins.size} administrateur(s)` })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    }
};