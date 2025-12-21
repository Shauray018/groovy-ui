import { Command } from 'commander';
import { addCommand } from './commands/add.js';
import { initCommand } from './commands/init.js';

const program = new Command();

program
  .name('groovy-ui')
  .description('Add beautiful UI components to your React Native project')
  .version('0.1.0');

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