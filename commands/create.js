const discord = require('discord.js') 
const fs = require('fs');
module.exports = {
    create_node: async function(message,client,args){
        let node_name = args[0];
        let props = {
            nama_node: node_name,
            slot: 0,
            cap: Number(args[1]),
            status: "online"
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