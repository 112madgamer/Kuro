let ghost
exports.init = function(bot){ ghost = bot }

exports.run = function(msg, args) {

    if(args[0] === undefined) return msg.delete()
    if(!args[0].startsWith('<:')) return ghost.edit(msg, 'Not a valid emote')

    let id = args[0].substring(args[0].lastIndexOf(":") + 1, args[0].lastIndexOf(">"))
    let emoteInfo = ghost.emojis.get(id);
    if(!emoteInfo) return ghost.edit(msg, 'No emote with that id')

    msg.edit({
        "embed": {
            "type": "rich",
            "color": 15473237,
            "thumbnail": {
                url: "https://cdn.discordapp.com/emojis/" + emoteInfo.id + ".png"
            },
            "fields": [
                {
                    "name": "Emote Name",
                    "value": emoteInfo.name,
                    "inline": true
                },
                {
                    "name": "Emote ID",
                    "value": `[${emoteInfo.id}](https://cdn.discordapp.com/emojis/${emoteInfo.id}.png)`,
                    "inline": true
                },
                {
                    "name": "Managed",
                    "value": emoteInfo.managed,
                    "inline": true
                },
                {
                    "name": "Server",
                    "value": `${emoteInfo.guild.name}`,
                    "inline": true
                }
            ]
         }
    });
    
}