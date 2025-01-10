import { InlineKeyboard } from "grammy";

import { addKeyEvent } from "./keyEvent.js";
import { returnToSetting } from "./settings/settings.js";
import { addCallbackQueries as addSettingCallbackQueries } from "./settings/settings.js";
import { returnToSolana } from "./solana/solana.js";
import { addCallbackQueries as addSolanaCallbackQueries } from "./solana/solana.js";
import { returnToUniswap } from "./uniswap/uniswap.js";
import { addCallbackQueries as addUniswapCallbackQueries } from "./uniswap/uniswap.js";

const CAPTION_MAIN =
  "👋 The Volume Bot welcomes you!\n💡Detailed info for this bot\n";

const mainKeyboard = new InlineKeyboard()
  .row()
  .text("🦄UniswapV2🦄", "UniswapV2")
  .row()
  .text("🚀Solana🚀", "Solana")
  .row()
  .text("👤Setting👤", "Setting");

const returnToMain = async (tgBot, ctx, isCallbackQuery = false) => {
  if (ctx.session.previousMessage)
    tgBot.api.deleteMessage(ctx.chat.id, ctx.session.previousMessage);
  const message = await ctx.replyWithPhoto(process.env.LOGO_MAIN, {
    caption: CAPTION_MAIN,
    reply_markup: mainKeyboard,
  });
  ctx.session.previousMessage = message.message_id;
  if (isCallbackQuery) {
    await ctx.answerCallbackQuery();
  }
};

export const addCallbackQueries = (tgBot) => {
  tgBot.command("start", async (ctx) => {
    await returnToMain(tgBot, ctx, true);
  });
  tgBot.callbackQuery("UniswapV2", async (ctx) => {
    await returnToUniswap(tgBot, ctx, true);
  });

  tgBot.callbackQuery("Solana", async (ctx) => {
    await returnToSolana(tgBot, ctx, true);
  });

  tgBot.callbackQuery("Setting", async (ctx) => {
    await returnToSetting(tgBot, ctx, true);
  });
  tgBot.callbackQuery("back_to_first", async (ctx) => {
    await returnToMain(tgBot, ctx, true);
  });
  addUniswapCallbackQueries(tgBot);
  addSolanaCallbackQueries(tgBot);
  addSettingCallbackQueries(tgBot);
  addKeyEvent(tgBot);
};
