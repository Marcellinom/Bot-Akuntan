import fs from "fs"
export async function driver(args,client)
{
    console.log(args[1]);
    switch(args[1]) {
        case "name": return edit("nama_node");
        case "slot": return edit("slot");
        case "capacity": return edit("cap");
        case "status": return edit("status");
    }

    function edit(opt) {
        try{
            if(fs.existsSync(`storage/${args[2]}.json`)) return "Duplicate NODE found!";
            if(fs.existsSync(`storage/${args[0]}.json`)) {
                let raw = fs.readFileSync(`storage/${args[0]}.json`);
                var node = JSON.parse(raw);
                
                if(opt === 'slot' || opt === 'cap') {
                    if(!isNaN(Number(args[2]))) args[2] = Number(args[2]);
                    else return "input a valid number!";
                    if(args[2] > node.cap)
                        return(
                            `Maximum Capacity Reached!\`\`\`nama:\u0009  ${node.nama_node}\nslot:\u0009  ${node.slot}\nkapasitas: ${node.cap}\nstatus:\u0009${node.status}\`\`\``
                        )
                    if(args[2] < 0)
                        return(
                            `Enter value above zero gblk!\`\`\`nama:\u0009  ${node.nama_node}\nslot:\u0009  ${node.slot}\nkapasitas: ${node.cap}\nstatus:\u0009${node.status}\`\`\``
                        )
                }
            } else console.log("NODE not found!");
            node[opt] = args[2];
            let data = JSON.stringify(node,null,5);
            fs.writeFileSync(`storage/${args[0]}.json`, data);
            if(opt === "nama_node")
                fs.renameSync(`storage/${args[0]}.json`,`storage/${args[2]}.json`,
                function(e) {
                    if(e) {console.log(e);return "an error has occured, check logs!";}
                });

        } catch (e) {
            console.log(e);
            return "an error has occured, check logs!";
        }
        return(
            `${args[0]} updated!\`\`\`nama:\u0009  ${node.nama_node}\nslot:\u0009  ${node.slot}\nkapasitas: ${node.cap}\nstatus:\u0009${node.status}\`\`\``
        )
    }
}