const discord = require('discord.js') 
var moment = require('moment-timezone');
const fs = require('fs');
module.exports = {
    driver: async function(args,client){
        let channel = await client.channels.fetch(args[0]);
        let user = await client.users.fetch(args[1]);
        let item = args[2];
        let payment = args[3];
        let status = args[4];
        let currTime = moment().tz("Asia/Jakarta").format('DD-MMMM-YYYY_HH.mm.ss').split('_');
        try {
            var embed = new discord.MessageEmbed()
            .setThumbnail(user.avatarURL())
            .setColor('#E91E63')
            .setTitle('NEW ORDER')
            .setURL('https://www.mcserverid.xyz')
            .addFields(
                {name:'Buyer:', value: user.toString()},
                {name:'Item:', value:`**${item}**`},
                {name:'Method:', value:`**${payment}**`},
                {name:'Status:', value:`**${status}**`}
                )
                .setTimestamp()
                .setFooter('©️ Copyright Digital Cloud');
                    
            await channel.send(embed);
        } catch(e) {
            console.log(e);
            return "Error, see logs for more info!";
        }

        let obj = {
            buyer: user.username,
            item: item,
            method: payment,
            status: status,
            date: currTime[0].replaceAll('-','/'),
            time: currTime[1].replaceAll('.',':')
        };

        try {
            let data = JSON.stringify(obj,null,7);
            if(!fs.existsSync(`order/${currTime[0]}`))
                fs.mkdirSync(`order/${currTime[0]}`);
        
            fs.writeFileSync(`order/${currTime[0]}/${currTime[1]}.json`, data);

            console.log('successfully saving order data!');
        } catch (e) {
            console.log(e);
            return "Error, see logs for more info!";
        }
        return('SUCCESS!');
    }
}