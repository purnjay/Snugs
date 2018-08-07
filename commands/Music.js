const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async(bot, message, args) => {

let voiceChannel = message.member.voiceChannel;

if(message.content.startsWith("play")){

if(!voiceChannel){
message.reply("You aren't in a voice channel");
}else {

try {
  var connection = await voiceChannel.join();
} catch (e) {
  console.error(`${e}`)
  return message.reply("Can't connect to the voice channel for some reason");
    }

  }

if(message.content.startsWith("leave")){
  voiceChannel.leave();
  message.channel.send("Hey");
}




}

}

module.exports.help = {

name : "music"

}
