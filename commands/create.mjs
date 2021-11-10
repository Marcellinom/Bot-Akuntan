import discord from "discord.js"
import fs from "fs"
export async function driver(args,client)
{
    let node_name = args[0];
    let props = {
        nama_node: node_name,
        slot: 0,
        cap: Number(args[1]),
        status: ":white_check_mark: ONLINE"
    };
    let data = JSON.stringify(props,null,5);
    const embed = new discord.MessageEmbed()
    try {
        fs.readFileSync(`storage/${node_name}.json`);
        embed.addField('duplicate node exist!',node_name)
        return embed;
    } catch(e) {
        console.log("good");
    }

    try {
        fs.writeFileSync(`storage/${node_name}.json`, data);

            embed.addFields(
                {name:'Nama Node', value:props.nama_node},
                {name:'Slot', value:props.slot},
                {name:'Capacity', value:props.cap},
                {name:'Status', value:props.status},
            )
            .setColor('#0099ff')
            .setTitle("New Node Created!");
        return embed;
    } catch (e) {
        console.log(e)
    }
}