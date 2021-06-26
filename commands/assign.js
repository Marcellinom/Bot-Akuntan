const discord = require('discord.js') 
const fs = require('fs');
module.exports = {
    driver: async function(args,client){
        try {
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

        let raw = fs.readFileSync('./utility.json');
        let assigned = JSON.parse(raw);
        
        assigned[args[1]].id = args[0];
        console.log(assigned);
        let data = JSON.stringify(assigned,null,9);

            fs.writeFileSync('./utility.json',data);
            return `Channel ${channel.toString()} assigned for ${args[1]} notification!`
        } catch (e) {
            console.log(e)
            return "some error has occured! (see console logs for info)";
        }
    }
}