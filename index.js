const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  ActivityType
} = require("discord.js");
const fs = require("fs");
const path = require("path");
const config = require("./config"); // token, guildId, soutienRoleId
const { EmbedBuilder } = require('discord.js');

const STATUT = "/bloxet";
const LOG_FILE = path.join(__dirname, "role_logs.txt");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.GuildMember]
});

client.commands = new Collection();
client.slashCommands = new Collection();
client.prefix = config.prefix;
client.config = config;

require('./src/structure/commandHandler')(client);
require('./src/structure/slashCommandHandler')(client);
require('./src/structure/eventHandler')(client);

// ===== STATUT /bloxet =====
function hasBloxet(member) {
  if (!member.presence) return false;

  for (const activity of member.presence.activities) {
    const texte = `${activity.state || ""} ${activity.name || ""} ${activity.emoji?.name || ""}`;
    if (texte.includes(STATUT)) return true;
  }

  return false;
}

// ===== LOGS =====
function logAction(message) {
  const date = new Date().toISOString();
  const line = `[${date}] ${message}\n`;
  console.log(line.trim());
  fs.appendFile(LOG_FILE, line, () => {});
}

async function checkMember(member) {
  try {
    const hasStatus = hasBloxet(member);
    const hasRole = member.roles.cache.has(config.soutienRoleId);

    if (hasStatus && !hasRole) {
      await member.roles.add(config.soutienRoleId);
      logAction(`Rôle ajouté à ${member.user.tag} (status détecté)`);
    }

    if (!hasStatus && hasRole) {
      await member.roles.remove(config.soutienRoleId);
      logAction(`Rôle retiré à ${member.user.tag} (status absent)`);
    }
  } catch (err) {
    logAction(`Erreur pour ${member.user.tag}: ${err.message}`);
  }
}

// ===== SCAN GLOBAL =====
async function fullScan() {
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) return;

  await guild.members.fetch({ withPresences: true });
  for (const member of guild.members.cache.values()) {
    await checkMember(member);
  }
}

// ===== EVENTS =====
client.once("ready", async () => {
  logAction(`Bot prêt (${client.user.tag})`);

  await fullScan();              // scan immédiat
  setTimeout(fullScan, 10_000);  // rescan après 10s pour membres retardés
});

// Présence modifiée
client.on("presenceUpdate", (_, p) => {
  if (p?.member) checkMember(p.member);
});

// Nouveau membre
client.on("guildMemberAdd", member => {
  setTimeout(() => checkMember(member), 5_000);
});

// Scan forcé toutes les 3 minutes
setInterval(fullScan, 3 * 60 * 1000);

// ===== MESSAGES =====
client.on("messageCreate", async message => {
  if (message.author.bot || !message.content.startsWith("!")) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const name = args.shift().toLowerCase();

  const cmd = client.commands.get(name);
  if (!cmd) return;

  try {
    await cmd.execute(client, message, args);
  } catch {
    message.reply("Erreur commande.");
  }
});

// Message de bienvenue
client.on('guildMemberAdd', async (member) => {
    // Remplace 'ID_DU_SALON' par l'ID réel de ton salon
    const welcomeChannel = member.guild.channels.cache.get('1474694040334106634');
    if (!welcomeChannel) return;

    const memberCount = member.guild.memberCount;

    const welcomeEmbed = new EmbedBuilder()
        .setColor('#00ff00')
        .setTitle('<a:salut:1467534006659584222> Une nouvelle pousse rejoint le jardin 🌱')
        .setDescription(`Bienvenue ${member} ! 🥳  
Tu es maintenant l’un des **${memberCount} membres** de Bloxet !  
> 🔧 Pense à choisir tes rôles dans <id:customize>  
> 🖼️ Mets \`/bloxet\` dans ton statut pour avoir perm image`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: 'Bienvenue dans la famille !', iconURL: member.guild.iconURL({ dynamic: true }) });

    welcomeChannel.send({ embeds: [welcomeEmbed] });
});

client.on('guildMemberAdd', async (member) => {
    const logChannel = member.guild.channels.cache.get('1466007980569919636');
    if (!logChannel) return;
    logChannel.send(`📥 ${member} **a rejoint le serveur ! Souhaitez lui la bienvenue <:cute:1467534419043684524>**`);
});

client.on('guildMemberRemove', async (member) => {
    const logChannel = member.guild.channels.cache.get('1474830889308651620');
    if (!logChannel) return;
    const memberCount = member.guild.memberCount;

    const welcomeEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle(`<a:salut:1467534006659584222> ${member.user.tag} nous a quitté... 🌪️`)
        .setDescription(`Un membre a quitté le serveur. Il reste ${memberCount} membres.`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: 'Au revoir !', iconURL: member.guild.iconURL({ dynamic: true }) });
    logChannel.send({ embeds: [welcomeEmbed] });
});

// Message privé de bienvenue
client.on('guildMemberAdd', async (member) => {
    try {
      const message = `Salut ${member.user.username} ! Je te passe le lien du serveur au cas où tu le perdrais :
      https://discord.gg/TjuPQWgGPe
      
      N'hésite pas à mettre \`/bloxet\` dans ton statut pour nous soutenir et avoir la perm image !
      Si tu as des questions, le staff est là pour t'aider. Amuse-toi bien !`;
      await member.send(message);
    } catch (err) {
      logAction(`Impossible d'envoyer un message privé à ${member.user.tag}: ${err.message}`);
    }
    }
  );

// ===== MESSAGE DEPUIS TERMINAL =====
process.stdin.setEncoding('utf8');
process.stdin.resume();

process.stdin.on('data', async (data) => {
    const message = data.toString().trim();
    if (!message) return;

    try {
        const channel = await client.channels.fetch('1466007980569919636');
        if (!channel) {
            logAction('Salon introuvable pour message terminal');
            return;
        }

        await channel.send(message);
        console.log('Message envoyé :', message);
    } catch (err) {
        console.error('Erreur envoi message terminal :', err);
    }
});

// ===== LOGS GLOBAUX MESSAGES =====

function formatLog(type, message, extra = "") {
    const date = new Date().toISOString();
    const guildName = message.guild ? message.guild.name : "DM";
    const author = message.author ? message.author.tag : "Inconnu";
    const content = message.content || "[Pas de contenu]";

    console.log(
        `[${date}] [${type}] [${guildName}] ${author} : ${content} ${extra}`
    );
}

// Message envoyé
client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    formatLog("ENVOYÉ", message);
});

// Message supprimé
client.on("messageDelete", (message) => {
    if (!message.author || message.author.bot) return;
    formatLog("SUPPRIMÉ", message);
});

// Message modifié
client.on("messageUpdate", (oldMessage, newMessage) => {
    if (!newMessage.author || newMessage.author.bot) return;

    const oldContent = oldMessage.content || "[Pas de contenu]";
    const newContent = newMessage.content || "[Pas de contenu]";

    const date = new Date().toISOString();
    const guildName = newMessage.guild ? newMessage.guild.name : "DM";
    const author = newMessage.author.tag;

    console.log(
        `[${date}] [MODIFIÉ] [${guildName}] ${author}\nAncien : ${oldContent}\nNouveau : ${newContent}`
    );
});

// ===== ERREURS =====
process.on('unhandledRejection', (reason, promise) => {
    logAction(`Rejet non géré : ${reason}`);
});

// ===== LOGIN =====
client.login(config.token);
