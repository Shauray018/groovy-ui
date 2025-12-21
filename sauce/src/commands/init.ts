// src/commands/init.ts
import inquirer from 'inquirer';
import ora from 'ora';
import path from 'path';
import fs from 'fs-extra';
import { logger } from '../utils/logger.js';
import {
  validateProjectStructure,
  ensureDirectoryExists,
  writeComponentFile,
} from '../utils/filesystem.js';

interface InitCommandOptions {
  yes?: boolean;
  components?: boolean;
}

export async function initCommand(
  options: InitCommandOptions = {}
): Promise<void> {
  const projectPath = process.cwd();

  logger.info('🎨 Initializing Groovy UI in your project...');
  logger.break();

  // Step 1: Validate this is a React Native/Expo project
  const spinner = ora('Checking project structure...').start();
  const isValidProject = await validateProjectStructure(projectPath);

  if (!isValidProject) {
    spinner.fail('Not a valid React Native or Expo project');
    logger.error('This command must be run in a React Native or Expo project');
    logger.info('Make sure you have a package.json with react-native or expo');
    logger.break();
    logger.info('To create a new Expo project:');
    logger.plain('  npx create-expo-app my-app');
    process.exit(1);
  }
  spinner.succeed('Valid React Native/Expo project detected');

  // Step 2: Check if groovy-ui is already initialized
  const componentsDir = path.join(projectPath, 'components', 'ui');
  const alreadyInitialized = await fs.pathExists(componentsDir);

  if (alreadyInitialized && !options.yes) {
    logger.warn('Groovy UI appears to be already initialized');
    logger.plain(`Found existing directory: ${componentsDir}`);
    logger.break();

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
  logger.break();
  spinner.start('Creating folder structure...');

  try {
    // Create components/ui directory
    await ensureDirectoryExists(path.join(projectPath, 'components', 'ui'));

    // Create lib/utils directory (for utility functions)
    await ensureDirectoryExists(path.join(projectPath, 'lib', 'utils'));

    // Create hooks directory
    await ensureDirectoryExists(path.join(projectPath, 'hooks'));

    spinner.succeed('Folder structure created');
  } catch (error) {
    spinner.fail('Failed to create folder structure');
    throw error;
  }

  // Step 4: Create utility files
  spinner.start('Setting up utilities...');

  try {
    // Create cn utility (for conditional classNames)
    const cnUtilPath = path.join(projectPath, 'lib', 'utils', 'cn.ts');
    const cnUtilContent = `/**
 * Utility for merging class names
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
`;
    await writeComponentFile(cnUtilPath, cnUtilContent);

    // Create colors utility (for theme colors)
    const colorsUtilPath = path.join(projectPath, 'lib', 'utils', 'colors.ts');
    const colorsUtilContent = `/**
 * Color utilities for your components
 */
export const colors = {
  primary: '#007AFF',
  secondary: '#8E8E93',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  background: '#FFFFFF',
  text: '#000000',
  border: '#E5E5EA',
  muted: '#F2F2F7',
};

export type ColorName = keyof typeof colors;

export function getColor(name: ColorName): string {
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
    const indexContent = `/**
 * Groovy UI Components
 * 
 * Export all your UI components from here
 * Components will be automatically added when you run: groovy-ui add <component>
 * 
 * Example usage:
 * import { Button, Alert, Card } from '@/components/ui';
 */

// Components will be exported here automatically
// Example:
// export { Button } from './button';
// export type { ButtonProps } from './button';
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
│   ├── card.tsx
│   └── index.ts  # Export all components
└── README.md     # This file
\`\`\`

## Adding Components

Add new components using the Groovy UI CLI:

\`\`\`bash
# Add a single component
npx groovy-ui add button

# Add multiple components
npx groovy-ui add alert card modal

# Interactive selection
npx groovy-ui add
\`\`\`

## Usage

Import components from the ui directory:

\`\`\`tsx
import { Button, Alert } from '@/components/ui';

export default function App() {
  return (
    <Button 
      title="Click me" 
      onPress={() => alert('Hello!')} 
      variant="primary"
    />
  );
}
\`\`\`

## Customization

All components are copied to your project as source code, so you can:

- ✏️ Modify styles to match your design system
- ➕ Add or remove features as needed
- 🔧 Extend functionality
- 🎨 Change behavior and appearance

**The components are yours to customize!**

## Available Components

- **Button**: Customizable button with variants and sizes
- **Alert**: Display important messages with different severity levels
- **Card**: Container component with header and footer
- **Modal**: Full-screen or centered modal dialogs
- **Input**: Text input with labels and validation
- And more...

## TypeScript Support

All components are written in TypeScript with full type safety:

\`\`\`tsx
import { ButtonProps } from '@/components/ui';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
\`\`\`

## Learn More

- Documentation: [groovy-ui.dev](https://groovy-ui.dev)
- Examples: [github.com/groovy-ui/examples](https://github.com/groovy-ui/examples)
- Issues: [github.com/groovy-ui/issues](https://github.com/groovy-ui/issues)
`;
    await writeComponentFile(readmePath, readmeContent);

    spinner.succeed('Documentation created');
  } catch (error) {
    spinner.fail('Failed to create documentation');
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
        spinner.warn('Path alias @/* not found in tsconfig.json');
        logger.break();
        logger.info('📝 Add this to your tsconfig.json for better imports:');
        logger.plain(`
{
  "compilerOptions": {
    "baseUrl": ".",
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

  // Step 8: Create .gitignore entry (optional)
  try {
    const gitignorePath = path.join(projectPath, '.gitignore');
    if (await fs.pathExists(gitignorePath)) {
      let gitignoreContent = await fs.readFile(gitignorePath, 'utf-8');

      // Check if groovy-ui section exists
      if (!gitignoreContent.includes('# groovy-ui')) {
        // Add groovy-ui section
        const groovyIgnore = `

# groovy-ui
# Uncomment if you don't want to track component customizations
# components/ui/
`;
        gitignoreContent += groovyIgnore;
        await fs.writeFile(gitignorePath, gitignoreContent, 'utf-8');
      }
    }
  } catch (error) {
    // Non-critical, ignore
  }

  // Success!
  logger.break();
  logger.success('✨ Groovy UI initialized successfully!');
  logger.break();

  // Show folder structure
  logger.info('Created folder structure:');
  logger.plain('  components/');
  logger.plain('  ├── ui/          # Your UI components');
  logger.plain('  └── README.md    # Documentation');
  logger.plain('  lib/');
  logger.plain('  └── utils/       # Utility functions');
  logger.plain('  hooks/           # Custom React hooks');
  logger.break();

  logger.info('Next steps:');
  logger.plain('  1. Add components:');
  logger.plain('     npx groovy-ui add button');
  logger.plain('     npx groovy-ui add alert card modal');
  logger.break();

  logger.plain('  2. Import in your app:');
  logger.plain("     import { Button } from '@/components/ui/button';");
  logger.break();

  logger.plain('  3. Use the components:');
  logger.plain('     <Button title="Hello" onPress={() => {}} />');
  logger.break();

  logger.info('Happy coding! 🚀');
}