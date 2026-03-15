const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  SlashCommandBuilder
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Affiche le menu d’aide avec les catégories et commandes'),

  async execute(interaction) {

    const categories = {
      '🔍・Informations': [
        { name: '+activitystats', description: 'Affiche vos statistiques d\'activité.' },
        { name: '+alladmins', description: 'Liste tous les administrateurs du serveur.' },
        { name: '+allbans', description: 'Affiche le nombre de membres bannis.' },
        { name: '+allbots', description: 'Liste tous les bots du serveur.' },
        { name: '+allchannels', description: 'Affiche tous les salons du serveur.' },
        { name: '+allroles', description: 'Affiche tous les rôles du serveur.' },
        { name: '+banner', description: 'Affiche la bannière d\'un utilisateur.' },
        { name: '+boosts', description: 'Affiche le nombre de boosts du serveur.' },
        { name: '+calcul', description: 'Effectue un calcul mathématique simple.' },
        { name: '+helpall', description: 'Affiche toutes les commandes disponibles.' },
        { name: '+onepage', description: 'Affiche un résumé des commandes disponibles.' },
      ],
      '⚔️・Modération': [
        { name: '+addrole', description: 'Ajoute un rôle à un utilisateur.' },
        { name: '+admin', description: 'Affiche un GIF d\'administration (commande troll).' },
        { name: '+antitoken', description: 'Active la protection contre les tokens.' },
        { name: '+antieveryone', description: 'Empêche les mentions everyone et here.' },
        { name: '+ban', description: 'Bannit un utilisateur du serveur.' },
        { name: '+ban-alt', description: 'Bannit les comptes secondaires détectés.' },
        { name: '+bringall', description: 'Déplace tous les membres vocaux dans votre salon.' },
        { name: '+clear', description: 'Supprime un certain nombre de messages.' },
        { name: '+mute', description: 'Mute un utilisateur sur le serveur.' },
        { name: '+nick', description: 'Change le surnom d\'un utilisateur.' },
        { name: '+purge', description: 'Supprime un certain nombre de messages.' },
        { name: '+removerole', description: 'Retire un rôle à un utilisateur.' },
        { name: '+report', description: 'Signale un utilisateur au staff.' },
        { name: '+roleinfo', description: 'Affiche les informations d\'un rôle.' },
        { name: '+rolelist', description: 'Affiche la liste des rôles du serveur.' },
        { name: '+setnick', description: 'Change le surnom d\'un utilisateur.' },
        { name: '+slowmode', description: 'Active le mode lent dans un salon.' },
        { name: '+timeout', description: 'Bannit temporairement un utilisateur.' },
        { name: '+untimeout', description: 'Lève le bannissement temporaire d\'un utilisateur.' },
        { name: '+unban', description: 'Débannit un utilisateur du serveur.' },
        { name: '+unmute', description: 'Unmute un utilisateur sur le serveur.' },
        { name: '+unmuteall', description: 'Unmute tous les membres du salon vocal.' },
        { name: '+unwarn', description: 'Retire un avertissement à un utilisateur.' },
        { name: '+warn', description: 'Avertit un utilisateur.' },
        { name: '+warnlist', description: 'Affiche la liste des avertissements d\'un utilisateur.' },
      ],
      '🛠・Utilité': [
        { name: '+bringall', description: 'Déplace tous les membres vocaux dans votre salon.' },
        { name: '+bugreport', description: 'Signale un bug au staff.' },
        { name: '+embed', description: 'Crée un embed personnalisé.' },
        { name: '+emoji', description: 'Affiche l\'ID d\'un emoji mentionné.' },
        { name: '+endgiveaway', description: 'Met fin à un giveaway en cours.' },
        { name: '+find', description: 'Affiche le salon vocal où se trouve un membre.' },
        { name: '+giveaway', description: 'Crée un nouveau giveaway.' },
        { name: '+giveawayreroll', description: 'Reroll un gagnant pour un giveaway.' },
        { name: '+help', description: 'Affiche le menu d\'aide.' },
        { name: '+invites-graph', description: 'Affiche un graphique des invitations.' },
        { name: '+invites-top', description: 'Affiche le classement des invitations.' },
        { name: '+nickname', description: 'Change votre surnom sur le serveur.' },
        { name: '+ownermd', description: 'Affiche le préfixe du bot.' },
        { name: '+pblacklist', description: 'Affiche la liste des serveurs blacklistés.' },
        { name: '+perm', description: 'Affiche vos permissions actuelles.' },
        { name: '+piconly', description: 'Définit un salon pour les médias uniquement.' },
        { name: '+reroll', description: 'Reroll un gagnant pour un giveaway.' },
        { name: '+soutien', description: 'Affiche les avantages du rôle de soutien.' },
        { name: '+userinfo', description: 'Affiche des informations sur un utilisateur.' },
        { name: '+vc', description: 'Affiche les statistiques des salons vocaux.' },
      ],
      '🎗️・Misc': [
        { name: '+8ball', description: 'Pose une question et reçois une réponse aléatoire.' },
        { name: '+addlevel', description: 'Ajoute un niveau à un utilisateur.' },
        { name: '+addxp', description: 'Ajoute de l\'XP à un utilisateur.' },
        { name: '+ah', description: 'Affiche un message humoristique.' },
        { name: '+anagramme', description: 'Devine un mot à partir d\'un anagramme.' },
        { name: '+anniversaire-ajouter', description: 'Ajoute un anniversaire à la liste.' },
        { name: '+anniversaire-liste', description: 'Affiche la liste des anniversaires.' },
        { name: '+bingo', description: 'Lance un jeu de bingo.' },
        { name: '+calcul', description: 'Effectue un calcul mathématique simple.' },
        { name: '+changemind', description: 'Affiche une phrase humoristique.' },
        { name: '+chiasse', description: 'Affiche un GIF humoristique.' },
        { name: '+citation', description: 'Affiche une citation aléatoire.' },
        { name: '+claque', description: 'Affiche un GIF de claque.' },
        { name: '+coupable', description: 'Déclare un utilisateur coupable.' },
        { name: '+cry', description: 'Affiche un GIF de pleurs pour un utilisateur.' },
        { name: '+dissection', description: 'Affiche un GIF de dissection.' },
        { name: '+donation', description: 'Faites une donation à un utilisateur.' },
        { name: '+eveil', description: 'Affiche un GIF d\'éveil.' },
        { name: '+extension', description: 'Affiche un GIF d\'extension.' },
        { name: '+fight', description: 'Lance un mini-jeu de combat.' },
        { name: '+gay', description: 'Calcule un pourcentage humoristique.' },
        { name: '+lc', description: 'Calcule un pourcentage d\'amour entre deux utilisateurs.' },
        { name: '+level', description: 'Affiche votre niveau actuel.' },
        { name: '+leveltop', description: 'Affiche le classement des niveaux.' },
        { name: '+math', description: 'Pose une question mathématique.' },
        { name: '+meteo', description: 'Affiche une météo aléatoire.' },
        { name: '+pat', description: 'Affiche un GIF de tapotement.' },
        { name: '+pileface', description: 'Lance une pièce pour pile ou face.' },
        { name: '+prix', description: 'Devine le prix d\'un objet.' },
        { name: '+punch', description: 'Affiche un GIF de coup de poing.' },
        { name: '+rage', description: 'Affiche un GIF humoristique de rage.' },
        { name: '+ratio', description: 'Ajoute des réactions au message.' },
        { name: '+roll', description: 'Lance un dé.' },
        { name: '+smile', description: 'Affiche un GIF de sourire.' },
      ],
      '🔑・Gestion': [
        { name: '+clearperm', description: 'Réinitialise les permissions d\'un utilisateur.' },
        { name: '+perm', description: 'Affiche les permissions d\'un utilisateur.' },
        { name: '+prefix', description: 'Change le préfixe du bot.' },
        { name: '+quitter', description: 'Fait quitter le bot du serveur (owner only).' },
        { name: '+setperm', description: 'Définit des permissions pour un utilisateur.' },
        { name: '+setprefix', description: 'Définit un nouveau préfixe.' },
        { name: '+unwl', description: 'Retire un utilisateur de la whitelist.' },
        { name: '+wl', description: 'Ajoute un utilisateur à la whitelist.' },
      ],
      '🧩・Jeux': [
        { name: '+aventure', description: 'Lance une aventure interactive.' },
        { name: '+bataille-navale', description: 'Lance un jeu de bataille navale.' },
        { name: '+devinum', description: 'Devine un nombre aléatoire.' },
        { name: '+mystere', description: 'Devine un nombre mystère.' },
        { name: '+pfc', description: 'Joue à pierre-feuille-ciseaux.' },
        { name: '+quiz', description: 'Pose une question de quiz.' },
        { name: '+roulette', description: 'Joue à la roulette.' },
        { name: '+simon', description: 'Joue au jeu de Simon.' },
        { name: '+tic-tac-toe', description: 'Joue au morpion.' },
      ],
    };

    // ===== EMBED ACCUEIL =====
    const homeEmbed = new EmbedBuilder()
      .setColor('#49ff02')
      .setTitle('<:Friends:1360902306383659128> Menu d\'aide - Noob')
      .setDescription(
        'Bienvenue dans le menu d’aide.\nSélectionnez une catégorie pour afficher les commandes.'
      )
      .addFields(
        {
          name: '⚙️ Utilisation',
          value: '- `<...>` obligatoire\n- `[ ... ]` optionnel',
        },
        {
          name: '📊 Informations',
          value: `- Commandes disponibles : \`${Object.values(categories).flat().length}\``,
        }
      )
      .setFooter({ text: 'Sélectionnez une catégorie ci-dessous.' });

    // ===== BOUTONS CATÉGORIES =====
    const categoryButtons = Object.keys(categories).map((category, index) =>
      new ButtonBuilder()
        .setCustomId(`category_${index}`)
        .setLabel(category)
        .setStyle(ButtonStyle.Primary)
    );

    const rows = [];
    for (let i = 0; i < categoryButtons.length; i += 5) {
      rows.push(new ActionRowBuilder().addComponents(categoryButtons.slice(i, i + 5)));
    }

    const closeButton = new ButtonBuilder()
      .setCustomId('close')
      .setLabel('Fermer')
      .setStyle(ButtonStyle.Danger);

    rows.push(new ActionRowBuilder().addComponents(closeButton));

    const message = await interaction.reply({
      embeds: [homeEmbed],
      components: rows,
      ephemeral: true,
      fetchReply: true
    });

    // ===== COLLECTOR PRINCIPAL =====
    const collector = message.createMessageComponentCollector({ time: 60_000 });

    collector.on('collect', async i => {
      if (i.user.id !== interaction.user.id) {
        return i.reply({ content: '❌ Ce menu ne t’appartient pas.', ephemeral: true });
      }

      if (i.customId === 'close') {
        await i.update({ content: 'Menu fermé.', embeds: [], components: [] });
        collector.stop();
        return;
      }

      if (!i.customId.startsWith('category_')) return;

      const index = Number(i.customId.split('_')[1]);
      const categoryName = Object.keys(categories)[index];
      const commands = categories[categoryName];

      let currentPage = 0;
      const commandsPerPage = 10;

      const generateEmbed = () => {
        const start = currentPage * commandsPerPage;
        const end = start + commandsPerPage;

        return new EmbedBuilder()
          .setColor('#ebff00')
          .setTitle(`📂 ${categoryName}`)
          .setDescription(
            commands.slice(start, end)
              .map(cmd => `**${cmd.name}** — ${cmd.description}`)
              .join('\n') || 'Aucune commande.'
          )
          .setFooter({
            text: `Page ${currentPage + 1}/${Math.ceil(commands.length / commandsPerPage)}`
          });
      };

      const backButton = new ButtonBuilder()
        .setCustomId('back')
        .setLabel('⬅️ Précédent')
        .setStyle(ButtonStyle.Secondary);

      const nextButton = new ButtonBuilder()
        .setCustomId('next')
        .setLabel('➡️ Suivant')
        .setStyle(ButtonStyle.Secondary);

      const returnButton = new ButtonBuilder()
        .setCustomId('return')
        .setLabel('Retour')
        .setStyle(ButtonStyle.Danger);

      const navRow = new ActionRowBuilder().addComponents(backButton, nextButton, returnButton);

      await i.update({
        embeds: [generateEmbed()],
        components: [navRow]
      });

      const pageCollector = message.createMessageComponentCollector({ time: 60_000 });

      pageCollector.on('collect', async btn => {
        if (btn.user.id !== interaction.user.id) return;

        if (btn.customId === 'back' && currentPage > 0) currentPage--;
        if (btn.customId === 'next' && currentPage < Math.ceil(commands.length / commandsPerPage) - 1) currentPage++;

        if (btn.customId === 'return') {
          await btn.update({ embeds: [homeEmbed], components: rows });
          pageCollector.stop();
          return;
        }

        backButton.setDisabled(currentPage === 0);
        nextButton.setDisabled(currentPage >= Math.ceil(commands.length / commandsPerPage) - 1);

        await btn.update({
          embeds: [generateEmbed()],
          components: [navRow]
        });
      });
    });
  }
};
