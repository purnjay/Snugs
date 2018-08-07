const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone : true});

const ytdl = require("ytdl-core");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

if(err) console.log(err);

let jsfile = files.filter(f => f.split(".").pop() === "js")
if(jsfile.length <= 0){
  console.log("Couldn't find commands~!");
  return
}

jsfile.forEach((f, i) => {
  let props = require(`./commands/${f}`);
  console.log(`${f} loaded~!`);
  bot.commands.set(props.help.name, props);
});


});



bot.on("ready", async () => {

console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("on Aesthetic Hotline");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return;

  //let prefix = botconfig.prefix;

let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

if(!prefixes[message.guild.id]){
  prefixes[message.guild.id] = {
    prefixes: botconfig.prefix
  };
}

let prefix = prefixes[message.guild.id].prefixes;
console.log(prefix);

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

let commandFile = bot.commands.get(cmd.slice(prefix.length));
if(commandFile) commandFile.run(bot, message, args);




 if(cmd === `${prefix}hello`){
   return message.channel.send("hello!");
 }

if (cmd === `${prefix}ping`) {
    message.channel.send("pong!");
  }

if(cmd === `${prefix}help`){
  let helpEmbed = new Discord.RichEmbed()
  .setColor("#ffccda")
  .setAuthor("Snugs", "https://cdn.discordapp.com/attachments/469454593563033609/475583812022173706/cute.jpg")
  .setTitle("Help")
  .setFooter(message.author.username, message.author.avatarURL)
  .setDescription(`Commands

${prefix}hello
${prefix}ping
${prefix}prefix
${prefix}help
${prefix}play
${prefix}leave
`)
  .setTimestamp();

  message.channel.send(helpEmbed);
}

if(cmd === `${prefix}ZA_WARUDO`){
  message.channel.send(`*time has been stopped for five seconds.* ***ORA ORA ORAAAA!!!***`);
}





if(cmd === `${prefix}play`){

let voiceChannel = message.member.voiceChannel;

  if(!voiceChannel){
  message.reply("You aren't in a voice channel");
  }else {

  try {
    var connection = await voiceChannel.join();
    message.reply("Joined");
  } catch (e) {
    console.error(`${e}`)
    return message.reply("Can't connect to the voice channel for some reason");
      }

    }

const dispatcher = connection.playStream(ytdl(args[0]))
.on('end',() =>{
  console.log("song ended");
  voiceChannel.leave();
})
.on('error', error => {
  console.error(error);
});

//dispatcher.setVolumeLogarithmic(5 / 5);
dispatcher.setVolume(2);

}

if(cmd === `${prefix}leave`){

let voiceChannel = message.member.voiceChannel;
    voiceChannel.leave();
    message.reply(`left ${voiceChannel}`)
  }



});


bot.login(botconfig.token);
