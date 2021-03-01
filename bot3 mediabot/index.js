const Telegraf = require('telegraf'); //includeing telegraf lib

const bot = new Telegraf('your token'); // add your bot token

// bot.on('message', (ctx) => {
//     console.log(ctx.message.photo);
// })

// bot.command('test', (ctx) => {
//     //file path
//     // bot.telegram.sendPhoto(ctx.chat.id, {source : 'res/tehran.jpg'});

//     //url
//     // bot.telegram.sendPhoto(ctx.chat.id, "https://www.setaswall.com/wp-content/uploads/2018/04/London-UK-Wallpaper-25-1920x1080.jpg");

//     //file id  
//     bot.telegram.sendPhoto(ctx.chat.id, "AgACAgQAAxkBAAMRXuuXxVrCUxsDBApkFp25Fl2Am3EAAgezMRuZjWFTBVy_N1p_w3Zt_m8jXQADAQADAgADeQAD0RABAAEaBA");
// })

// text of help message
let helpMessage = `
You can upload a document or
a photo then we will generate
a download link for you.

Command Reference:
/start - start the bot and send help massage
/tehran - send a photo of Tehran
/london - send gif of London
/cities - send a group of photos of cities
/citieslist - send a document of cities name
/bushehr - send location of bushehr
/help - send help massage
`;

// start and help 
bot.command(['start', 'help'], ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "typing");
    ctx.reply(helpMessage);
})

// tehran command
bot.command('tehran', (ctx) => {
    // console.log(ctx);
    // console.log(ctx.chat);

    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");

    // if it chating in private it doesn't reply, just send
    if(ctx.chat.type != 'private'){
    bot.telegram.sendPhoto(ctx.chat.id, {source: "res/tehran.jpg"}, {
        caption: "This is an image of Tehran",
        reply_to_message_id: ctx.message.message_id
    })
    }   else{
        bot.telegram.sendPhoto(ctx.chat.id, {source: "res/tehran.jpg"}, {
            caption: "This is an image of Tehran"
        })
    }

})

// london command
bot.command('london', (ctx) => {

    bot.telegram.sendChatAction(ctx.chat.id, "upload_video");

    // if it chating in private it doesn't reply, just send
    if(ctx.chat.type != 'private'){
    bot.telegram.sendAnimation(ctx.chat.id, "https://media0.giphy.com/media/aSl8WiYpLfUZ2/giphy.gif", {
        caption: "This is London",
        reply_to_message_id: ctx.message.message_id
    })
    }   else{
        bot.telegram.sendAnimation(ctx.chat.id, "https://media0.giphy.com/media/aSl8WiYpLfUZ2/giphy.gif", {
            caption: "This is London"
        })
    }

})

// cities command
bot.command('cities', ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");

    let cities = ['res/bushehr.jpg','res/tabriz.jpg', 'res/hongkong.jpg', 'res/tehran.jpg', 'res/shiraz.jpg',
     'res/esfehan.jfif'];

    let pictures = cities.map(city => {
        return {
            type:'photo',
            media: {source: city}
        }
    })

    bot.telegram.sendMediaGroup(ctx.chat.id, pictures);
})

// citieslist command
bot.command('citieslist', (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_document");

    if(ctx.chat.type != 'private'){
        bot.telegram.sendDocument(ctx.chat.id, {source: "res/citieslist.txt"}, 
        {
            thumb: {source: "res/london.jpg"},
            caption: "This is the list of cities",
            reply_to_message_id: ctx.message.message_id
        });
    }else{
        bot.telegram.sendDocument(ctx.chat.id, {source: "res/citieslist.txt"}, 
        {
            thumb: {source: "res/london.jpg"},
            caption: "This is the list of cities"
        });
    }
})

// bushehr command
bot.command('bushehr', (ctx) => {
    bot.telegram.sendChatAction(ctx.chat.id, "find_location");

    bot.telegram.sendLocation(ctx.chat.id, 28.9110525, 50.8300214);
})

// checks if there is a photo or document and returns download link
bot.on('message', async ctx => {
    // console.log(ctx.message.document.file_id);

    if(ctx.updateSubTypes[0] == 'document'){
        bot.telegram.sendChatAction(ctx.chat.id, "typing");
        try{
            let link = await bot.telegram.getFileLink(ctx.message.document.file_id);
            ctx.reply("Download link is: " + link);
        } catch(err){
            console.log(err);
            ctx.reply(err.description);
        }
    }else if(ctx.updateSubTypes[0] == 'photo'){
        bot.telegram.sendChatAction(ctx.chat.id, "typing");
        // console.log(ctx.message.photo[0].file_id);
        try{
            let link = await bot.telegram.getFileLink(ctx.message.photo[0].file_id);
            ctx.reply("Download link is: " + link);
        } catch(err){
            console.log(err);
            ctx.reply(err.description);
        }
    }
})

bot.launch(); 