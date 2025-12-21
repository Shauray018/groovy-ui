// src/commands/add.ts
import path from 'path';
import inquirer from 'inquirer';
import ora from 'ora';
import {
  REGISTRY,
  getComponent,
  resolveAllDependencies,
  fetchComponentTemplate,
  getAllComponents,
} from '../registry/index.js';
import { logger } from '../utils/logger.js';
import {
  validateProjectStructure,
  checkComponentConflicts,
  ensureDirectoryExists,
  writeComponentFile,
} from '../utils/filesystem.js';
import {
  installPackageDependencies,
  detectPackageManager,
  type PackageManager,
} from '../utils/dependencies.js';

interface AddCommandOptions {
  overwrite?: boolean;
  dryRun?: boolean;
  yes?: boolean;
  npm?: boolean;
  yarn?: boolean;
  pnpm?: boolean;
  bun?: boolean;
}

async function selectComponentsInteractively(): Promise<string[]> {
  const components = getAllComponents();
  
  if (components.length === 0) {
    logger.error('No components available in registry');
    process.exit(1);
  }
  
  const { selected } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selected',
      message: 'Select components to install:',
      choices: components.map(comp => ({
        name: `${comp.name.padEnd(15)} - ${comp.description}`,
        value: comp.name,
      })),
      validate: (input) => {
        if (input.length === 0) {
          return 'Please select at least one component';
        }
        return true;
      },
    },
  ]);

  return selected;
}

function getPackageManager(options: AddCommandOptions): PackageManager {
  if (options.npm) return 'npm';
  if (options.yarn) return 'yarn';
  if (options.pnpm) return 'pnpm';
  if (options.bun) return 'bun';
  
  return detectPackageManager();
}

export async function addCommand(
  components: string[],
  options: AddCommandOptions = {}
): Promise<void> {
  const projectPath = process.cwd();

  logger.info('🎨 Adding Groovy UI components to your project...');
  logger.break();

  // Step 1: Validate project structure
  const spinner = ora('Validating project structure...').start();
  const isValidProject = await validateProjectStructure(projectPath);

  if (!isValidProject) {
    spinner.fail('Invalid project structure');
    logger.error('This command must be run in a React Native/Expo project');
    logger.info('Make sure you have a package.json with react-native or expo');
    logger.break();
    logger.info('Did you forget to run "groovy-ui init" first?');
    process.exit(1);
  }
  spinner.succeed('Project structure validated');

  // Step 2: Interactive component selection if none provided
  if (components.length === 0) {
    logger.break();
    components = await selectComponentsInteractively();
  }

  // Step 3: Validate components exist
  const invalidComponents = components.filter((name) => !getComponent(name));
  if (invalidComponents.length > 0) {
    logger.error(`Unknown components: ${invalidComponents.join(', ')}`);
    logger.break();
    logger.info('Available components:');
    getAllComponents().forEach((comp) =>
      logger.plain(`  • ${comp.name.padEnd(20)} ${comp.description}`)
    );
    process.exit(1);
  }

  // Step 4: Resolve all dependencies
  spinner.start('Resolving dependencies...');
  const allComponentsToInstall = new Set<string>();
  const allPackageDependencies = new Set<string>();
  const allHooks = new Set<string>();
  const allThemes = new Set<string>();

  for (const componentName of components) {
    const dependencies = resolveAllDependencies(componentName);
    dependencies.forEach((dep) => {
      allComponentsToInstall.add(dep);

      const component = getComponent(dep);
      if (component) {
        (component.dependencies || []).forEach((pkg) =>
          allPackageDependencies.add(pkg)
        );
        (component.hooks || []).forEach((hook) => allHooks.add(hook));
        (component.theme || []).forEach((theme) => allThemes.add(theme));
      }
    });
  }
  spinner.succeed('Dependencies resolved');

  // Step 5: Show what will be installed
  logger.break();
  logger.info('Components to install:');
  Array.from(allComponentsToInstall).forEach((comp) => {
    const component = getComponent(comp);
    const type =
      component?.type !== 'registry:ui'
        ? ` (${component?.type.replace('registry:', '')})`
        : '';
    logger.plain(`  • ${comp}${type}`);
  });

  if (allPackageDependencies.size > 0) {
    logger.break();
    logger.info('Package dependencies:');
    Array.from(allPackageDependencies).forEach((dep) =>
      logger.plain(`  • ${dep}`)
    );
  }

  // Step 6: Check for conflicts
  const conflicts = await checkComponentConflicts(
    Array.from(allComponentsToInstall),
    projectPath
  );

  if (conflicts.length > 0 && !options.overwrite) {
    logger.break();
    logger.warn('The following files already exist:');
    conflicts.forEach((file) => logger.plain(`  • ${file}`));

    if (!options.yes) {
      const { proceed } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'proceed',
          message: 'Do you want to overwrite these files?',
          default: false,
        },
      ]);

      if (!proceed) {
        logger.info('Installation cancelled');
        return;
      }
    }
  }

  // Step 7: Dry run
  if (options.dryRun) {
    logger.break();
    logger.info('[DRY RUN] Would install the above components');
    return;
  }

  // Step 8: Install package dependencies first
  if (allPackageDependencies.size > 0) {
    const packageManager = getPackageManager(options);
    logger.break();
    spinner.start('Installing package dependencies...');

    try {
      await installPackageDependencies(
        Array.from(allPackageDependencies),
        packageManager,
        projectPath
      );
      spinner.succeed('Package dependencies installed');
    } catch (error) {
      spinner.fail('Failed to install package dependencies');
      logger.error(String(error));
      logger.warn('You may need to install dependencies manually');
    }
  }

  // Step 9: Install components
  logger.break();
  spinner.start('Installing components...');

  try {
    let filesInstalled = 0;

    for (const componentName of allComponentsToInstall) {
      const component = getComponent(componentName);
      if (!component) continue;

      for (const file of component.files) {
        const targetPath = path.join(projectPath, file.target);

        // Ensure directory exists
        await ensureDirectoryExists(path.dirname(targetPath));

        // Fetch and write component file
        try {
          const content = await fetchComponentTemplate(file);
          await writeComponentFile(targetPath, content);
          filesInstalled++;
        } catch (error) {
          spinner.fail(`Failed to fetch ${file.path}`);
          logger.error(String(error));
          throw error;
        }
      }
    }

    spinner.succeed(`Components installed (${filesInstalled} files)`);
  } catch (error) {
    spinner.fail('Failed to install components');
    logger.error(String(error));
    process.exit(1);
  }

  // Step 10: Update component index
  await updateComponentIndex(projectPath, Array.from(allComponentsToInstall));

  // Step 11: Success message
  logger.break();
  logger.success('✨ All done! Components have been added to your project.');
  logger.break();

  logger.info('Installed components:');
  Array.from(allComponentsToInstall).forEach((comp) => {
    logger.plain(`  • ${comp}`);
  });

  logger.break();
  logger.info('Next steps:');
  logger.plain('  1. Import the components in your app:');
  logger.plain(`     import { Button } from '@/components/ui/button';`);
  logger.break();
  logger.plain('  2. Use them:');
  logger.plain(`     <Button title="Hello" onPress={() => {}} />`);
  logger.break();

  logger.info('Happy coding! 🚀');
}

async function updateComponentIndex(
  projectPath: string,
  components: string[]
): Promise<void> {
  const indexPath = path.join(projectPath, 'components', 'ui', 'index.ts');

  try {
    // Read existing index
    const fs = await import('fs-extra');
    let content = '';

    if (await fs.pathExists(indexPath)) {
      content = await fs.readFile(indexPath, 'utf-8');
    }

    // Add exports for new components
    const newExports: string[] = [];

    for (const componentName of components) {
      const component = getComponent(componentName);
      if (!component || component.type !== 'registry:ui') continue;

      // Convert component name to PascalCase for export
      const pascalName = componentName
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

      const exportLine = `export { ${pascalName} } from './${componentName}';`;
      const typeExportLine = `export type { ${pascalName}Props } from './${componentName}';`;

      // Check if already exported
      if (!content.includes(exportLine)) {
        newExports.push(exportLine);
        newExports.push(typeExportLine);
      }
    }

    if (newExports.length > 0) {
      // Append new exports
      const updatedContent = content + '\n' + newExports.join('\n') + '\n';
      await fs.writeFile(indexPath, updatedContent, 'utf-8');
    }
  } catch (error) {
    // Non-critical error, just log it
    logger.warn('Could not update component index automatically');
  }
}