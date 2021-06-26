const discord = require('discord.js');
const fs = require('fs');
const client = new discord.Client();
const prefix = "!";
require('dotenv').config();

client.once('ready', () => { console.log('bot active!') });


client.on('ready', ()=>{  
  
  // get guild id
  // const guilds = client.guilds.cache;
  // guilds.forEach(e => console.log(e.id))
  
const slash = client.api.applications(client.user.id).guilds('839821772521209856').commands

// create new node
slash.post({
  data: {
    name: "create",
    description: "create new node",
    options: 
      [{
        name:"node",
        description:"the name of a node you want to create - (string)",
        type:3,
        required:true
      },{
        name:"capacity",
        description:"the node maximum capacity - (integer)",
        type:4,
        required:true
      }]
  }
});

// assigning announcement channel
slash.post({
  data: {
    name: "assign",
    description: "assign a notification channel",
    options:[{
      name:"channel",
      description:"mention a channel",
      type:7,
      required:true
    },{
      name:"type",
      description:"type of channel",
      type:3,
      required:true,
      choices:[{
        name: "stat",value: "stat"
      },{
        name: "order",value: "order"
      }]
    }]
  }
});

// show stat
slash.post({
  data: {
    name:"stat",
    description:"show the current node stats on announcement channel"
  }
});

// export to excel
slash.post({
  data: {
    name:"export",
    description:"export the order data to excel"
  }
});

// make new order
slash.post({
  data: {
    name:"order",
    description:"make an order",
    options:[{
      name:"user",
      description:"tag a user who orders this",
      type:6,
      required:true
    },{
      name:"item",
      description:"the item that's gonna be ordered",
      type:3,
      required:true
    },{
      name:"payment",
      description:"payment method",
      type:3,
      required:true
    },{
      name:"status",
      description:"current status of payment",
      type:3,
      required:true
    }]
  }
});

});


client.on('ready', () => {
  postOptions(client.user.id);
});

client.ws.on('INTERACTION_CREATE', async interaction => {
  console.log("permission: ",interaction.member.permissions);

    if(interaction.member.permissions !== '137438953471') {
      console.log(interaction.member.user.username+" is not an admin!!");
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content:"You don't have permission to use this command!!"
          }
        }
      })
      return;
    }

    const command = interaction.data.name.toLowerCase();
    const args = interaction.data.options;
    console.log(interaction.channel_id)
    var channel = await client.channels.fetch(interaction.channel_id)

    var arguments = [];
    for(var i in args) {
      arguments.push(args[i].value)
    }
    console.log("arguments:",arguments);

    try {
      if (fs.existsSync(`commands/${command}.js`)) {
        var callback = await require(`./commands/${command}.js`).driver(arguments,client,interaction.channel_id);
      }
    } catch(err) {
      console.error(err)
    }
    console.log("callback->:",callback)
    // sending callback
    if(command == "create" || command == "info")
    {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data:{
            embeds:[callback]
          }
        }
      })
    }

    else
    {
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            content:callback
          }
        }
      })
    }
    postOptions(client.user.id);
});

function postOptions(bot_id) {
  
  const slash = client.api.applications(bot_id).guilds('424506121751887873').commands
  
  var filenames = fs.readdirSync('storage/');

  var nodes = [];
  for(var i in filenames) {
    if(filenames[i]==='.gitkeep') continue;
    var filename = filenames[i].replace('.json','');

    let obj = {
      name:filename,
      value:filename
    }
    nodes.push(obj)
  }

  console.log("choices bawah:",nodes)

// remove a node
slash.post({
    data: {
      name: "remove",
      description: "remove a node",
      options:[{
        name:"node",
        description:"the name of the NODE you want to remove",
        type:3,
        required:true,
        choices: nodes
      }]
    }
})
// adding a node slot value
slash.post({
    data: {
      name: "add",
      description: "add a node slot value",
      options:[{
        name:"node",
        description:"the name of the NODE the slot you want to add",
        type:3,
        required:true,
        choices: nodes
      },{
        name:"value",
        description:"the value you want to add to the slot - (integer)",
        type:4,
        required:true
      }]
    }
})
// minus a node slot value
slash.post({
    data: {
      name: "min",
      description: "minus a node slot value",
      options:[{
        name:"node",
        description:"the name of the NODE the slot you want to min",
        type:3,
        required:true,
        choices: nodes
      },{
        name:"value",
        description:"the value you want to min to the slot - (integer)",
        type:4,
        required:true
      }]
    }
})

// view nodes info
slash.post({
  data: {
    name:"info",
    description:"view node info",
    options:[{
      name:"node",
      description:"the name of the node you want see",
      type:3,
      required:true,
      choices: nodes
    }]
  }
})

// edit things
slash.post({
  data: {
    name:"edit",
    description:"edit things...",
    options:[
    {
      name:"node",
      description:"the name of the node you want to edit",
      type:3,
      required:true,
      choices: nodes
    },{
      name:"type",
      description:"type of node properties you want to edit",
      type:3,
      required:true,
      choices:[{
        name:"name",value:"name"
      },{
        name:"slot",value:"slot"
      },{
        name:"capacity",value:"capacity"
      },{
        name:"status",value:"status"
      }]
    },{
      name:"value",
      description:"value of node properties you want to edit",
      type:3,
      required:true
    }]
  }
})
}
/*
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
*/
client.login(process.env.maintoken)