// src/commands/init.ts
import inquirer from 'inquirer';
import ora from 'ora';
import path from 'path';
import fs from 'fs-extra';
import { logger } from '../utils/logger.js';
import { 
  validateProjectStructure, 
  ensureDirectoryExists,
  writeComponentFile 
} from '../utils/filesystem.js';

interface InitCommandOptions {
  yes?: boolean;
  components?: boolean;
}

/**
 * Initialize groovy-ui in the current project
 * This creates the necessary folder structure and config files
 */
export async function initCommand(
  options: InitCommandOptions = {}
): Promise<void> {
  const projectPath = process.cwd();

  logger.info('🎨 Initializing Groovy UI in your project...');
  logger.newline();

  // Step 1: Validate this is a React Native/Expo project
  const spinner = ora('Checking project structure...').start();
  const isValidProject = await validateProjectStructure(projectPath);

  if (!isValidProject) {
    spinner.fail('Not a valid React Native or Expo project');
    logger.error('This command must be run in a React Native or Expo project');
    logger.info('Make sure you have a package.json with react-native or expo');
    process.exit(1);
  }
  spinner.succeed('Valid React Native/Expo project detected');

  // Step 2: Check if groovy-ui is already initialized
  const componentsDir = path.join(projectPath, 'components', 'ui');
  const alreadyInitialized = await fs.pathExists(componentsDir);

  if (alreadyInitialized && !options.yes) {
    logger.warn('Groovy UI appears to be already initialized');
    logger.plain(`Found existing directory: ${componentsDir}`);

    const { proceed } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'proceed',
        message: 'Continue anyway?',
        default: false,
      },
    ]);

    if (!proceed) {
      logger.info('Initialization cancelled');
      return;
    }
  }

  // Step 3: Create folder structure
  spinner.start('Creating folder structure...');
  
  try {
    // Create components/ui directory
    await ensureDirectoryExists(path.join(projectPath, 'components', 'ui'));
    
    // Create lib/utils directory (for utility functions)
    await ensureDirectoryExists(path.join(projectPath, 'lib', 'utils'));
    
    // Optional: Create hooks directory
    await ensureDirectoryExists(path.join(projectPath, 'hooks'));

    spinner.succeed('Folder structure created');
  } catch (error) {
    spinner.fail('Failed to create folder structure');
    throw error;
  }

  // Step 4: Create utility files
  spinner.start('Setting up utilities...');

  try {
    // Create cn utility (for conditional classNames - useful for styling)
    const cnUtilPath = path.join(projectPath, 'lib', 'utils', 'cn.ts');
    const cnUtilContent = `// Utility for merging class names
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
`;
    await writeComponentFile(cnUtilPath, cnUtilContent);

    // Create colors utility (for theme colors)
    const colorsUtilPath = path.join(projectPath, 'lib', 'utils', 'colors.ts');
    const colorsUtilContent = `// Color utilities for your components
export const colors = {
  primary: '#007AFF',
  secondary: '#8E8E93',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  background: '#FFFFFF',
  text: '#000000',
  border: '#E5E5EA',
};

export function getColor(name: keyof typeof colors): string {
  return colors[name];
}
`;
    await writeComponentFile(colorsUtilPath, colorsUtilContent);

    spinner.succeed('Utilities created');
  } catch (error) {
    spinner.fail('Failed to create utilities');
    throw error;
  }

  // Step 5: Create a basic index file for components
  spinner.start('Creating component index...');

  try {
    const indexPath = path.join(projectPath, 'components', 'ui', 'index.ts');
    const indexContent = `// Export all your UI components from here
// Example:
// export { Button } from './button';
// export { Alert } from './alert';
// export { Card } from './card';

// Components will be added here when you run: groovy-ui add <component>
`;
    await writeComponentFile(indexPath, indexContent);

    spinner.succeed('Component index created');
  } catch (error) {
    spinner.fail('Failed to create component index');
    throw error;
  }

  // Step 6: Create a README
  spinner.start('Creating documentation...');

  try {
    const readmePath = path.join(projectPath, 'components', 'README.md');
    const readmeContent = `# Groovy UI Components

This directory contains your UI components from Groovy UI.

## Structure

\`\`\`
components/
├── ui/           # Core UI components
│   ├── button.tsx
│   ├── alert.tsx
│   └── index.ts
└── README.md     # This file
\`\`\`

## Adding Components

Add new components using the Groovy UI CLI:

\`\`\`bash
npx groovy-ui add button
npx groovy-ui add alert card
\`\`\`

## Usage

Import components from the ui directory:

\`\`\`tsx
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

export default function App() {
  return (
    <Button title="Click me" onPress={() => alert('Hello!')} />
  );
}
\`\`\`

## Customization

All components are copied to your project as source code, so you can:
- Modify styles to match your design
- Add or remove features
- Extend functionality
- Change behavior

The components are yours to customize!

## Learn More

Visit [groovy-ui.dev](https://groovy-ui.dev) for documentation and examples.
`;
    await writeComponentFile(readmePath, readmeContent);

    spinner.succeed('Documentation created');
  } catch (error) {
    spinner.fail('Failed to create documentation');
    logger.debug(error as string);
    // Don't throw - README is optional
  }

  // Step 7: Check TypeScript configuration
  const tsconfigPath = path.join(projectPath, 'tsconfig.json');
  if (await fs.pathExists(tsconfigPath)) {
    spinner.start('Checking TypeScript configuration...');
    
    try {
      const tsconfig = await fs.readJson(tsconfigPath);
      const hasPathAlias = tsconfig?.compilerOptions?.paths?.['@/*'];

      if (!hasPathAlias) {
        logger.warn('Path alias @/* not found in tsconfig.json');
        logger.info('Consider adding this to your tsconfig.json:');
        logger.plain(`
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
`);
      } else {
        spinner.succeed('TypeScript configuration looks good');
      }
    } catch (error) {
      spinner.warn('Could not validate TypeScript configuration');
    }
  }

  // Success!
  logger.newline();
  logger.success('✨ Groovy UI initialized successfully!');
  logger.newline();

  logger.info('Next steps:');
  logger.plain('  1. Add components:');
  logger.plain('     npx groovy-ui add button');
  logger.plain('     npx groovy-ui add alert card modal');
  logger.newline();
  logger.plain('  2. Import in your app:');
  logger.plain("     import { Button } from '@/components/ui/button';");
  logger.newline();
  logger.plain('  3. Use the components:');
  logger.plain('     <Button title="Hello" onPress={() => {}} />');
  logger.newline();

  logger.info('Happy coding! 🚀');
}