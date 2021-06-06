const discord = require('discord.js') 
const fs = require('fs');
module.exports = {
    driver: async function(args,client){
        var id = args[0];
        let channels = client.guilds.client.channels.cache.array();
        var flag = false;
        var channel;
        for(var j in channels) {
            if(channels[j].type === "text")
            if(channels[j].id === id) {
                    flag = true;
                    channel = channels[j]
                    break;
                }
        }
        console.log(flag)
        if(!flag) {
            return "Channel not found!";
        } 

        let assigned = {
            id: args[0]
        }
        let data = JSON.stringify(assigned,null,2);
        try {
            fs.writeFileSync('./channel.json',data);
            return `Channel ${channel.toString()} assigned for stats notification!`
        } catch (e) {
            console.log(e)
            return "some error has occured! (see console logs for info)";
        }
    }
}