import { Command } from 'commander';
import { addCommand } from './commands/add.js';
import { initCommand } from './commands/init.js';


declare const __VERSION__: string;

const program = new Command();

program
  .name('groovy-ui')
  .description('Add beautiful UI components to your React Native project')
  .version(__VERSION__);

program
  .command('init')
  .description('Initialize groovy-ui in your project')
  .option('-y, --yes', 'Skip confirmation prompts')
  .action(initCommand);

program
  .command('add [components...]')
  .description('Add UI components to your project')
  .option('-o, --overwrite', 'Overwrite existing components')
  .option('-y, --yes', 'Skip confirmation prompts')
  .action(addCommand);

program.parse();