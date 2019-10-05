// Extrae las clases requeridas del modulo discord.js
const { Client, RichEmbed } = require('discord.js');
// Crea una instancia de un cliente de Discord
const client = new Client();

// Atributos (Otros)

// Prefijo para los comandos
const prefix = '|';

const guildID = '488163902840897566';
const defaultRole = '543551350814801960';

var currentMember;
var role;
var array = new Array();

/**
 * El evento ready es vital, sólamente después de este el bot podrá empezar a reaccionar
 * a la información recibida de Discord
 */
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Realm of the Mad God");
});

// Crea un Event Listener para los mensajes recibidos
client.on('message', message => {
	// Si no es un Mensaje Directo ignora el mensaje
	if (!(message.channel.type === 'dm')) return;
	// Si no inicia con el prefijo '|' ignora el mensaje
	if (!message.content.startsWith(prefix)) return;
	// Elimina el prefijo al inicio del comando/texto
	message.content = message.content.toLowerCase().substring(prefix.length);

	// Si el texto es 'setStar'
	if (message.content === 'setstar') {
		// Mira a cada uno de los miembros de la Guild/Server
		client.guilds.get(guildID).members.forEach( (member) => {
			// Y si tiene de rol "Unknown Default"
	        if(member.roles.has(defaultRole)) {
	        	// Establece el valor de "currentMember" (Miembro actual) cómo la del último miembro que cumpla el requisito anterior
	        	currentMember = member;
	        	// Función que envía el mensaje
	            starSelectEmbed();
	        }
	    })
	}
});

client.on('guildMemberAdd', member => {
	member.addRole(defaultRole);
	currentMember = member;
	starSelectEmbed();
})

client.on('messageReactionAdd', messageReactioned => {
	if (messageReactioned.users.last().id === '610430801896669184' || messageReactioned.message.id !== messageReactioned.message.channel.lastMessageID || messageReactioned.message.author.id !== '610430801896669184') return;

	currentMember = client.guilds.get(guildID).members.get(messageReactioned.users.last().id);

	var embed, icon, hexColor;
	var confirmationRequired = false;

	if (messageReactioned.emoji.id === '610439029145468938') {
		icon = client.emojis.find(emoji => emoji.name === 'LightBlueStar');
		hexColor = '8996dd';
		confirmationRequired = true;
		role = '538579092229062669';
	} else 	if (messageReactioned.emoji.id === '610439028642414613') {
		icon = client.emojis.find(emoji => emoji.name === 'BlueStar');
		hexColor = '304cda';
		confirmationRequired = true;
		role = '501660310722314240';
	} else 	if (messageReactioned.emoji.id === '610439028789084172') {
		icon = client.emojis.find(emoji => emoji.name === 'RedStar');
		hexColor = 'dd2b36';
		confirmationRequired = true;
		role = '501248699784232970';
	} else 	if (messageReactioned.emoji.id === '610439167029280768') {
		icon = client.emojis.find(emoji => emoji.name === 'OrangeStar');
		hexColor = 'f68d1d';
		confirmationRequired = true;
		role = '501249428347158530';
	} else 	if (messageReactioned.emoji.id === '610439029498052618') {
		icon = client.emojis.find(emoji => emoji.name === 'YellowStar');
		hexColor = 'ffff00';
		confirmationRequired = true;
		role = '501249504562118657';
	} else 	if (messageReactioned.emoji.id === '610439029401452575') {
		icon = client.emojis.find(emoji => emoji.name === 'WhiteStar');
		hexColor = 'ffffff';
		confirmationRequired = true;
		role = '501249344163545109';
	} else 

	if (messageReactioned.emoji.name === '✅'){
		for (i = 0; i < array.length; i++) {
			if (array[i].startsWith(currentMember.id)) {
				currentMember.removeRole(defaultRole);
				currentMember.addRole(array[i].substring(array[i].indexOf(' ') + 1));
				break;
			}
		}
		messageReactioned.message.delete();
		embed = new RichEmbed()
			.setTitle('Rango Establecido')
			.setDescription('Se ha establecido con existo su rango en el servidor!')
			.setFooter('Si hubo un error favor de contactar con GodOfDecay')
			.setColor('562a73');
		messageReactioned.message.channel.send(embed).then(sentMessage => {
			sentMessage.delete(1000 * 30)
		});
		messageReactioned.message.channel.lastMessage.delete(5);
	} else 	if (messageReactioned.emoji.name === '🚫'){
		for (i = 0; i < array.length; i++) {
			if (array[i].startsWith(currentMember.id)) {
				array.splice(i, 1);
				break;
			}
		}
		messageReactioned.message.delete();
		starSelectEmbed();
	} else return;

	if (confirmationRequired) {
		messageReactioned.message.delete();
		array.push(messageReactioned.users.last().id + ' ' + role);
		embed = new RichEmbed()
			.setTitle('Confirmación Requerida')
			.setDescription('Ha seleccionado: ' + icon +'\n'
				+ '¿Desea Confirmar?')
			.setColor(hexColor);
		messageReactioned.message.channel.send(embed).then(sentMessage => {
			sentMessage.react('✅')
			.then(() => sentMessage.react('🚫'))
			.then(() => sentMessage.delete(1000 * 60 * 5))
			.catch((error) => console.log('Mensaje Eliminado'))
		});
	}
});

// Logea al bot utilizando el token del bot en: https://discordapp.com/developers/applications/me
client.login(process.env.BOT_TOKEN);
// client.login('NjEwNDMwODAxODk2NjY5MTg0.XVFKXg.pxXz-pWnvAmroJt_HM4MFdLbR9A');

// Funciones

function starSelectEmbed() {
	embed = new RichEmbed()
		.setTitle('Selecciona tu Estrella en RotMG')
		.setDescription('**Bienvenido al servidor RotMG Latino!** 👋\n'
				+ 'Para poder mostrar tu rango en el servidor es necesario que reacciones con tu estrella, gracias.')
		.setFooter('Este mensaje se eliminará dentro de 5 minutos')
		.setColor('562a73');
	currentMember.send(embed).then(sentMessage => {
		sentMessage.react('610439029145468938')
		.then(() => sentMessage.react('610439028642414613'))
		.then(() => sentMessage.react('610439028789084172'))
		.then(() => sentMessage.react('610439167029280768'))
		.then(() => sentMessage.react('610439029498052618'))
		.then(() => sentMessage.react('610439029401452575'))
		.then(() => sentMessage.delete(1000 * 60 * 5))
		.catch((error) => console.log('Mensaje Eliminado'))
	});
	console.log(currentMember.user.username);
}