const discord = require('discord.js');
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

    if (command == 'create') 
    {
      if(args.length > 2) {
        console.log(args.length);
        message.channel.send("invalid input! - create command: ```!create <node name> <capacity (integer)>```");
        return;  
      }
      if(isNaN(Number(args[1]))) {
        message.channel.send("capacity must be an integer!");
        return;
      }
      require('./commands/create.js').create_node(message,client,args);
    } 

    else if (command == 'add') 
    {
      if(args.length > 2) {
        message.channel.send("invalid input! - add value command: ```!add <node name> <value(integer)>```");
        return;  
      }
      if(isNaN(Number(args[1]))) {
        message.channel.send("argument 2 must be an integer!");
        return;
      }
      require('./commands/add.js').add_node(message,client,args);
    } 

    else if(command == 'min') 
    {
      if(args.length > 2) {
        message.channel.send("invalid input! - min value command: ```!add <node name> <value(integer)>```");
        return;  
      }
      if(isNaN(Number(args[1]))) {
        message.channel.send("argument 2 must be an integer!");
        return;
      }
      require('./commands/min.js').min_node(message,client,args);
    }

    else if(command == 'stat')
    {
      require('./commands/stat.js').getstat(message,client,args);
    }
});

client.login(process.env.maintoken)