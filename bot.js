// Dependencies
const Discord = require('discord.js');
const auth = require('./auth.json');

const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	
	if (msg.author.bot) return;
	
	let commands = msg.content.split(" ", 3);
	if (commands[0] === "create" && commands[1] === "role") {
		msg.guild.roles.create({
			data: {
				name: commands[2],
				color: 'BLUE'
			},
			reason:  `${msg.member.user.tag} requested this role`
		})
		.then(console.log)
		.catch(console.error);
		
		makeChannel(msg, commands[2]);
		
	}
	
});

function makeChannel(msg, name) {
	let channelManager = msg.guild.channels
	
	channelManager.create(name, {
		type: 'voice'
	})
	
	channelManager.create(name, {
		type: 'text'
	})
}

client.login(auth.token);