// Extrae las clases requeridas del modulo discord.js
const { Client, RichEmbed } = require('discord.js');
// Crea una instancia de un cliente de Discord
const client = new Client();

// Atributos (Otros)

// Prefijo para los comandos
const prefix = '|';

const guildID = '488163902840897566';
const defaultRole = '543551350814801960';

var globalMember;
var role;
var array = new Array();

/**
 * El evento ready es vital, sólamente después de este el bot podrá empezar a reaccionar
 * a la información recibida de Discord
 */
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Bajo Desarrollo");
});

client.on('message', message => {
	if (!(message.channel.type === 'dm')) return;
	if (!message.content.startsWith(prefix)) return;
	message.content = message.content.toLowerCase().substring(prefix.length);

	if (message.content === 'setstar') {
		client.guilds.get(guildID).members.forEach( (member) => {
	        if(member.roles.has(defaultRole)) {
	        	globalMember = member;
	            starSelectEmbed();
	        }
	    })
	}

});

client.on('guildMemberAdd', member => {
	member.addRole(defaultRole);
	globalMember = member;
	starSelectEmbed();
})

client.on('messageReactionAdd', messageReaction => {
	if (messageReaction.users.last().id === '610430801896669184' || !(messageReaction.message.id === messageReaction.message.channel.lastMessageID)) return;

	globalMember = client.guilds.get(guildID).members.get(messageReaction.users.last().id);

	var embed, icon, hexColor;
	var confirmationRequired = false;

	if (messageReaction.emoji.id === '610439029145468938') {
		icon = client.emojis.find(emoji => emoji.name === 'LightBlueStar');
		hexColor = '8996dd';
		confirmationRequired = true;
		role = '538579092229062669';
	} else 	if (messageReaction.emoji.id === '610439028642414613') {
		icon = client.emojis.find(emoji => emoji.name === 'BlueStar');
		hexColor = '304cda';
		confirmationRequired = true;
		role = '501660310722314240';
	} else 	if (messageReaction.emoji.id === '610439028789084172') {
		icon = client.emojis.find(emoji => emoji.name === 'RedStar');
		hexColor = 'dd2b36';
		confirmationRequired = true;
		role = '501248699784232970';
	} else 	if (messageReaction.emoji.id === '610439167029280768') {
		icon = client.emojis.find(emoji => emoji.name === 'OrangeStar');
		hexColor = 'f68d1d';
		confirmationRequired = true;
		role = '501249428347158530';
	} else 	if (messageReaction.emoji.id === '610439029498052618') {
		icon = client.emojis.find(emoji => emoji.name === 'YellowStar');
		hexColor = 'ffff00';
		confirmationRequired = true;
		role = '501249504562118657';
	} else 	if (messageReaction.emoji.id === '610439029401452575') {
		icon = client.emojis.find(emoji => emoji.name === 'WhiteStar');
		hexColor = 'ffffff';
		confirmationRequired = true;
		role = '501249344163545109';
	} else 

	if (messageReaction.emoji.name === '✅'){
		for (i = 0; i < array.length; i++) {
			if (array[i].startsWith(globalMember.id)) {
				globalMember.removeRole(defaultRole);
				globalMember.addRole(array[i].substring(array[i].indexOf(' ') + 1));
				break;
			}
		}
		messageReaction.message.delete();
		embed = new RichEmbed()
			.setTitle('Rango Establecido')
			.setDescription('Se ha establecido con existo su rango en el servidor!')
			.setFooter('Si hubo un error favor de contactar con GodOfDecay')
			.setColor('562a73');
		messageReaction.message.channel.send(embed).then(sentMessage => {
			sentMessage.delete(1000 * 30)
		});
		messageReaction.message.channel.lastMessage.delete(5);
	} else 	if (messageReaction.emoji.name === '🚫'){
		for (i = 0; i < array.length; i++) {
			if (array[i].startsWith(globalMember.id)) {
				array.splice(i, 1);
				break;
			}
		}
		messageReaction.message.delete();
		starSelectEmbed();
	} else return;

	if (confirmationRequired) {
		messageReaction.message.delete();
		array.push(messageReaction.users.last().id + ' ' + role);
		embed = new RichEmbed()
			.setTitle('Confirmación Requerida')
			.setDescription('Ha seleccionado: ' + icon +'\n'
				+ '¿Desea Confirmar?')
			.setColor(hexColor);
		messageReaction.message.channel.send(embed).then(sentMessage => {
			sentMessage.react('✅')
			.then(() => sentMessage.react('🚫'))
			.then(() => sentMessage.delete(1000 * 60 * 5))
			.catch((error) => console.log('Mensaje Eliminado'))
		});
	}
});

// Logea al bot utilizando el token del bot en: https://discordapp.com/developers/applications/me
client.login(process.env.BOT_TOKEN);

//Funciones

function starSelectEmbed() {
	embed = new RichEmbed()
		.setTitle('Selecciona tu Estrella en RotMG')
		.setDescription('**Bienvenido al servidor RotMG Latino!** 👋\n'
				+ 'Para poder mostrar tu rango en el servidor es necesario que reacciones con tu estrella, gracias.')
		.setFooter('Este mensaje se eliminará dentro de 5 minutos')
		.setColor('562a73');
	globalMember.send(embed).then(sentMessage => {
		sentMessage.react('610439029145468938')
		.then(() => sentMessage.react('610439028642414613'))
		.then(() => sentMessage.react('610439028789084172'))
		.then(() => sentMessage.react('610439167029280768'))
		.then(() => sentMessage.react('610439029498052618'))
		.then(() => sentMessage.react('610439029401452575'))
		.then(() => sentMessage.delete(1000 * 60 * 5))
		.catch((error) => console.log('Mensaje Eliminado'))
	});
	console.log(globalMember.user.username);
}
