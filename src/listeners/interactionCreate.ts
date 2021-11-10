import { SlashCommands } from "@/slashCommands/SlashCommands";
import { BaseCommandInteraction, Client, Interaction } from "discord.js";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand()) {
            await handleSlashCommands(client, interaction);
        } else if (interaction.isContextMenu()) {
            await handleContextMenu(client, interaction);
        }
    });
};

const handleSlashCommands = async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    const slashCommand = SlashCommands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occured" });
        return;
    }

    await interaction.deferReply(slashCommand.deferReplyOptions);

    const args: string[] = [];

    slashCommand.run(client, interaction, args);
};

const handleContextMenu = async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    const slashCommand = SlashCommands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        return;
    }

    await interaction.deferReply(slashCommand.deferReplyOptions);

    const args: string[] = [];

    slashCommand.run(client, interaction, args);
};
