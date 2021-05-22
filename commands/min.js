const discord = require('discord.js');
const fs = require('fs');
module.exports = {
    driver: async function(message,client,args){
        if(args.length > 2) {
            message.channel.send("invalid input! - min value command: ```!add <node name> <value(integer)>```");
            return;  
          }
          if(isNaN(Number(args[1]))) {
            message.channel.send("argument 2 must be an integer!");
            return;
          }
        try {
        let node_name = args[0];
            let raw = fs.readFileSync(`storage/${node_name}.json`);
            let node = JSON.parse(raw); 
            try{
                if(node.slot - Number(args[1]) < 0) {
                    message.channel.send(`slot harus lebih dari sama dengan 0!\`\`\`nama: ${node_name}\nslot: ${node.slot}\nkapasitas: ${node.cap}\`\`\``)
                    return;
                }
            
            node.slot -= Number(args[1]);   
            let data = JSON.stringify(node,null,5);
            fs.writeFileSync(`storage/${node_name}.json`, data); 
            
            message.channel.send(
            `${node_name} updated!\`\`\`nama:\u0009  ${node_name}\nslot:\u0009  ${node.slot}\nkapasitas: ${node.cap}\nstatus:\u0009${node.status}\`\`\``
            )
            
            } catch (e) {
                console.log(e);
                message.channel.send("Error has occured! (see console logs for info)");
            } 
        } catch(e) {
            message.channel.send("Node not found!");
        }
    }
};