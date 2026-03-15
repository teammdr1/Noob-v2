const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'soutien',
    description: 'Comment soutenir le serveur',
    async execute(client, message, args) {
        const embed = new EmbedBuilder()
            .setTitle('🎀 ・Soutenir Bloxet')
            .setDescription(`✨ Tu apprécies le serveur Bloxet et tu souhaites nous soutenir ? Voici comment faire ! ✨

💖 **Mettre /bloxet dans ton statut pour obtenir le rôle exclusif <@&1466127302562939129>** : C’est un petit geste qui nous aide énormément à faire connaître le serveur et à attirer de nouveaux membres.

🌟 **Mettre le tag du serveur** : Porte fièrement le tag du serveur afin de représenter le serveur partout sur Discord.

🚀 **Boost le serveur** : Boost le serveur permet de bénéficier des avantages suivants :
- **Permission image** sur le serveur
- **Un rôle personnalisé** (nom + couleur au choix)

🙏 Un grand merci à tous ceux qui soutiennent le serveur ! :sparkling_heart:`)
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
            .setColor('#fffb00')
        message.channel.send({ embeds: [embed]});
    }
}