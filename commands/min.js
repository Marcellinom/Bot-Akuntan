const discord = require('discord.js');
const fs = require('fs');
module.exports = {
    driver: async function(args,clinet){
        try {
        let node_name = args[0];
            let raw = fs.readFileSync(`storage/${node_name}.json`);
            let node = JSON.parse(raw); 
            try{
                if(node.slot - Number(args[1]) < 0) {
                    return(`slot harus lebih dari sama dengan 0!\`\`\`nama: ${node_name}\nslot: ${node.slot}\nkapasitas: ${node.cap}\`\`\``)
                }
            
            node.slot -= Number(args[1]);   
            let data = JSON.stringify(node,null,5);
            fs.writeFileSync(`storage/${node_name}.json`, data); 
            
            return(
            `${node_name} updated!\`\`\`nama:\u0009  ${node_name}\nslot:\u0009  ${node.slot}\nkapasitas: ${node.cap}\nstatus:\u0009${node.status}\`\`\``
            )
            
            } catch (e) {
                console.log(e);
                return("Error has occured! (see console logs for info)");
            } 
        } catch(e) {
            return("Node not found!");
        }
    }
};