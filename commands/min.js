const discord = require('discord.js');
const fs = require('fs');
module.exports = {
    min_node: async function(message,client,args){
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
            
            const embed = new discord.MessageEmbed()
                .addFields(
                    {name:'Nama Node', value:node.nama_node},
                    {name:'Slot', value:node.slot},
                    {name:'Capacity', value:node.cap},
                    {name:'Status', value:node.status},
                    )
                .setColor('#0099ff')
                .setTitle("Node Updated!");
                message.channel.send("Updated to:",embed);
            } catch (e) {
                console.log(e);
                message.channel.send("Error has occured! (see console logs for info)");
            } 
        } catch(e) {
            message.channel.send("Node not found!");
        }
    }
};