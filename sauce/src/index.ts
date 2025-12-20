// src/index.ts
import { Command } from 'commander';
import { addCommand } from './commands/add.js';
import { initCommand } from './commands/init.js';

const program = new Command();

program
  .name('groovy-ui')
  .description('Add beautiful UI components to your React Native project')
  .version('1.0.0');

// Init command - prepares project for groovy-ui
program
  .command('init')
  .description('Initialize groovy-ui in your project')
  .option('-y, --yes', 'Skip confirmation prompts')
  .action(initCommand);

// Add command - adds components
program
  .command('add [components...]')
  .description('Add UI components to your project')
  .option('-o, --overwrite', 'Overwrite existing components')
  .action(addCommand);

program.parse();