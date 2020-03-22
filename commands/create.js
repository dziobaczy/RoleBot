exports.run = (client, msg, args) => {
	
	const msgFlags = args
	.filter(e => { 
		if (e.startsWith("--") || e.startsWith("-")) {
			let index = args.indexOf(e)
			args.splice(index, 1)
			return true
		} else {
			return false
		}
	})
	.map(e => e.replace(/^(--|-)/,""))
	
	if (msgFlags.length > 1) { msg.channel.send("This command accepts only 1 flag"); return; }
	
	let wrongFlagFound = false
	
	msgFlags
	.forEach(userFlag => {
		
		let foundFlag = false;
		
		flags.forEach(commandFlag => {
			if (commandFlag.short === userFlag || commandFlag.long === userFlag) {
				foundFlag = true;
			}
		})
		
		if (foundFlag != true) { 
			msg.channel.send("Unknow flag");
			wrongFlagFound = true;
			return
		}
		
	});
	
	if (wrongFlagFound) { return }
	
	if (args.length != 2) { 
		msg.channel.send("Wrong number of arguments! Example rolebot create role normik")
		return
	}
	
	switch (args[0]) {
		case 'role': {
			addRole(msg, args[1]);
			switch (msgFlags[0]) {
				case 'n': { break; }
				case 't': { 
					addChannel(msg, "text", args[1]);
					break;
				}
				case 'v': {
					addChannel(msg, "voice", args[1]);
					break;
				}
				default: {
					addChannel(msg, "text", args[1]);
					addChannel(msg, "voice", args[1]);
				}
			}
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

function addChannel(msg, type, name) {
	let channelManager = msg.guild.channels
	
	channelManager.create(name, {
		type: type
	})
}

const flags = [
	{
		short: "n",
		long: "no-channels",
		description: "Doesn't create the channels"
	},
	{
		short: "t",
		long: "text",
		description: "Creates only text channel"
	},
	{
		short: "v",
		long: "voice",
		description: "Creates only voice channel"
	}
]

exports.help = {
	name: 'create'
};