# Alterac Valley (AV) Premade Helper
> Nodejs discord bot written in typescript that helps create AV premades.

Bot parses (AV) numbers posted to configurabLe channel, summarizes the results
and then posts the summary as an embed with clickable voice channel invites.
Voice channels should be named AV* and the bot must have permission to create 
invites for tthose voice channels.

## Getting started

Make sure you have NodeJS 10.x installed.
Clone this repository to your machine and run npm install to install dependencies.

```shell
git clone https://github.com/MvDDev/AlteracValleyPremadeHelper
cd awesome-project/
npm install
```

### Initial Configuration

Create a secret.ts file in the ./src folder and add your Discord bot login key.

```shell
export const loginKey = 'your key here';
```

Set some sensible defaults in the ./types/config.ts file or use the 

```shell
const config = new Config();
```
line to add them programmatically.

### Building

Compile the code with npm or run ```tsc``` manually.

```shell
npm run build
```

This will transpile the typescript code into javascript and save the output
in the ./dist folder so its runnable by node.

### Starting the bot

You are now ready to run the bot.

```shell
npm start
```
The bot should now start and print ```Ready!``` in the console.

## Further reading

For details on how the change/expand the bot and use the discord.js module
checkout the following websites
* https://discordjs.guide/
* https://discord.js.org

Things to consider adding/changing
* Help function
* Operator commands to change bot settings 
* Add support for differing configuration per guild (e.g. via a Config array)
* Add 'snipe' limits and don't auto generate invite for those AVs
* Skip first x voice channels so moderator can use those for 'snipe'AVs

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. 

## License

https://opensource.org/licenses/ISC
