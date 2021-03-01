const Telegraf = require('telegraf'); //includeing telegraf lib

const bot = new Telegraf('YOUR TOKEN'); // add your bot token

const axios = require('axios');  // send HTTP/s request and gets respond (info)
const fs = require('fs');  // reading json files

const helpMessage = `
*Simple API Bot*
/fortune - get fortune cookie
/fortune \`<cat>\` - fortune with specified category
/cat - get a random cat image
/cat \`<text>\` - get an image with the text
/dogbreeds - get list of dog breeds
/dog \`<breed>\` - get image of dog breed
`;

bot.help(ctx => {
    // ctx.reply(helpMessage);
    bot.telegram.sendMessage(ctx.chat.id, helpMessage, {
        parse_mode: "markdown"
    });
})

bot.command('fortune', ctx => {
    let input = ctx.message.text;
    let inputArr = input.split(" ");
    let reqArr = ['http://yerkee.com/api/fortune', ''];
    let req = '';

    if(inputArr.length == 1){
        req = reqArr[0];
    }else if(inputArr.length == 2){
        reqArr[1] = inputArr[1];
        req = reqArr.join('/');
    }else{
        ctx.reply("Wrong Input");
        return;
    }

    axios.get(req)
        .then(res => {
            // console.log(res.data.fortune);
            ctx.reply(res.data.fortune);
        }).catch(err => {
            console.log(err);
        })
})

bot.command('cat', async ctx => {
    let input = ctx.message.text;
    let inputArr = input.split(" ");

    if(inputArr.length == 1){
        await axios.get('https://aws.random.cat/meow')
        .then(res => {
            // console.log(res.data.file);
            ctx.replyWithPhoto(res.data.file);
        }).catch(err => {
            console.log(err);
        })
    }else{
        inputArr.shift();
        input = inputArr.join(" ");
        ctx.replyWithPhoto(`https://cataas.com/cat/says/${input}`);
    }
})

bot.command('dogbreeds', ctx => {
    let rawdata = fs.readFileSync('dogbreeds.json', 'utf8');
    let data = JSON.parse(rawdata);
    // console.log(data);
    let message = 'Dog Breeds:\n';
    data.forEach(item => {
        message += `-${item}\n`;
    })
    ctx.reply(message);
})
//  https://dog.ceo/api/breed/:input/images/random

bot.command('dog', ctx => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Wrong Input");
        return;
    }

    let dogBreed = input[1];

    let rawdata = fs.readFileSync('dogbreeds.json', 'utf8');
    let data = JSON.parse(rawdata);

    if(data.includes(dogBreed)){
        axios.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`)
            .then(res => {
                // console.log(res.data.message);
                ctx.replyWithPhoto(res.data.message);
            }).catch(err => {
                console.log(err);
            })
    }else{
        let suggestions = data.filter(item => {
            return item.startsWith(dogBreed);
        })

        let message = 'Did you mead:\n';

        suggestions.forEach(item => {
            message += `-${item}\n`;
        })

        if(suggestions.length == 0){
            ctx.reply("It doesnt exist");
        }else{
            ctx.reply(message);
        }
    }
})

// at the end of your script remmember to add this, else yor bot will not run
bot.launch();
