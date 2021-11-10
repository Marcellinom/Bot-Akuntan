import discord from "discord.js"
import fs from "fs"
export async function driver(args,client)
{
    const embed = new discord.MessageEmbed()
    try {
        let raw = fs.readFileSync(`storage/${args[0]}.json`);
        const data = JSON.parse(raw);
            embed.addFields(
                {name:'Nama Node', value:data.nama_node},
                {name:'Slot', value:data.slot},
                {name:'Capacity', value:data.cap},
                {name:'Status', value:data.status},
            )
            .setColor('#0099ff')
            .setTitle(`**Showing info of ${data.nama_node}**`);
        return embed;
    } catch (e) {
        console.log(e)
    }
}