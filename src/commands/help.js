const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Affiche le menu d’aide avec les catégories et commandes.',
  async execute(client, message, args) {

    const categories = {
      '🔍・Informations': [
        { name: '+alladmins', description: 'Liste tous les administrateurs du serveur.' },
        { name: '+allbans', description: 'Affiche le nombre de membres bannis.' },
        { name: '+allbots', description: 'Liste tous les bots du serveur.' },
        { name: '+allchannels', description: 'Affiche tous les salons du serveur.' },
        { name: '+allroles', description: 'Affiche tous les rôles du serveur.' },
        { name: '+banner', description: 'Affiche la bannière d\'un utilisateur.' },
        { name: '+boosts', description: 'Affiche le nombre de boosts du serveur.' },
      ],
      '⚔️・Modération': [
        { name: '+addrole', description: 'Ajoute un rôle à un utilisateur.' },
        { name: '+admin', description: 'Affiche un GIF d\'administration (commande troll).' },
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
        { name: '+bugreport', description: 'Signale un bug au staff.' },
        { name: '+emoji', description: 'Affiche l\'ID d\'un emoji mentionné.' },
        { name: '+find', description: 'Affiche le salon vocal où se trouve un membre.' },
        { name: '+help', description: 'Affiche le menu d\'aide.' },
        { name: '+ownermd', description: 'Affiche le préfixe du bot.' },
        { name: '+perm', description: 'Affiche vos permissions actuelles.' },
        { name: '+piconly', description: 'Définit un salon pour les médias uniquement.' },
        { name: '+soutien', description: 'Affiche les avantages du rôle de soutien.' },
        { name: 's?top', description: 'Affiche le classement des meilleurs joueurs.' },
        { name: 's?u', description: 'Affiche des informations sur un utilisateur.' },
        { name: '+userinfo', description: 'Affiche des informations sur un utilisateur.' },
        { name: '+vc', description: 'Affiche les statistiques des salons vocaux.' },
      ],
      '🎗️・Misc': [
        { name: '+8ball', description: 'Pose une question et reçois une réponse aléatoire.' },
        { name: '+calcul', description: 'Effectue un calcul mathématique simple.' },
        { name: '+changemind', description: 'Affiche une phrase humoristique.' },
        { name: '+chiasse', description: 'Affiche un GIF humoristique.' },
        { name: '+citation', description: 'Affiche une citation aléatoire.' },
        { name: '+claque', description: 'Affiche un GIF de claque.' },
        { name: '+cry', description: 'Affiche un GIF de pleurs pour un utilisateur.' },
        { name: '+fight', description: 'Lance un mini-jeu de combat.' },
        { name: '+gay', description: 'Calcule un pourcentage humoristique.' },
        { name: '+lc', description: 'Calcule un pourcentage d\'amour entre deux utilisateurs.' },
        { name: '+meteo', description: 'Affiche une météo aléatoire.' },
        { name: '+pat', description: 'Affiche un GIF de tapotement.' },
        { name: '+punch', description: 'Affiche un GIF de coup de poing.' },
        { name: '+rage', description: 'Affiche un GIF humoristique de rage.' },
        { name: '+ratio', description: 'Ajoute des réactions au message.' },
      ],
      '🔑・Gestion': [
        { name: '+clearperm', description: 'Réinitialise les permissions d\'un utilisateur.' },
        { name: '+perm', description: 'Affiche les permissions d\'un utilisateur.' },
        { name: '+prefix', description: 'Change le préfixe du bot.' },
        { name: '+quitter', description: 'Fait quitter le bot du serveur.' },
        { name: '+setperm', description: 'Définit des permissions pour un utilisateur.' },
        { name: '+setprefix', description: 'Définit un nouveau préfixe.' },
        { name: '+unwl', description: 'Retire un utilisateur de la whitelist.' },
        { name: '+wl', description: 'Ajoute un utilisateur à la whitelist.' },
      ],
      '🎮・Roblox': [
        { name: '+roblox-profile', description: 'Affiche des informations sur un utilisateur Roblox.' },
        { name: '+roblox-avatar', description: 'Affiche l\'avatar d\'un utilisateur Roblox.' },
        { name: '+roblox-groupinfo', description: 'Affiche des informations sur un groupe Roblox.' },
      ],
      '🧩・Jeux': [
        { name: '+aventure', description: 'Lance une aventure interactive.' },
        { name: '+bataille-navale', description: 'Lance un jeu de bataille navale.' },
        { name: '+mystere', description: 'Devine un nombre mystère.' },
        { name: '+pfc', description: 'Joue à pierre-feuille-ciseaux.' },
        { name: '+quiz', description: 'Pose une question de quiz.' },
        { name: '+roulette', description: 'Joue à la roulette.' },
        { name: '+tic-tac-toe', description: 'Joue au morpion.' },
      ],
    };

    // Embed d'accueil
    const homeEmbed = new EmbedBuilder()
      .setColor('#49ff02')
      .setTitle('🏡 Menu d\'accueil')
      .setDescription('Bienvenue dans le menu d\'aide ! Sélectionnez une catégorie pour voir les commandes correspondantes.')
      .addFields(
        {
          name: '⚙️ Utilisation',
          value: `- Les paramètres entre \`<...>\` sont obligatoires.\n- Les paramètres entre \`[...]\` sont optionnels.`,
        },
        {
          name: '🔍 Informations',
          value: `- Mon préfixe : \`+\`\n- Nombre de commandes : \`${Object.values(categories).flat().length}\``,
        }
      )
      .setFooter({ text: 'Sélectionnez une catégorie ci-dessous.' });

    // Bouton de fermeture
    const closeButton = new ButtonBuilder()
      .setCustomId('close')
      .setLabel('Fermer')
      .setStyle(ButtonStyle.Danger);

    // Boutons pour les catégories
    const categoryButtons = Object.keys(categories).map((category, index) =>
      new ButtonBuilder()
        .setCustomId(`category_${index}`)
        .setLabel(category)
        .setStyle(ButtonStyle.Primary)
    );

    // Diviser les boutons en groupes de 5 maximum
    const rows = [];
    for (let i = 0; i < categoryButtons.length; i += 5) {
      rows.push(new ActionRowBuilder().addComponents(categoryButtons.slice(i, i + 5)));
    }

    // Ajouter le bouton de fermeture dans une nouvelle ligne
    rows.push(new ActionRowBuilder().addComponents(closeButton));

    // Envoyer l'embed d'accueil avec les boutons
    const helpMessage = await message.channel.send({ embeds: [homeEmbed], components: rows });

    // Collecteur d'interactions
    const collector = helpMessage.createMessageComponentCollector({ time: 60000 });

    collector.on('collect', async (interaction) => {
      if (!interaction.isButton()) return;

      const [action, index] = interaction.customId.split('_');

      if (action === 'category') {
        const categoryKeys = Object.keys(categories);
        const categoryIndex = parseInt(index, 10);

        if (isNaN(categoryIndex) || !categoryKeys[categoryIndex]) {
          return interaction.reply({ content: '❌ La catégorie sélectionnée est introuvable.', ephemeral: true });
        }

        const categoryName = categoryKeys[categoryIndex];
        const commands = categories[categoryName];

        // Pagination
        const commandsPerPage = 10;
        let currentPage = 0;

        function generateEmbed(categoryName, page) {
          const commands = categories[categoryName];
          const start = page * commandsPerPage;
          const end = start + commandsPerPage;
          const commandsList = commands.slice(start, end)
            .map((cmd) => `**${cmd.name}** - ${cmd.description}`)
            .join('\n');

          return new EmbedBuilder()
            .setColor('#ebff00')
            .setTitle(`Commandes - ${categoryName}`)
            .setDescription(commandsList || 'Aucune commande disponible.')
            .setFooter({ text: `Page ${page + 1}/${Math.ceil(commands.length / commandsPerPage)}` });
        }

        const embed = generateEmbed(categoryName, currentPage);

        // Boutons de navigation
        const backButton = new ButtonBuilder()
          .setCustomId('back')
          .setLabel('⬅️ Précédent')
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(currentPage === 0);

        const nextButton = new ButtonBuilder()
          .setCustomId('next')
          .setLabel('➡️ Suivant')
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(currentPage === Math.ceil(commands.length / commandsPerPage) - 1);

        const exitButton = new ButtonBuilder()
          .setCustomId('exit')
          .setLabel('Retour')
          .setStyle(ButtonStyle.Danger);

        const navigationRow = new ActionRowBuilder().addComponents(backButton, nextButton, exitButton);

        await interaction.update({ embeds: [embed], components: [navigationRow] });

        const pageCollector = interaction.message.createMessageComponentCollector({ time: 60000 });

        pageCollector.on('collect', async (pageInteraction) => {
          if (!pageInteraction.isButton()) return;

          if (pageInteraction.customId === 'back') {
            currentPage--;
          } else if (pageInteraction.customId === 'next') {
            currentPage++;
          } else if (pageInteraction.customId === 'exit') {
            // Retour à l'accueil avec les boutons réactivés
            await pageInteraction.update({ embeds: [homeEmbed], components: rows });
            pageCollector.stop();
            return;
          }

          const newEmbed = generateEmbed(categoryName, currentPage);

          backButton.setDisabled(currentPage === 0);
          nextButton.setDisabled(currentPage === Math.ceil(commands.length / commandsPerPage) - 1);

          await pageInteraction.update({ embeds: [newEmbed], components: [navigationRow] });
        });

        pageCollector.on('end', () => {
          interaction.message.edit({ components: rows }).catch(() => { });
        });
      } else if (action === 'close') {
        await interaction.update({ content: 'Menu fermé.', embeds: [], components: [] });
        collector.stop();
      }
    });
  }
};
