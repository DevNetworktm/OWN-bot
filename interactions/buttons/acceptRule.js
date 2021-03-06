const { MessageButton, Client, Interaction } = require("discord.js");

exports.data = {
  name: "Accepter Réglement",
  description: "Se boutons sert a accepter le réglement",
  emoji: "✅",
  label: "J'accepte le réglement!",
  style: "SECONDARY",
  customID: "accept_rule#{{ QUERY }}",
};

exports.button = (QUERY) => {
  const button = new MessageButton();
  button.setEmoji(this.data.emoji);
  button.setLabel(this.data.label);
  button.setStyle(this.data.style);
  button.setCustomId(
    this.data.customID.replace("#{{ QUERY }}", QUERY ? `#${QUERY}` : "")
  );
  return button;
};
/**
 *
 * @param {Client} client
 * @param {Interaction} interaction
 */
exports.execute = async (client, interaction) => {
  const { database } = client;
  const info = await database
    .query("SELECT * FROM bot_data WHERE id = 1")
    .then((request) => request[0]);

  const role = await interaction.guild.roles.fetch(info.ROLE_MEMBER);
  interaction.member.roles.add(role);
  interaction.reply({
    content: "Vous avez correctement était vérifier !",
    ephemeral: true,
  });
};
