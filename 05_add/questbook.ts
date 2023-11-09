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

function formatDate(date = new Date()) {
    const year = date.toLocaleString('default', {year: 'numeric'});
    const month = date.toLocaleString('default', {
        month: '2-digit',
    });
    const day = date.toLocaleString('default', {day: '2-digit'});

return [year, month, day].join('-');
} 

if(questBooks){
  switch (command) {
    case '--list':
        if (cliCommand.length === 2) {
            const questBooks: Quest[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            if(questBooks) {
                const ongoing: Quest[] = questBooks.filter(item => item.completion_state === 0);

                if(ongoing) {
                    console.log('=== Ongoing ===');
                    for (const item of ongoing) {
                        console.log(`#${item.id} ${item.name}`);
                    }
                } else {
                    console.log('=== Ongoing ===');
                    console.log('None');
                }

                const complete: Quest[] = questBooks.filter(item => item.completion_state === 1);

                if(complete) {
                    console.log('=== Complete ===');
                    for (const item of complete) {
                        console.log(`#${item.id} ${item.name}`);
                    }
                } else {
                    console.log('=== Complete ===');
                    console.log('None');
                }

                const failed: Quest[] = questBooks.filter(item => item.completion_state === 2);

                if(failed) {
                    console.log('=== Failed ===');
                    for (const item of failed) {
                        console.log(`#${item.id} ${item.name}`);
                    }
                } else {
                    console.log('=== Failed ===');
                    console.log('None');
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
            if(parseInt(cliCommand[1], 10) > 0) {
                const questBooks: Quest[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                const id: number = parseInt(cliCommand[1], 10);
                
                if(questBooks) {
                    let questBook: Quest = {
                        id: 0,
                        name: '',
                        description: '',
                        quest_type: '',
                        completion_state: -1,
                        quest_giver: '',
                        start_date: '',
                        end_date: '',
                        reward: ''
                    };

                    for (const item of questBooks) {
                        if(item.id === id) {
                            questBook = item;
                        }
                    }

                    if(questBook) {
                        console.log('========================================');
                        console.log(`#${questBook.id} ${questBook.name} (${questBook.quest_type} quest)`);
                        console.log('========================================');
                        console.log(`Given by ${questBook.quest_giver}`);

                        if(questBook.completion_state === 0) {
                            console.log('Currently ongoing.');
                        } else if(questBook.completion_state === 1) {
                            console.log(`Completed since the ${questBook.end_date}.`);
                        } else if(questBook.completion_state === 2) {
                            console.log(`Failed the ${questBook.end_date}.`);
                        }

                        console.log('========================================');

                        if(questBook.description.length > 0) {
                            console.log(`Goal: ${questBook.description}`);
                        }

                        if(questBook.reward === questBook.name || questBook.reward === '') {
                            console.log('Reward: ---');
                        } else {
                            console.log(`Reward: ${questBook.reward}`);
                        }
                    } else {
                        console.error("This quest doesn't exist.");
                    }
                } else {
                    console.error("File not found.");
                }
            } else {
                console.error("Wrong use of the program.");
            }
        } else {
          console.error("Wrong use of the program.");
        }
        break;
    case '--add':
        if (cliCommand.length === 18) {
            if(cliCommand[17].length > 0) {
                const questBooks: Quest[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                let quesItem: Quest = {
                    id: 0,
                    name: '',
                    description: '',
                    quest_type: '',
                    completion_state: -1,
                    quest_giver: '',
                    start_date: '',
                    end_date: '',
                    reward: ''
                };

                for(let i: number = 0; i < cliCommand.length; i++) {
                    if(cliCommand[i] === '-name') {
                        quesItem.name = cliCommand[i + 1];
                    }
                
                    if(cliCommand[i] === '-desc') {
                        quesItem.description = cliCommand[i + 1];
                    }
                
                    if(cliCommand[i] === '-type') {
                        quesItem.quest_type = cliCommand[i + 1];
                    }
                
                    if(cliCommand[i] === '-completion') {
                        quesItem.completion_state = parseInt(cliCommand[i + 1], 10);
                    }
                
                    if(cliCommand[i] === '-giver') {
                        quesItem.quest_giver = cliCommand[i + 1];
                    }
                
                    if(cliCommand[i] === '-start_date') {
                        let nowStartDate: Date = new Date();
                        let starDate: Date = new Date(cliCommand[i + 1]);

                        if(starDate <= nowStartDate) {
                            quesItem.start_date = formatDate(starDate);
                        } else {
                            console.error("Wrong use of the program.");
                            break;
                        }
                    }
                
                    if(cliCommand[i] === '-end_date') {
                        let nowEndtDate: Date = new Date();
                        let endDate: Date = new Date(cliCommand[i + 1]);

                        if(endDate <= nowEndtDate) {
                            quesItem.end_date = formatDate(endDate);
                        } else {
                            console.error("Wrong use of the program.");
                            break;
                        }
                    }
                
                    if(cliCommand[i] === '-reward') {
                        quesItem.reward = cliCommand[i + 1];
                    }
                }

                quesItem.id = questBooks.length + 1;
                questBooks.push(quesItem);
                let newQuestBooks: string = JSON.stringify(questBooks);

                try{
                    fs.writeFileSync(filePath, newQuestBooks, {encoding: 'utf-8', flag: 'w'});
                }catch(err){
                    throw new TypeError(err);
                }
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