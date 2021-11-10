import fs from "fs"
export async function driver(args,client)
{
    try {
        fs.unlinkSync(`storage/${args[0]}.json`);
        return("NODE successfuly removed!")
    } catch(e) {
        console.log(e)
        return(`NODE ${args[0]} not found! - see logs for more info!`)
    }
}