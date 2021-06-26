const xl = require("xlsx");
const discord = require('discord.js');
const fs = require('fs');
var moment = require('moment-timezone');
module.exports = {
    driver: async function(args,client,channel_id){
        var dirs = fs.readdirSync('order/');
        
        var newWB = xl.utils.book_new();
        
        for(var i in dirs) {
            if(dirs[i]==='.gitkeep') continue;
            let files = fs.readdirSync(`order/${dirs[i]}/`);
            
            var items = [];
            for(var j in files) {
                let raw = fs.readFileSync(`order/${dirs[i]}/${files[j]}`);
                let data = JSON.parse(raw);
                items.push({
                    INDEX:data.index,
                    BUYER:data.buyer, 
                    ITEM:data.item, 
                    METHOD:data.method, 
                    STATUS:data.status, 
                    DATE:data.date, 
                    TIME:data.time
                });
            }
            var newWS = xl.utils.json_to_sheet(items,
                {header:["INDEX","BUYER","ITEM","METHOD","STATUS","DATE","TIME"]});
            
                xl.utils.book_append_sheet(newWB, newWS, dirs[i]);
        }
        let currTime = moment().tz("Asia/Jakarta").format('DD-MMMM-YYYY');
        xl.writeFile(newWB,`excelFiles/this.xlsx`);
        
        let mes = await client.channels.fetch(channel_id);
        let attach = new discord.MessageAttachment("excelFiles/this.xlsx",`dataPer_${currTime}.xlsx`)
        mes.send(attach);
        return "SUCCESS!";
    }
}