const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, prefix) => {

if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`You can't change the prefix! UWU`);
if(!args[0] || args[0 == "help"])
return message.reply(`Usage: !prefix <desired prefix here>`);

let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

prefixes[message.guild.id] ={
  prefixes: args[0]
};

fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {

if(err) console.log(err)

});



message.channel.send(`The prefix is now set to ${args[0]}`);


}

module.exports.help = {

name : "prefix"

}
