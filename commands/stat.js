const discord = require('discord.js');
const fs = require('fs');
// const Keyv = require('keyv');
// const keyv = new Keyv();
module.exports = {
    driver: async function(args,client){
        // keyv.on('error', err => {console.log('KEYV Connection Error', err);return("keyv connection error");});
        try{
            var STATS = [];
            let filename = fs.readdirSync('storage/');
            
            filename.forEach(f => {
                if(f === '.gitkeep') return;
                let raw = fs.readFileSync(`storage/${f}`);
                let obj = JSON.parse(raw);
                let object = {
                    nama_node: obj.nama_node,
                    slot: obj.slot,
                    cap: obj.cap,
                    status: obj.status
                };
                STATS.push(object);
            })
            
            let raw = fs.readFileSync('./channel.json');
            let id = JSON.parse(raw).id
            
            if(id=='') return("assign a channel first!")
            
            let channels = client.guilds.client.channels.cache.array();
            var flag = false;
            
            for(var j in channels) {
                if(channels[j].type === "text")
                    if(channels[j].id === id) {
                        flag = true;
                        break;
                    }
            }
            console.log("channel found:",flag);
            
            if(!flag) return "STATS Channel for notification not found!"
            
            var assigned = await client.channels.fetch(id)
            
            var embed = new discord.MessageEmbed()
            for(var ind in STATS) {
                embed.addField(`- _**${STATS[ind].nama_node}**_`,
                `**:white_check_mark: ${STATS[ind].status} - ${STATS[ind].slot}/${STATS[ind].cap}**`);      
            }
            embed.setTitle('**STATUS NODES**');
            embed.setURL('https://www.mcserverid.xyz/auth/login');
            embed.setColor('#1ABC9C');
            embed.setThumbnail('https://i.imgur.com/AJdpRyw.png');
            embed.setImage('https://i.imgur.com/AJdpRyw.png');
            embed.setFooter('©️ Copyright Digital Cloud');
            // var omsg = await keyv.get('old');
            // if(typeof omsg === 'undefined') {
            //     let notif = await assigned.send(embed)
            //     await keyv.set('old',notif.id);
            // }
            // else {
            //     // console.log(omsg);
            //     // console.log(assigned);
            //     let old = await assigned.messages.fetch(omsg);
            //     console.log(old)
            //     old.edit(embed);
            // }                        
            assigned.bulkDelete(5)
            .then(assigned.send(embed))
            .catch(console.log);
            return "SUCCESS!";
        } catch (e) {
            console.log(e);
            return "Some Error hax occured, check logs!";
        }
    }
}
