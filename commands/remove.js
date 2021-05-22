const discord = require('discord.js') 
const fs = require('fs');
module.exports = {
    driver: async function(message,client,args){
        if(!args.length) {
            message.channel.send("invalid input! - remove commands: ```!remove <node name>```")
            return;
          }
        try {
            fs.unlinkSync(`storage/${args[0]}.json`);
            message.channel.send("NODE successfuly removed!")
            console.log("file removed!")
        } catch(e) {
            message.channel.send(`NODE ${args[0]} not found! - see logs for more info!`)
            console.log(e)
        }
    }
}