import { DIService, Discord, Slash } from "../../../src";
import { CommandInteraction } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
class Database {
  database: string;
  constructor() {
    console.log("I am database");
    this.database = "connected";
  }

  query() {
    return this.database;
  }
}

@Discord()
@singleton()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class AppDiscord {
  constructor(private database?: Database) {}

  @Slash("tsyringe")
  add(interaction: CommandInteraction): void {
    if (DIService.container) {
      const myClass = DIService.container.resolve(AppDiscord);
      interaction.reply(
        `${myClass.database?.query() ?? "failed to execute"}, same class: ${
          myClass === this
        }`
      );
    } else {
      interaction.reply("Not using tsyringe");
    }
  }
}
