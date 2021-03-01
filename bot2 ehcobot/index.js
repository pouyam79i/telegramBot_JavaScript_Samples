const Telegraf = require('telegraf'); //includeing telegraf lib

const bot = new Telegraf('YOUR BOT TOKEN');

// help message text:
const helpMessage = `
say something to me
/start - starts the bot
/help - command reference
/echo - say user's name + " used the echo command"
/echo (words) - (words)
`;

// use method to log information
bot.use((ctx, next) => {
    // console.log(ctx.chat);
    if(ctx.updateSubTypes[0] == 'text'){
        // console.log(ctx.from.username + " said: " + ctx.message.text);
        bot.telegram.sendMessage(-425498927, ctx.from.username + " said: " + ctx.message.text);
    }else{
        // console.log(ctx.from.username+ " sent: "+ctx.updateSubTypes[0]);
        bot.telegram.sendMessage(-425498927, ctx.from.username+ " sent: "+ctx.updateSubTypes[0]);
    }
    next();
})

// start command handler
bot.start((ctx) => {
    // logger(ctx);
    // console.log(ctx.from);
    ctx.reply("Hello " + ctx.from.first_name);
    ctx.reply(helpMessage);
})

// help command handler
bot.help((ctx) => {
    // logger(ctx);
    ctx.reply(helpMessage);
})

//echo command function
bot.command('echo', (ctx) => {
    // logger(ctx);
    // console.log(ctx);
    let input = ctx.message.text;
    let inputArr = input.split(" ");
    // console.log(inputArr);
    let message = "";
    if(inputArr.length == 1){
        message = ctx.from.first_name + " used the echo command";
    }
    else{
        inputArr.shift();
        message = inputArr.join(" ");
    }
    ctx.reply(message);
})


// function logger(ctx) {
//     console.log(ctx.from.username + " said: " + ctx.message.text);
// }

bot.launch();