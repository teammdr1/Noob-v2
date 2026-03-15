const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'muterole',
    description: 'Définit le rôle de mute pour le serveur',
    async execute(client, message, args) {
        // Vérification des permissions de l'utilisateur
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.reply("🚫 Vous n'avez pas la permission de gérer les rôles.");
        }
        // Vérification des mentions
        const role = message.mentions.roles.first();
        if (!role) {
            return message.reply("Vous devez mentionner un rôle valide.");
        }
        // Sauvegarde du rôle de mute dans les paramètres du serveur
        const guildSettings = client.guildSettings || new Map();
        guildSettings.set(message.guild.id + '_muterole', role.id);
        client.guildSettings = guildSettings;

        const embed = new EmbedBuilder()
        .setColor('#ffffff')
        .setTitle("Rôle de mute défini avec succès !")
        .setDescription('Le rôle de mute a été défini sur **' + role.name + '**');
        message.channel.send({ embeds: [embed], allowedMentions : { parse: []}});
    },
}