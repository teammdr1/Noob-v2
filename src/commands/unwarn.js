// src/commands/unwarn.js
const fs = require('fs');
const path = require('path');
const { description } = require('./warn');

const warningsFilePath = path.join(__dirname, '../../data/warnings.json'); // à adapter selon ton arborescence

module.exports = {
    name: 'unwarn',
    description: 'Retire un avertissement d\'un membre spécifique',
    async execute(client, message, args) {
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply("Aucun membre trouvé. Vous devez mentionner un membre.");
        }
        // Charger les avertissements existants
        let warnings = {};
        if (fs.existsSync(warningsFilePath)) {
            try {
                warnings = JSON.parse(fs.readFileSync(warningsFilePath, 'utf8'));
            } catch (error) {
                console.error("Erreur lors de la lecture du fichier warnings.json :", error);
            }
        }
        const memberId = member.id;
        if (!warnings[memberId] || warnings[memberId].length === 0) {
            return message.reply("Ce membre n'a aucun avertissement.");
        }
        // Retirer le dernier avertissement
        warnings[memberId].pop();
        // Sauvegarder les avertissements mis à jour
        try {
            fs.writeFileSync(warningsFilePath, JSON.stringify(warnings, null, 2), 'utf8');
            return message.reply(`Un avertissement a été retiré pour ${member.user.tag}.`);
        } catch (error) {
            console.error("Erreur lors de l'écriture dans le fichier warnings.json :", error);
            return message.reply("Une erreur est survenue lors de la mise à jour des avertissements.");
        }
    },
};