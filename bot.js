// Dependencies
const Discord = require('discord.js');
const fs = require('fs');
const Enmap = require('enmap');
const { token, prefix } = require('./auth.json');

const client = new Discord.Client();
client.commands = new Enmap();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	
	if (msg.author.bot) return;
	if (msg.content.indexOf(prefix) !== 0) return;
	
	
	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	const cmd = client.commands.get(command);
	if (!cmd) return;
	
	cmd.run(client, msg, args);
			
});

fs.readdir('./commands/', async (err, files) => {
	if (err) return console.error;
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		let props = require(`./commands/${file}`);
		let cmdName = file.split('.')[0]
		console.log(`Loaded command ${cmdName}`);
		
		client.commands.set(cmdName, props);
	});
});

client.login(token);