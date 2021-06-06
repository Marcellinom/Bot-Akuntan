const discord = require('discord.js') 
const fs = require('fs');
module.exports = {
    driver: async function(args,client){
        try {
            fs.unlinkSync(`storage/${args[0]}.json`);
            return("NODE successfuly removed!")
            console.log("file removed!")
        } catch(e) {
            console.log(e)
            return(`NODE ${args[0]} not found! - see logs for more info!`)
        }
    }
}