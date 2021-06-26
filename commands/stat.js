const discord = require('discord.js');
const fs = require('fs');
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
            
            let raw = fs.readFileSync('./utility.json');
            let id = JSON.parse(raw).stat.id;
            
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
                embed.addField(`- **${STATS[ind].nama_node}**`,
                `${STATS[ind].status} - ${STATS[ind].slot}/${STATS[ind].cap}`);    
            }
            embed.addField('\u200B','\u200B');
            embed.addField("Petunjuk cara membaca informasi diatas:\n",'\u200B');
            embed.addField("DC1-DC6 merupakan nama nodes. Jika anda memesan server kami. Anda dapat mengetahui nama nodes anda pada bagian Settings\n",'\u200B');
            embed.addField(":white_check_mark: ONLINE | :x:OFFLINE | :warning: MAINTENANCE | :soon:Coming SoonStatus diatas meununjukan kondisi nodes tersebut\n",'\u200B');
            embed.addField("0/32 - 32/32 Merupakan kapasitas RAM yang sudah terpakai / slot yang tersisa yang bisa dipesan.\n",'\u200B');
            embed.addField("0/32 - menandakan nodes kosong dan anda bisa memesan server dengan spesifikasi RAM sampai 32 GB.\n",'\u200B');
            embed.addField("28/32 - mengartikan bahwa server sudah terpakai 28 GB kapasitas RAMnya, dan anda bisa memesan server dengan spesifikasi RAM sampai 4 GB.\n",'\u200B');
            embed.addField("32/32 - mengartikan bahwa seluruh kapasitas RAM pada server sudah terpakai dan anda tidak dapat melakukan pemesanan pada nodes tersebut.\n",'\u200B');


            embed.setTitle('**STATUS NODES**');
            embed.setURL('https://console.digital-cloud.tech/');
            embed.setColor('#1ABC9C');
            embed.setThumbnail('https://cdn.discordapp.com/attachments/851835601937235988/858297967454453770/logotoko.png');
            embed.setFooter('©️ Copyright Digital Cloud');

            assigned.messages.fetch()
            .then(messages => {
                messages.forEach(m =>{
                    m.delete();
                })
            })
            .then(assigned.send(embed))
            .catch(console.log);
            
            return "SUCCESS!";
        } catch (e) {
            console.log(e);
            return "Some Error has occured, check logs!";
        }
    }
}
