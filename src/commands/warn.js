// src/commands/warn.js
const fs = require('fs');
const path = require('path');

const warningsFilePath = path.join(__dirname, '../../data/warnings.json'); // à adapter selon ton arborescence

module.exports = {
  name: 'warn',
  description: 'Avertit un membre avec une raison spécifique',
  async execute(client, message, args) {
    const authorizedRoleIDs = [
      "1466126692660678736"
    ];
    const memberRoles = message.member.roles.cache.map(role => role.id);

    // Vérifie si l'utilisateur est autorisé à utiliser la commande
    const isAuthorized = memberRoles.some(roleID => authorizedRoleIDs.includes(roleID));

    if (!isAuthorized) {
      return message.reply("Vous n'avez pas les permissions nécessaires.");
    }

    const member = message.mentions.members.first();
    if (!member) {
      return message.reply("Aucun membre trouvé. Vous devez mentionner un membre.");
    }

    // Vérifie les rôles (le warneur ne peut pas warn un membre avec rôle supérieur ou égal)
    const memberHighestRole = member.roles.highest;
    const issuerHighestRole = message.member.roles.highest;

    if (memberHighestRole.comparePositionTo(issuerHighestRole) >= 0) {
      return message.reply("Vous ne pouvez pas avertir un membre avec un rôle supérieur ou égal au vôtre.");
    }

    const reason = args.slice(1).join(" ");
    if (!reason) {
      return message.reply("**Aucune raison spécifiée pour l'avertissement.**");
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

    // Ajouter un avertissement
    const warningData = {
      reason: reason,
      moderator: message.author.tag,
      timestamp: Date.now()
    };

    if (!warnings[member.id]) {
      warnings[member.id] = [];
    }
    warnings[member.id].push(warningData);

    // Sauvegarder le fichier JSON
    try {
      fs.writeFileSync(warningsFilePath, JSON.stringify(warnings, null, 4));
    } catch (error) {
      console.error("Erreur lors de l'écriture du fichier warnings.json :", error);
      return message.reply("Une erreur est survenue lors de l'enregistrement de l'avertissement.");
    }

    message.reply(`L'utilisateur ${member.user.tag} a été averti pour la raison suivante : ${reason}.`);

    // Envoi d'un MP au membre averti
    try {
      await member.send(`Vous avez été averti pour la raison suivante : ${reason}.`);
    } catch (error) {
      console.error("Impossible d'envoyer un message privé à ce membre:", error);
    }
  },
};
