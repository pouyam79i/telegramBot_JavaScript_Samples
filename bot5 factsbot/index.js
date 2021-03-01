const Telegraf = require('telegraf'); //includeing telegraf lib

const bot = new Telegraf('Your Token'); // add your bot token
 
const axios = require('axios'); //includeing axios lib

let dataStore = [];

getData();

bot.command('fact', ctx => {
    let maxRow = dataStore.filter(item => {
        return(item.row == '1' && item.col == '2');
    })[0].val;
    // console.log(maxRow);

    let m = Math.floor(Math.random() * maxRow) + 1;

    let fact = dataStore.filter(item => {
        return(item.row == m && item.col == '5');
    })[0];
    // console.log(fact);

    let message = `
Fact #${fact.row}
${fact.val}    
`;

ctx.reply(message);
})

bot.command('update',async ctx => {
    try{
        await getData();
        ctx.reply('updated');
    }catch{
        console.log(err);
        ctx.reply('ERROR!');
    }
})

async function getData(){
    try{
        let res = await axios.get('https://spreadsheets.google.com/feeds/cells/YourGoogleSheetCode/SheetPageNumber/public/full?alt=json');
        // console.log(res.data.feed.entry);
        let data = res.data.feed.entry;

        dataStore = [];
        data.forEach(item => {
            dataStore.push({
                row: item.gs$cell.row,
                col: item.gs$cell.col,
                val: item.gs$cell.inputValue
            })
        })

        // console.log(dataStore);
    }catch(err){
        console.log(err);
        throw new Error;
    }
}

bot.launch();