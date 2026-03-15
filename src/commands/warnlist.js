const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'warnlist',
    description: 'Affiche les warnings d’un utilisateur',

    async execute(client, message, args) {

        const member = message.mentions.members.first();
        if (!member) {
            return message.channel.send("Veuillez mentionner un membre.");
        }

        const filePath = path.join(__dirname, '../../data/warnings.json');

        if (!fs.existsSync(filePath)) {
            return message.channel.send("Le fichier warnings.json est introuvable.");
        }

        const warnings = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const userWarnings = warnings[member.id];

        if (!userWarnings || userWarnings.length === 0) {
            return message.channel.send(`${member.user.tag} n'a aucun warning.`);
        }

        let msg = `Warnings de **${member.user.tag}** :\n\n`;

        userWarnings.forEach((warn, index) => {
            const date = new Date(warn.timestamp).toLocaleString("fr-FR");

            msg += `**${index + 1}.** ${warn.reason}\n`;
            msg += `Modérateur : ${warn.moderator}\n`;
            msg += `Date : ${date}\n\n`;
        });

        message.channel.send(msg);
    }
};