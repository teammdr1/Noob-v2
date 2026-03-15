const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'notifs',
    description: 'Affiche un message concernant les notifications',
    async execute(client, message, args) {
        const embed = new EmbedBuilder()
            .setTitle('🎭 ・Comment avoir des rôles sur le serveur ?')
            .setDescription(`Pour modifier vos rôles, veuillez vous rendre ici sur le serveur : <id:customize> et cliquer sur les différentes réactions pour obtenir les rôles que vous souhaitez !`)
            .setImage('https://cdn.discordapp.com/attachments/1466128067947794586/1478359079825969172/Capture_decran_2026-03-03_115216.png?ex=69a81caf&is=69a6cb2f&hm=14fa94cb6d28385d664d13fccbf96a36ed97927008644f1a9b810bd6310e2c90&')
            .setColor('#fffb00')
        message.channel.send({ embeds: [embed]});
    }
}