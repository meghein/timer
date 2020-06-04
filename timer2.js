// Set timers "on demand" from user input.

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// The user can press b and it should beep right away
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.setEncoding('utf8');

stdin.on('data', (key) => {
  if (key === 'b') {
  process.stdout.write('\rALARM');
  }
  if (key === '\u0003') {
    console.log('Thanks for using me, ciao!');
    process.exit();
  }
});

// The user can input any number from 1 to 9 and it should
// immediately output "setting timer for x seconds...", and
// beep after that number of seconds has passed

const timerFunction = () => {
  rl.question('Set Timer: ', number => {
    if (isNaN(number) || number <= 0 || number > 9) {
      console.log('Please input a number between 1 - 9');
      timerFunction();
    } else {
      console.log(`setting timer for ${number} seconds...`)
      setTimeout(() => {
        process.stdout.write('\nALARM\n (press enter to set another alarm or press ctrl + c to exit)\n');
        timerFunction();
      }, number * 1000);
    }
  });
};

timerFunction();

// The user can use ctrl + c to exit the program, at which point the program should say 
// "Thanks for using me, ciao!" before terminating

rl.on('SIGINT', () => {
  console.log('\nThanks for using me, ciao!')
  rl.close()
});