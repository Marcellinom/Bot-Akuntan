const discord = require('discord.js');
const fs = require('fs');
const dir = require('node-dir');
module.exports = {
    getstat: async function(message,client,args){
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
            function appendArray(obj) {
                try {
                    let object = {
                        nama_node: obj.nama_node,
                        slot: obj.slot,
                        cap: obj.cap,
                        status: obj.status
                    };
                    STATS.push(object);
                    if(STATS.length==list.length-1) {
                        console.log("stats:", STATS)
                        let embed = new discord.MessageEmbed()
                        for(var ind in STATS) {
                            embed.addFields(
                                {name:'\u200b', value:`**${STATS[ind].nama_node}**`, inline:true},
                                {name:'\u200b', value:`**${STATS[ind].status}**`, inline:true},
                                {name:'\u200b', value:`**${STATS[ind].slot}/${STATS[ind].cap}**`, inline:true},
                                )
                        }
                        embed.setTitle('**NODES**');
                        embed.setColor('#0099ff')
                        message.channel.send(embed);
                    }
                
                } catch (e) {
                    console.log(e);
                }
            }
            
        });
    }
}
