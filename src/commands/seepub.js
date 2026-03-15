const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'seepub',
    description: 'Affiche la pub du serveur',
    async execute(client, message, args) {
        const embed = new EmbedBuilder()
            .setTitle('Publicité du serveur')
            .setDescription(`**Bienvenue** ❄️

***Guide du serveur***

Bienvenue sur notre **serveur Roblox francophone** !
Ici, on partage la même passion : **Roblox**. Que tu sois joueur, trader, créateur ou juste là pour chill, tu trouveras une **communauté active**, engagée et prête à t’accueillir.

💬 **Échange & communauté**
Discute, partage tes expériences, parle de tes jeux préférés et rencontre d’autres passionnés.

🎲 **Trading**
Un espace dédié aux échanges pour trader proprement et en toute transparence.

🎭 **Rôles personnalisés**
Choisis ton rôle pour afficher ton profil, ton style et ce que tu représentes dans la communauté.

✨ **Discussions variées**
Plusieurs thématiques pour parler Roblox, créations, projets, actualités et bien plus encore.

🎁 **Événements & giveaways**
Des animations régulières, des récompenses et des moments fun pour garder le serveur vivant.

📩 **Support réactif**
Une question ? Un problème ? Le staff est disponible pour t’aider rapidement et efficacement.

***On te souhaite la bienvenue — amuse-toi bien et fais partie de l’aventure !***
Invite tes amis s’ils veulent rejoindre la communauté : https://discord.gg/5y5zEH2PAk`)
            .setColor('#00ff15')
        message.channel.send({ embeds: [embed]});
    }
}