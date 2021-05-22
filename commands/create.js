const discord = require('discord.js') 
const fs = require('fs');
module.exports = {
    driver: async function(message,client,args){
        if(args.length > 2) {
            console.log(args.length);
            message.channel.send("invalid input! - create command: ```!create <node name> <capacity (integer)>```");
            return;  
          }
          if(isNaN(Number(args[1]))) {
            message.channel.send("capacity must be an integer!");
            return;
          }
        let node_name = args[0];
        let props = {
            nama_node: node_name,
            slot: 0,
            cap: Number(args[1]),
            status: "ONLINE"
        };
        let data = JSON.stringify(props,null,5);
        
        try {
            fs.readFileSync(`storage/${node_name}.json`);
            message.channel.send("duplicate node exist!");
            return;
        } catch(e) {
            console.log("good");
        }

        try {
            fs.writeFileSync(`storage/${node_name}.json`, data);
            const embed = new discord.MessageEmbed()
                .addFields(
                    {name:'Nama Node', value:props.nama_node},
                    {name:'Slot', value:props.slot},
                    {name:'Capacity', value:props.cap},
                    {name:'Status', value:props.status},
                )
                .setColor('#0099ff')
                .setTitle("New Node Created!");
            message.channel.send(embed);
        } catch (e) {
            console.log(e)
            message.channel.send("some error has occured! (see console logs for info)");
        }
    }
};