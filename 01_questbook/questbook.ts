import * as fs from 'fs';

const cliCommand: string[] = process.argv.slice(2);
const command = cliCommand[0];
const filePath: string = cliCommand[cliCommand.length - 1];
const questBooks: boolean = fs.existsSync(filePath);

if(questBooks){
  switch (command) {
    case '--list':
        if (cliCommand.length === 2) {
            console.log('Using list.');
        } else {
          console.error("Wrong use of the program.");
        }
        break;
    case '--info':
        if (cliCommand.length === 3 && parseInt(cliCommand[1], 10)) {
            console.log('Using info.');
        } else {
          console.error("Wrong use of the program.");
        }
        break;
    case '--add':
        if (cliCommand.length === 18) {
            if(cliCommand[17].length > 0) {
                console.log('Using add.');
            } else {
              console.error("Wrong use of the program.");
            }
        } else {
          console.error("Wrong use of the program.");
        }
        break;
    default:
      console.error("Wrong use of the program.");
  }
} else {
  console.error("Wrong use of the program.");
}