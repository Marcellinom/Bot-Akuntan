import fetch from 'node-fetch';
import dotenv from 'dotenv'
dotenv.config();
export async function driver(args,client){
        console.log("bisa nge import")
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
            await fetch(`${process.env.db_url}/utilityupdate.php?type=${args[1]}&value=${args[0]}&privatekey=${process.env.db_key}`,
            {
                method: "POST"
            });
            return `Channel ${channel.toString()} assigned for ${args[1]} notification!`
        } catch (e) {
            console.log(e)
            return "some error has occured! (see console logs for info)";
        }
    }