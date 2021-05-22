const discord = require('discord.js');
const fs = require('fs');
const Keyv = require('keyv');
const keyv = new Keyv();
module.exports = {
    driver: async function(message,client,args){
        keyv.on('error', err => {message.channel.send("keyv connection error");console.log('KEYV Connection Error', err)});
        fs.readdir('storage/', function(err, list)
        {
            if(err) {
                console.log(err);return;
            }
            for (var i = 0; i < list.length; i++)
            {
                // Get the contents of each file on iteration.
                var filename = list[i];
                if(filename === ".gitkeep") continue;
                fs.readFile("storage/" + filename, function(err, data)
                {
                    if(err) {
                        console.log(err);return;
                    }
                    var obj = JSON.parse(data);
                    appendArray(obj);
                });
            }
            var STATS = [];

            async function appendArray(obj) {
                try {
                    let object = {
                        nama_node: obj.nama_node,
                        slot: obj.slot,
                        cap: obj.cap,
                        status: obj.status
                    };
                    STATS.push(object);
                    if(STATS.length==list.length-1) {

                        let raw = fs.readFileSync('./channel.json');
                        let id = JSON.parse(raw).id
                        if(id=='') {
                            message.channel.send("assign a channel first!")
                            return;
                        }
                        let channels = message.guild.channels.cache.array();
                        var flag = false;
                        
                        for(var j in channels) {
                            if(channels[j].type === "text")
                                if(channels[j].id === id) {
                                    flag = true;
                                    break;
                                }
                        }
                        console.log(flag)
                        if(!flag) {
                            message.channel.send("STATS Channel for notification not found!");
                            return;
                        } 
                        var assigned = await client.channels.fetch(id)
                        console.log("stats:", STATS)
                        var embed = new discord.MessageEmbed()
                        for(var ind in STATS) {
                            embed.addField(`- _**${STATS[ind].nama_node}**_`,
                            `**:white_check_mark: ${STATS[ind].status} - ${STATS[ind].slot}/${STATS[ind].cap}**`);      
                        }
                        embed.setTitle('**STATUS NODES**');
                        embed.setURL('https://www.mcserverid.xyz/auth/login');
                        embed.setColor('#0099ff');
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
                    }
                
                } catch (e) {
                    console.log(e);
                }
            }
            
        });
    }
}