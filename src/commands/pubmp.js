const { EmbedBuilder} = require('discord.js');
module.exports = {
    name: 'pubmp',
    description: 'Message d\'embed informatif sur la pub mp',
    async execute(client, message, args) {
        const embed = new EmbedBuilder()
            .setTitle('<:FlecheBackup:1474444354335543327> En cas de PUB MP, veuillez indiquer les informations suivantes :')
            .setDescription(`<:pointbleu:1474444379501629732>Identifiant du pubeur
<:pointbleu:1474444379501629732>Screen/Preuve de la pub

Une fois que vous avez fait cela, patientez le temps qu'un <@&1466126415345746165> / <@&1466126309217276201> s'occupe de vous !`)
            .setColor('#2f3136')
        message.channel.send({ embeds: [embed]});
    }
}