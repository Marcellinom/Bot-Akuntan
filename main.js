const discord = require('discord.js');
const fs = require('fs');
const client = new discord.Client();
const prefix = "!";
require('dotenv').config();


client.once('ready', () => { console.log('bot active!') })

client.on('message', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);

    let tagArg = ''; 
    if(args[4]){
      for(var i = 4; i<= args.length-1; i++){
        tagArg = tagArg + args[i] + ' '
      }
    }
    let comTemp = args
    const command = comTemp.shift().toLowerCase();
    

    console.log("arguments:",args);

    if(command==='channel') {
      let raw = fs.readFileSync('./channel.json');
      let id = JSON.parse(raw).id
      if(id=='') {
          message.channel.send("assign a channel first!")
          return;
      }
      let ch = await client.channels.fetch(id);
      message.channel.send(`announcement on ${ch.toString()}`);
      return;
    }

    try {
      if (fs.existsSync(`commands/${command}.js`)) {
        require(`./commands/${command}.js`).driver(message,client,args);
      }
    } catch(err) {
      message.channel.send("Command doesn't exist!");
      console.error(err)
    }
      
});

client.login(process.env.maintoken)