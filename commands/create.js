exports.run = (client, msg, args) => {
	
	const msgFlags = args.filter(e => { return e.startsWith("--") || e.startsWith("-") })
	flagsToDefaults();
	
	msgFlags
	.map(e => e.replace(/^(--|-)/,""))
	.forEach(userFlag => {
		
		let foundFlag = false;
		
		flags.forEach(commandFlag => {
			if (commandFlag.short === userFlag || commandFlag.long === userFlag) {
				commandFlag.isOn = true;
				foundFlag = true;
			}
		})
		
		if (foundFlag != true) { 
			msg.channel.send("Unknow flag")
		}
		
	});
	
	if (args.length != 2) { 
		msg.channel.send("Wrong number of arguments! Example rolebot create role normik")
		return
	}
	
	switch (args[0]) {
		case 'role': {
			addRole(msg, args[1]);
			addChannels(msg, args[1]);
			break;
		}
		default:
			msg.channel.send("Unknown argument specified")
	}
	
};

function addRole(msg, name) {
	msg.guild.roles.create({
		data: {
			name: name,
			color: 'BLUE'
		},
		reason: `${msg.member.user.tag} requested this role`
	})
}

function addChannels(msg, name) {
	let channelManager = msg.guild.channels
	
	channelManager.create(name, {
		type: 'voice'
	})
	
	channelManager.create(name, {
		type: 'text'
	})
}

const flags = [
	{
		short: "n",
		long: "no-channels",
		isOn: false,
		description: "Doesn't create the channels"
	},
	{
		short: "t",
		long: "text",
		isOn: false,
		description: "Creates only text channel"
	},
	{
		short: "v",
		long: "voice",
		isOn: false,
		description: "Creates only voice channel"
	}
]

// Refactor flags to class so it's just instantieted
function flagsToDefaults() {
	flags.forEach(f => f.isOn = false);
}

exports.help = {
	name: 'create'
};