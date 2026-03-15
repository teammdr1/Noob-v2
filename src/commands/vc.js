const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'vc',
    description: 'Affiche les statistiques du serveur',
    async execute(client, message, args) {
        const guild = message.guild;
        const totalMembers = guild.memberCount;
        const onlineMembers = guild.members.cache.filter(member => 
    member.presence && 
    ['online', 'idle', 'dnd'].includes(member.presence.status)
).size;
        const voiceMembers = guild.members.cache.filter(member => member.voice.channel).size;
        const boosted = guild.premiumSubscriptionCount;

        const embed = new EmbedBuilder()
            .setTitle(`Statistiques du serveur ${guild.name}`)
            .setColor('#fff12d')
            .setDescription(`**<a:6_noob_joyful:1467533348774744196> Membres :** ${totalMembers}\n**<a:verified:1467534350861205763> En ligne :** ${onlineMembers}\n**<a:64456banghead:1469332136413757572> En vocal :** ${voiceMembers}\n**<a:4a_puffheart:1467547912769634398> Boosts :** ${boosted}`)
            .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }));
        message.reply({ embeds: [embed] });
    },
}