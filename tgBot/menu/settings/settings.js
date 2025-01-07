import { InlineKeyboard } from "grammy";

import User from "../../../model/User.js";

const CAPTION_SETTING = "🚀Here you can configure your settings.";

const SettingInputMainKeyboard = new InlineKeyboard()
  .row()
  .text("🗝️Set Password🗝️", "setting_set_password")
  .row()
  .text("⬅️ Back", "back_to_first");

export const returnToSetting = async (tgBot, ctx) => {
  if (ctx.session.previousMessage) tgBot.api.deleteMessage(ctx.chat.id, ctx.session.previousMessage);
  const message = await ctx.replyWithPhoto(process.env.LOGO_SETTING, {
    caption: CAPTION_SETTING,
    reply_markup: SettingInputMainKeyboard,
  });
  ctx.session.previousMessage = message.message_id;
  await ctx.answerCallbackQuery();
};

export const addCallbackQueries = (tgBot) => {
  tgBot.callbackQuery("setting_set_password", async (ctx) => {
    let user = await User.findOne({ username: ctx.from.username });
    if (!user) {
      return await ctx.reply("❌ User not found. Please contact support.");
    }
    if (user.password) {
      await ctx.reply("🔒 Please enter your current password:");
      ctx.session.state = "verify_current_password";
    } else {
      await ctx.reply("🔑 Please enter your new password:");
      ctx.session.state = "set_new_password";
    }
    await ctx.answerCallbackQuery();
  });
};
