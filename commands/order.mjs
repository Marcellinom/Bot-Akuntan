import discord from "discord.js"
import moment from "moment-timezone"
import fetch from 'node-fetch';
import fs from "fs"
export async function driver(args,client)
{
    try { 
    let res = await fetch(`${process.env.db_url}/utility.php?datareq=all&privatekey=${process.env.db_key}`);
    let util = await res.json();
    let channel = await client.channels.fetch(util.order);
    let user = await client.users.fetch(args[0]);
    let item = args[1];
    let payment = args[2];
    let status = args[3];
    let currTime = moment().tz("Asia/Jakarta").format('DD-MMMM-YYYY_HH.mm.ss');
    currTime = currTime.split('_');
    console.log(currTime);

        var embed = new discord.MessageEmbed()
        .setThumbnail(user.avatarURL())
        .setColor('#E91E63')
        .setTitle(`NEW ORDER #${util.inc}`)
        .setURL('https://console.digital-cloud.tech/')
        .addFields(
            {name:'Buyer:', value: user.toString()},
            {name:'Item:', value:`**${item}**`},
            {name:'Method:', value:`**${payment}**`},
            {name:'Status:', value:`**${status}**`})
        .setTimestamp()
        .setFooter('©️ Copyright Digital Cloud');
                
        await channel.send(user.toString(),embed);

        let obj = {
            index: util.inc,
            buyer: user.username,
            item: item,
            method: payment,
            status: status,
            date: currTime[0].replace('/-/g','/'),
            time: currTime[1].replace('/./g',':')
        };

        let data = JSON.stringify(obj,null,8);
        if(!fs.existsSync(`order/${currTime[0]}`))
            fs.mkdirSync(`order/${currTime[0]}`);
    
        fs.writeFileSync(`order/${currTime[0]}/${currTime[1]}.json`, data);

        util.inc++;
        await fetch(`${process.env.db_url}/utilityupdate.php?type=inc&value=${util.inc}&privatekey=${process.env.db_key}`,
        {
            method: "POST"
        });

        console.log('successfully saving order data!');
        return('SUCCESS!');
    } catch (e) {
        console.log(e);
        return "Error, see logs for more info!";
    }
}
