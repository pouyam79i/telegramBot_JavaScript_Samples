const Telegraf = require('telegraf'); // importing telegraf lib

const bot = new Telegraf('Your Token'); // add yor bot token here

// when you interact with bot it works
// we use next() to go to the rest of scripts
// without next() it stops after use method
bot.use((ctx, next) => {
    
    //ctx shortcuts 
    // ctx.reply("You used the bot ~ by shortcuts", 
    // {
    //     parse_mode : 'Markdown',
    //     disable_notification : true
    // }
    // );
    //ctx.reply(text, [extra]);

    //standard telegram method
    bot.telegram.sendMessage(ctx.chat.id, "You used the bot ~ standard", 
    {
        parse_mode : 'Markdown',
        disable_notification : true
    }
    );
    //bot.telegram.sendMessage(chatID, text, [extra]);

    ctx.state.POUYA = "I am pouya";
    // console.log(ctx);
    next(ctx);
})

// reply to /start
bot.start((ctx) => {
    ctx.reply(ctx.from.first_name + " bot ro start kard bevasileh ye " + ctx.updateSubTypes[0]);
    // ctx.reply(ctx.state.POUYA);
    // console.log(ctx);
    // console.log(ctx.from);
    // console.log(ctx.chat);
    // console.log(ctx.message);
    // console.log(ctx.updateSubTypes);
})

// reply to /help
bot.help((ctx) => {
    ctx.reply("help cmd is used");
})

// reply to /settings
bot.settings((ctx) => {
    ctx.reply("setting");
})

// reply to command /test , /Test , /TEST
bot.command(['test', 'Test', 'TEST'], (ctx) => {
    ctx.reply("Hello Pouya");
})

// reply if you send 'salam' or 'hello'
bot.hears(['salam', 'hello'], (ctx) => {
    ctx.reply("Hello " + ctx.from.first_name);
})

// reply if you send sticker
bot.on('sticker', (ctx) => {
    ctx.reply("This is a sticker message !");
})

//handles eg. +98 921 865-2846 or (921) 865-2846 
bot.phone("+98 921 865-2846", (ctx) => {
    ctx.reply("Phone number method !");
})

//handles eg. #bill
bot.hashtag("bill", (ctx) => {
    ctx.reply("Hashtag method !");
})

//hadles eg. @botfather
bot.mention("botfather", (ctx) => {
    ctx.reply("Mention method !");
})

// at the end of your script remmember to add this, else yor bot will not run
bot.launch();
