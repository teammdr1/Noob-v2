const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'crosstrade',
    description: 'Affiche un message concernant les cross trades',
        async execute(client, message, args) {
        const embed = new EmbedBuilder()
            .setTitle('🔁 ・Cross trades sur Bloxet')
            .setDescription(`🚨 **Attention aux Cross Trades** 🚨

Un cross trade = un objet revendu à plusieurs joueurs pour générer un profit rapide.
⚠️ Cette pratique est **risquée** et souvent **interdite**.

### ❌ Pourquoi éviter ?

• 🎭 Risque d’arnaque
• 📜 Possible bannissement
• 📉 Prix artificiellement gonflés

### ✅ Pour rester safe :

✔️ Refuse les offres trop belles
✔️ Évite les échanges suspects
✔️ Signale au staff si nécessaire

🛡️ Protégeons un trading sain et sécurisé sur Bloxet.
`)
            .setColor('#fffb00')
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
        message.channel.send({ embeds: [embed]});
    }
}