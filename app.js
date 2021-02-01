//-------------------------------------
// INCLUDE
//-------------------------------------
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
var fs = require("fs");
//------------------------------
// WELCOME SHIZZLE
//------------------------------
client.on('guildMemberAdd', member => {
    //SEND MESSAGE
    const message = `Welkom <@${member.id}>! Check <#735966372256940100> voor meer informatie`;
    const channel = member.guild.channels.cache.get('735966372256940099');
    channel.send(message);
    //ADD ROLE
    var role = member.guild.roles.cache.find(role => role.name === 'Member');
    member.roles.add(role);
});
//-------------------------------------
// PING
//-------------------------------------
client.on('message', msg => {
	var message = msg.content;
	var ping = 'ping';
  	if (message.toUpperCase() === ping.toUpperCase()) {
	  	msg.reply('Pong!');
  	}
});
client.on('message', msg => {
	var message = msg.content;
	var ping = 'pong';
  	if (message.toUpperCase() === ping.toUpperCase()) {
	  	msg.reply('Ping!');
  	}
});
//-------------------------------------
// TESTER
//-------------------------------------
client.on('message', msg => {
    var message = msg.content;
    var ping = 'gay';
    if (message.toUpperCase() === ping.toUpperCase()) {
        var values = ["Ja","Nee"],
            valueToUse = values[Math.floor(Math.random() * values.length)];
        msg.reply(valueToUse);
    }
});
//-------------------------------------
// KOP OF MUNT
//-------------------------------------
client.on('message', msg => {
    var message = msg.content;
    var ping = 'Kop of Munt';
    if (message.toUpperCase() === ping.toUpperCase()) {
        var values = ["Kop","Munt"],
            valueToUse = values[Math.floor(Math.random() * values.length)];
        msg.reply(valueToUse);
    }
});
//-------------------------------------
// JOERI
//-------------------------------------
client.on('message', async (message) => {
    var msg = message.content;
    var joeriping = 'joeri';
    if (msg.toLowerCase() === joeriping.toLowerCase()) {
        var values = ["Joeri stinkt.","Joeri, dombo.", "Joeri, chappie."],
            valueToUse = values[Math.floor(Math.random() * values.length)];
      	message.channel.send(valueToUse);
    }
});
/* 
//-------------------------------------
// COUNTER
//-------------------------------------
var counter = [{
    name: "bot",
    nummer: 0
}];
client.on("message", message => {
    if (message.channel.id == "804378504300200016") {
        if(!isNaN(message.content)){
            var counterlast = counter[counter.length - 1];
            var countercheck = counterlast["nummer"] + 1;
            var pinger = parseInt(message.content);
            var lastuser = counterlast["name"];
            if(countercheck === pinger && lastuser !== message.author.id){
                counter.push({name: message.author.id, nummer: countercheck});
                message.react('✅');
            }
            else{
                if(lastuser === message.author.id){
                    message.react('⚠️');
                    message.reply(`Chappie, niet nog een keer. Volgend nummer is 1`);
                    counter.length = 0;
                    counter.push({name: "bot", nummer: 0});
                }
                else{
                    message.react('⚠️');
                    message.reply(`Chappie, verkeerd nummer. Het moest ${countercheck} zijn. Volgend nummer is 1.`);
                    counter.length = 0;
                    counter.push({name: "bot", nummer: 0});
                }
            }
        }
    }
});
*/
//-------------------------------------
//counter 2
//-------------------------------------

var data = 0;
fs.readFile("count.txt", "utf-8", function(err, buf) {
    console.log(buf);
    data = buf;
    data = Number(data);
});
var pinger = 'bot';

client.on("message", message => {
    if(!isNaN(message.content)){
        if (message.channel.id == "804378504300200016") {
            console.log(pinger)
            fs.readFile("count.txt", "utf-8", function(err, buf) {
                data = buf;
                data = Number(data);
            });
                if(message.content == data + 1 ){
                    if(pinger == message.author){
                        message.react('⚠️');
                        message.reply(`Chappie, niet nog een keer. Volgend nummer is 1`);
                        fs.writeFile("count.txt", '0', (err) => {
                            if (err) console.log(err);
                        });
                    }
                    else{
                    data = data + 1;
                        message.react('✅');
                        pinger = message.author;
                        fs.writeFile("count.txt", data.toString(), (err) => {
                            if (err) console.log(err);
                        });
                    }
                }
                else{
                message.react('⚠️');
                message.reply(`Chappie, verkeerd nummer. Het moest ${data + 1} zijn. Volgend nummer is 1.`);
                fs.writeFile("count.txt", '0', (err) => {
                    if (err) console.log(err);
                });
        
            }
        }
    }
});

//-------------------------------------
// AMONG US
//-------------------------------------
client.on('message', (message) => {
    if(message.member.roles.cache.find(r => r.name === "Hosts")) {
        const shouldMute = (messageContent) => ['/mute'].includes(messageContent);
        const shouldUnMute = (messageContent) => ['/unmute'].includes(messageContent);
        const channel = message.channel;
        const members = channel.members;
        if (shouldMute(message.content)) {
            members.forEach(member => {
                member.voice.setMute(true);
            });
            message.channel.send('Call Muted');
        } else if (shouldUnMute(message.content)) {
            members.forEach(member => {
                member.voice.setMute(false);
            });
            message.channel.send('Call Unmuted');
        }
    }
});
//------------------------------
// BULK DELETER
//------------------------------
client.on("message", message => {
    if(message.content.startsWith("/purge")){
        if(message.member.roles.cache.find(r => r.name === "Moderator")) {
            let arg = message.content.split(" ");
            if(arg.length === 1){
                if (arg[0].toLowerCase() === "/purge") {
                    message.reply("Selecteer een hoeveelheid.");
                }
            }
            else{
                const deleteCount = parseInt(arg[1], 10);
                message.channel.bulkDelete(deleteCount + 1).catch();
            }
        }
        else{
            message.reply('Chappie, je bent geen mod')
            .then(msg => {
                msg.delete({ timeout: 5000 })
            }).catch(console.error);
        }
    }
});
//------------------------------
//KICK
//------------------------------
client.on("message", message =>{
    if(message.content.startsWith("/kick")){
        if(message.member.roles.cache.find(r => r.name === "Moderator")) {
            let arg = message.content.split(" ");
            var member = arg[1];
            var reason = arg[2];
            if(!reason){var reason = 'Geen reden gegeven';}
            if(arg.length === 1){
                message.reply("Selecteer iemand.");
            }
            else{
                let mentionMember = message.mentions.members.first();
                mentionMember.kick([reason]).then((member) => {
                    message.channel.send(`${member} is gekickt door <@${message.author.id}>. Wegens ${reason}`);
                });
            }
        }
        else{
            message.reply("Je hebt de benodigde rol niet.")
            .then(msg => {
                msg.delete({ timeout: 5000 })
            }).catch(console.error);
        }
    }
});
//------------------------------
//BAN
//------------------------------
client.on("message", message =>{
    if(message.content.startsWith("/ban")){
        if(message.member.roles.cache.find(r => r.name === "Moderator")) {
            let arg = message.content.split(" ");
            var member = arg[1];
            var reason = arg[2];
            //EMPTY VAR
            if(!reason){var reason = 'Geen reden gegeven';}
            if(arg.length === 1){
                message.reply("Selecteer iemand.");
            }
            else{
                let mentionMember = message.mentions.members.first();
                mentionMember.ban({
                    reason: reason
                }).then((member) => {
                    message.channel.send(`${member} is geband door <@${message.author.id}>. Wegens "${reason}"`);
                });
            }
        }
        else{
            message.reply("Je hebt de benodigde rol niet.")
            .then(msg => {
                msg.delete({ timeout: 5000 })
            }).catch(console.error);
        }
    }
});
//-------------------------------------
// READY BOT
//-------------------------------------
client.on('ready', () => {
	console.log(`Ingelogd als ${client.user.tag}!`);
});
//-------------------------------------
// TOKEN
//-------------------------------------
client.login(process.env.token);
