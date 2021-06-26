const discord = require('discord.js') 
var moment = require('moment-timezone');
const fs = require('fs');
module.exports = {
    driver: async function(args,client){
        try { 
        let raw = fs.readFileSync('./utility.json');
        let util = JSON.parse(raw);
        let channel = await client.channels.fetch(util.order.id);
        let user = await client.users.fetch(args[0]);
        let item = args[1];
        let payment = args[2];
        let status = args[3];
        let currTime = moment().tz("Asia/Jakarta").format('DD-MMMM-YYYY_HH.mm.ss');
        currTime = currTime.split('_');
        console.log(currTime);

            var embed = new discord.MessageEmbed()
            .setThumbnail(user.avatarURL())
            .setColor('#E91E63')
            .setTitle(`NEW ORDER #${util.inc}`)
            .setURL('https://console.digital-cloud.tech/')
            .addFields(
                {name:'Buyer:', value: user.toString()},
                {name:'Item:', value:`**${item}**`},
                {name:'Method:', value:`**${payment}**`},
                {name:'Status:', value:`**${status}**`})
            .setTimestamp()
            .setFooter('©️ Copyright Digital Cloud');
                    
            await channel.send(embed);

            let obj = {
                index: util.inc,
                buyer: user.username,
                item: item,
                method: payment,
                status: status,
                date: currTime[0].replace('/-/g','/'),
                time: currTime[1].replace('/./g',':')
            };

            let data = JSON.stringify(obj,null,8);
            if(!fs.existsSync(`order/${currTime[0]}`))
                fs.mkdirSync(`order/${currTime[0]}`);
        
            fs.writeFileSync(`order/${currTime[0]}/${currTime[1]}.json`, data);

            util.inc++;
            let util_data = JSON.stringify(util,null,9);
            fs.writeFileSync('./utility.json',util_data);

            console.log('successfully saving order data!');
            return('SUCCESS!');
        } catch (e) {
            console.log(e);
            return "Error, see logs for more info!";
        }
    }
}