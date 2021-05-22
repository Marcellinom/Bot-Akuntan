const discord = require('discord.js') 
const fs = require('fs');
module.exports = {
    driver: async function(message,client,args){
        var id = args[0].slice(2,-1);
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
            message.channel.send("Channel not found!");
            return;
        } 

        let assigned = {
            id: args[0].slice(2,-1)
        }
        let data = JSON.stringify(assigned,null,2);
        try {
            fs.writeFileSync('./channel.json',data);
            message.channel.send(`Channel ${args[0]} assigned for stats notification!`)
        } catch (e) {
            console.log(e)
            message.channel.send("some error has occured! (see console logs for info)");
        }
    }
}