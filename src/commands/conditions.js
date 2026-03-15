const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'conditions',
    description: 'Affiche les conditions de partenariat du serveur',
    async execute(client, message, args) {
        const embed = new EmbedBuilder()
            .setTitle('<:1120079773176172675:1466160928801423492> Conditions de partenariat')
            .setDescription(`*<a:FlecheGIF:1474717187544711322> Vous souhaitez faire un partenariat avec notre serveur mais vous ne connaissez pas nos différentes conditions ? Eh bien les voici !*

➟ Si votre serveur compte entre **0 et 400** membres, ce sera une mention @everyone ou @here pour vous et rien pour nous. 

➟ Si votre serveur compte entre **400 et 1500** membres, ce sera une mention @everyone ou @here pour vous et une mention <@&1474717945518096404> pour nous.

➟ Si votre serveur compte entre **1500 et +** membres, ce sera une mention <@&1474717945518096404> des deux côtés.

*Votre serveur remplit une de nos conditions ? Alors n’hésitez pas à créer un <#1466008344417276180> pour qu’un <@&1474717803138388003> vienne s’occuper de vous !*

*<a:1220518742438711387:1472146278220697601> __Remarque__ : Nous ne mentionnerons **jamais** @everyone ou @here. <a:1220518742438711387:1472146278220697601>*`)
            .setColor('#2f3136')
        message.channel.send({ embeds: [embed]});
    }
}