import * as fs from 'fs';

const cliCommand: string[] = process.argv.slice(2);
const command = cliCommand[0];
const filePath: string = cliCommand[cliCommand.length - 1];
const questBooks: boolean = fs.existsSync(filePath);

interface Quest {
    id: number,
    name: string,
    description: string,
    quest_type: string,
    completion_state: number,
    quest_giver: string,
    start_date: string,
    end_date: string,
    reward: string
}

if(questBooks){
  switch (command) {
    case '--list':
        if (cliCommand.length === 2) {
            const questBooks: Quest[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            
            if(questBooks) {
                for (const item of questBooks) {
                    if(item.id > 0) {
                        console.log(`#${item.id} ${item.name}`);
                    }
                }
            } else {
                console.error("File not found.");
            }
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