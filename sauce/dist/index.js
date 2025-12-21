import {
  fetchComponentTemplate,
  getAllComponents,
  getComponent,
  resolveAllDependencies
} from "./chunk-3BUGHI3R.js";

// src/index.ts
import { Command } from "commander";

// src/commands/add.ts
import path3 from "path";
import inquirer from "inquirer";
import ora from "ora";

// src/utils/logger.ts
import chalk from "chalk";
var groovyBanner = `
${chalk.cyan(" \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557   \u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2557   \u2588\u2588\u2557 \u2588\u2588\u2557   \u2588\u2588\u2557")}
${chalk.cyan("\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2551   \u2588\u2588\u2551 \u255A\u2588\u2588\u2557 \u2588\u2588\u2554\u255D")}
${chalk.cyan("\u2588\u2588\u2551  \u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2551   \u2588\u2588\u2551 \u2588\u2588\u2551  \u2588\u2588\u2551 \u2588\u2588\u2551   \u2588\u2588\u2551  \u255A\u2588\u2588\u2588\u2588\u2554\u255D ")}
${chalk.cyan("\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2551   \u2588\u2588\u2551 \u2588\u2588\u2551  \u2588\u2588\u2551 \u255A\u2588\u2588\u2557 \u2588\u2588\u2554\u255D   \u255A\u2588\u2588\u2554\u255D  ")}
${chalk.cyan("\u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\u2588\u2588\u2551  \u2588\u2588\u2551 \u255A\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D  \u255A\u2588\u2588\u2588\u2588\u2554\u255D    \u2588\u2588\u2551   ")}
${chalk.cyan(" \u255A\u2550\u2550\u2550\u2550\u2550\u255D \u255A\u2550\u255D  \u255A\u2550\u255D  \u255A\u2550\u2550\u2550\u2550\u2550\u255D  \u255A\u2550\u2550\u2550\u2550\u2550\u255D   \u255A\u2550\u2550\u2550\u2550\u2550\u255D     \u255A\u2550\u255D   ")}

${chalk.gray("Expo React Native CLI, UI Components Library")}
`;
var logger = {
  info: (message, ...args) => {
    console.log(chalk.blue("\u2139"), message, ...args);
  },
  success: (message, ...args) => {
    console.log(chalk.green("\u2713"), message, ...args);
  },
  warn: (message, ...args) => {
    console.log(chalk.yellow("\u26A0"), message, ...args);
  },
  error: (message, ...args) => {
    console.error(chalk.red("\u2717"), message, ...args);
  },
  debug: (message, ...args) => {
    if (process.env.DEBUG) {
      console.log(chalk.gray("\u{1F41B}"), message, ...args);
    }
  },
  plain: (message, ...args) => {
    console.log(message, ...args);
  },
  header: (message) => {
    console.log("\n" + chalk.bold.cyan(message) + "\n");
  },
  banner: () => {
    console.log(groovyBanner);
  },
  break: () => {
    console.log("");
  },
  newline: () => {
    console.log();
  }
};

// src/utils/filesystem.ts
import fs from "fs-extra";
import path from "path";
async function validateProjectStructure(projectPath) {
  const packageJsonPath = path.join(projectPath, "package.json");
  if (!await fs.pathExists(packageJsonPath)) {
    return false;
  }
  try {
    const packageJson = await fs.readJson(packageJsonPath);
    const hasReactNative = packageJson.dependencies?.["react-native"] || packageJson.devDependencies?.["react-native"];
    const hasExpo = packageJson.dependencies?.["expo"] || packageJson.devDependencies?.["expo"];
    return !!(hasReactNative || hasExpo);
  } catch (error) {
    return false;
  }
}
async function ensureDirectoryExists(dirPath) {
  await fs.ensureDir(dirPath);
}
async function writeComponentFile(filePath, content) {
  await fs.writeFile(filePath, content, "utf-8");
}
async function fileExists(filePath) {
  return fs.pathExists(filePath);
}
async function checkComponentConflicts(components, projectPath) {
  const conflicts = [];
  const { getComponent: getComponent2 } = await import("./registry-ZMFJ6C6R.js");
  for (const componentName of components) {
    const component = getComponent2(componentName);
    if (!component) continue;
    for (const file of component.files) {
      const targetPath = path.join(projectPath, file.target);
      if (await fileExists(targetPath)) {
        conflicts.push(file.target);
      }
    }
  }
  return conflicts;
}

// src/utils/dependencies.ts
import { execa, execaSync } from "execa";
import fs2 from "fs-extra";
import path2 from "path";
function detectPackageManager() {
  const cwd = process.cwd();
  if (fs2.existsSync(path2.join(cwd, "bun.lockb"))) return "bun";
  if (fs2.existsSync(path2.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs2.existsSync(path2.join(cwd, "yarn.lock"))) return "yarn";
  if (fs2.existsSync(path2.join(cwd, "package-lock.json"))) return "npm";
  try {
    execaSync("bun", ["--version"]);
    return "bun";
  } catch {
  }
  try {
    execaSync("pnpm", ["--version"]);
    return "pnpm";
  } catch {
  }
  try {
    execaSync("yarn", ["--version"]);
    return "yarn";
  } catch {
  }
  return "npm";
}
async function installPackageDependencies(dependencies, packageManager, projectPath) {
  const commands = {
    npm: ["install", ...dependencies],
    yarn: ["add", ...dependencies],
    pnpm: ["add", ...dependencies],
    bun: ["add", ...dependencies]
  };
  const args = commands[packageManager];
  if (!args) {
    throw new Error(`Unsupported package manager: ${packageManager}`);
  }
  await execa(packageManager, args, {
    cwd: projectPath,
    stdio: "inherit"
  });
}

// src/commands/add.ts
async function selectComponentsInteractively() {
  const components = getAllComponents();
  if (components.length === 0) {
    logger.error("No components available in registry");
    process.exit(1);
  }
  const { selected } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selected",
      message: "Select components to install:",
      choices: components.map((comp) => ({
        name: `${comp.name.padEnd(15)} - ${comp.description}`,
        value: comp.name
      })),
      validate: (input) => {
        if (input.length === 0) {
          return "Please select at least one component";
        }
        return true;
      }
    }
  ]);
  return selected;
}
function getPackageManager(options) {
  if (options.npm) return "npm";
  if (options.yarn) return "yarn";
  if (options.pnpm) return "pnpm";
  if (options.bun) return "bun";
  return detectPackageManager();
}
async function addCommand(components, options = {}) {
  const projectPath = process.cwd();
  logger.info("\u{1F3A8} Adding Groovy UI components to your project...");
  logger.break();
  const spinner = ora("Validating project structure...").start();
  const isValidProject = await validateProjectStructure(projectPath);
  if (!isValidProject) {
    spinner.fail("Invalid project structure");
    logger.error("This command must be run in a React Native/Expo project");
    logger.info("Make sure you have a package.json with react-native or expo");
    logger.break();
    logger.info('Did you forget to run "groovy-ui init" first?');
    process.exit(1);
  }
  spinner.succeed("Project structure validated");
  if (components.length === 0) {
    logger.break();
    components = await selectComponentsInteractively();
  }
  const invalidComponents = components.filter((name) => !getComponent(name));
  if (invalidComponents.length > 0) {
    logger.error(`Unknown components: ${invalidComponents.join(", ")}`);
    logger.break();
    logger.info("Available components:");
    getAllComponents().forEach(
      (comp) => logger.plain(`  \u2022 ${comp.name.padEnd(20)} ${comp.description}`)
    );
    process.exit(1);
  }
  spinner.start("Resolving dependencies...");
  const allComponentsToInstall = /* @__PURE__ */ new Set();
  const allPackageDependencies = /* @__PURE__ */ new Set();
  const allHooks = /* @__PURE__ */ new Set();
  const allThemes = /* @__PURE__ */ new Set();
  for (const componentName of components) {
    const dependencies = resolveAllDependencies(componentName);
    dependencies.forEach((dep) => {
      allComponentsToInstall.add(dep);
      const component = getComponent(dep);
      if (component) {
        (component.dependencies || []).forEach(
          (pkg) => allPackageDependencies.add(pkg)
        );
        (component.hooks || []).forEach((hook) => allHooks.add(hook));
        (component.theme || []).forEach((theme) => allThemes.add(theme));
      }
    });
  }
  spinner.succeed("Dependencies resolved");
  logger.break();
  logger.info("Components to install:");
  Array.from(allComponentsToInstall).forEach((comp) => {
    const component = getComponent(comp);
    const type = component?.type !== "registry:ui" ? ` (${component?.type.replace("registry:", "")})` : "";
    logger.plain(`  \u2022 ${comp}${type}`);
  });
  if (allPackageDependencies.size > 0) {
    logger.break();
    logger.info("Package dependencies:");
    Array.from(allPackageDependencies).forEach(
      (dep) => logger.plain(`  \u2022 ${dep}`)
    );
  }
  const conflicts = await checkComponentConflicts(
    Array.from(allComponentsToInstall),
    projectPath
  );
  if (conflicts.length > 0 && !options.overwrite) {
    logger.break();
    logger.warn("The following files already exist:");
    conflicts.forEach((file) => logger.plain(`  \u2022 ${file}`));
    if (!options.yes) {
      const { proceed } = await inquirer.prompt([
        {
          type: "confirm",
          name: "proceed",
          message: "Do you want to overwrite these files?",
          default: false
        }
      ]);
      if (!proceed) {
        logger.info("Installation cancelled");
        return;
      }
    }
  }
  if (options.dryRun) {
    logger.break();
    logger.info("[DRY RUN] Would install the above components");
    return;
  }
  if (allPackageDependencies.size > 0) {
    const packageManager = getPackageManager(options);
    logger.break();
    spinner.start("Installing package dependencies...");
    try {
      await installPackageDependencies(
        Array.from(allPackageDependencies),
        packageManager,
        projectPath
      );
      spinner.succeed("Package dependencies installed");
    } catch (error) {
      spinner.fail("Failed to install package dependencies");
      logger.error(String(error));
      logger.warn("You may need to install dependencies manually");
    }
  }
  logger.break();
  spinner.start("Installing components...");
  try {
    let filesInstalled = 0;
    for (const componentName of allComponentsToInstall) {
      const component = getComponent(componentName);
      if (!component) continue;
      for (const file of component.files) {
        const targetPath = path3.join(projectPath, file.target);
        await ensureDirectoryExists(path3.dirname(targetPath));
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
    spinner.fail("Failed to install components");
    logger.error(String(error));
    process.exit(1);
  }
  await updateComponentIndex(projectPath, Array.from(allComponentsToInstall));
  logger.break();
  logger.success("\u2728 All done! Components have been added to your project.");
  logger.break();
  logger.info("Installed components:");
  Array.from(allComponentsToInstall).forEach((comp) => {
    logger.plain(`  \u2022 ${comp}`);
  });
  logger.break();
  logger.info("Next steps:");
  logger.plain("  1. Import the components in your app:");
  logger.plain(`     import { Button } from '@/components/ui/button';`);
  logger.break();
  logger.plain("  2. Use them:");
  logger.plain(`     <Button title="Hello" onPress={() => {}} />`);
  logger.break();
  logger.info("Happy coding! \u{1F680}");
}
async function updateComponentIndex(projectPath, components) {
  const indexPath = path3.join(projectPath, "components", "ui", "index.ts");
  try {
    const fs4 = await import("fs-extra");
    let content = "";
    if (await fs4.pathExists(indexPath)) {
      content = await fs4.readFile(indexPath, "utf-8");
    }
    const newExports = [];
    for (const componentName of components) {
      const component = getComponent(componentName);
      if (!component || component.type !== "registry:ui") continue;
      const pascalName = componentName.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
      const exportLine = `export { ${pascalName} } from './${componentName}';`;
      const typeExportLine = `export type { ${pascalName}Props } from './${componentName}';`;
      if (!content.includes(exportLine)) {
        newExports.push(exportLine);
        newExports.push(typeExportLine);
      }
    }
    if (newExports.length > 0) {
      const updatedContent = content + "\n" + newExports.join("\n") + "\n";
      await fs4.writeFile(indexPath, updatedContent, "utf-8");
    }
  } catch (error) {
    logger.warn("Could not update component index automatically");
  }
}

// src/commands/init.ts
import inquirer2 from "inquirer";
import ora2 from "ora";
import path4 from "path";
import fs3 from "fs-extra";
async function initCommand(options = {}) {
  const projectPath = process.cwd();
  logger.info("\u{1F3A8} Initializing Groovy UI in your project...");
  logger.break();
  const spinner = ora2("Checking project structure...").start();
  const isValidProject = await validateProjectStructure(projectPath);
  if (!isValidProject) {
    spinner.fail("Not a valid React Native or Expo project");
    logger.error("This command must be run in a React Native or Expo project");
    logger.info("Make sure you have a package.json with react-native or expo");
    logger.break();
    logger.info("To create a new Expo project:");
    logger.plain("  npx create-expo-app my-app");
    process.exit(1);
  }
  spinner.succeed("Valid React Native/Expo project detected");
  const componentsDir = path4.join(projectPath, "components", "ui");
  const alreadyInitialized = await fs3.pathExists(componentsDir);
  if (alreadyInitialized && !options.yes) {
    logger.warn("Groovy UI appears to be already initialized");
    logger.plain(`Found existing directory: ${componentsDir}`);
    logger.break();
    const { proceed } = await inquirer2.prompt([
      {
        type: "confirm",
        name: "proceed",
        message: "Continue anyway?",
        default: false
      }
    ]);
    if (!proceed) {
      logger.info("Initialization cancelled");
      return;
    }
  }
  logger.break();
  spinner.start("Creating folder structure...");
  try {
    await ensureDirectoryExists(path4.join(projectPath, "components", "ui"));
    await ensureDirectoryExists(path4.join(projectPath, "lib", "utils"));
    await ensureDirectoryExists(path4.join(projectPath, "hooks"));
    spinner.succeed("Folder structure created");
  } catch (error) {
    spinner.fail("Failed to create folder structure");
    throw error;
  }
  spinner.start("Setting up utilities...");
  try {
    const cnUtilPath = path4.join(projectPath, "lib", "utils", "cn.ts");
    const cnUtilContent = `/**
 * Utility for merging class names
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
`;
    await writeComponentFile(cnUtilPath, cnUtilContent);
    const colorsUtilPath = path4.join(projectPath, "lib", "utils", "colors.ts");
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
    spinner.succeed("Utilities created");
  } catch (error) {
    spinner.fail("Failed to create utilities");
    throw error;
  }
  spinner.start("Creating component index...");
  try {
    const indexPath = path4.join(projectPath, "components", "ui", "index.ts");
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
    spinner.succeed("Component index created");
  } catch (error) {
    spinner.fail("Failed to create component index");
    throw error;
  }
  spinner.start("Creating documentation...");
  try {
    const readmePath = path4.join(projectPath, "components", "README.md");
    const readmeContent = `# Groovy UI Components

This directory contains your UI components from Groovy UI.

## Structure

\`\`\`
components/
\u251C\u2500\u2500 ui/           # Core UI components
\u2502   \u251C\u2500\u2500 button.tsx
\u2502   \u251C\u2500\u2500 alert.tsx
\u2502   \u251C\u2500\u2500 card.tsx
\u2502   \u2514\u2500\u2500 index.ts  # Export all components
\u2514\u2500\u2500 README.md     # This file
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

- \u270F\uFE0F Modify styles to match your design system
- \u2795 Add or remove features as needed
- \u{1F527} Extend functionality
- \u{1F3A8} Change behavior and appearance

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
    spinner.succeed("Documentation created");
  } catch (error) {
    spinner.fail("Failed to create documentation");
  }
  const tsconfigPath = path4.join(projectPath, "tsconfig.json");
  if (await fs3.pathExists(tsconfigPath)) {
    spinner.start("Checking TypeScript configuration...");
    try {
      const tsconfig = await fs3.readJson(tsconfigPath);
      const hasPathAlias = tsconfig?.compilerOptions?.paths?.["@/*"];
      if (!hasPathAlias) {
        spinner.warn("Path alias @/* not found in tsconfig.json");
        logger.break();
        logger.info("\u{1F4DD} Add this to your tsconfig.json for better imports:");
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
        spinner.succeed("TypeScript configuration looks good");
      }
    } catch (error) {
      spinner.warn("Could not validate TypeScript configuration");
    }
  }
  try {
    const gitignorePath = path4.join(projectPath, ".gitignore");
    if (await fs3.pathExists(gitignorePath)) {
      let gitignoreContent = await fs3.readFile(gitignorePath, "utf-8");
      if (!gitignoreContent.includes("# groovy-ui")) {
        const groovyIgnore = `

# groovy-ui
# Uncomment if you don't want to track component customizations
# components/ui/
`;
        gitignoreContent += groovyIgnore;
        await fs3.writeFile(gitignorePath, gitignoreContent, "utf-8");
      }
    }
  } catch (error) {
  }
  logger.break();
  logger.success("\u2728 Groovy UI initialized successfully!");
  logger.break();
  logger.info("Created folder structure:");
  logger.plain("  components/");
  logger.plain("  \u251C\u2500\u2500 ui/          # Your UI components");
  logger.plain("  \u2514\u2500\u2500 README.md    # Documentation");
  logger.plain("  lib/");
  logger.plain("  \u2514\u2500\u2500 utils/       # Utility functions");
  logger.plain("  hooks/           # Custom React hooks");
  logger.break();
  logger.info("Next steps:");
  logger.plain("  1. Add components:");
  logger.plain("     npx groovy-ui add button");
  logger.plain("     npx groovy-ui add alert card modal");
  logger.break();
  logger.plain("  2. Import in your app:");
  logger.plain("     import { Button } from '@/components/ui/button';");
  logger.break();
  logger.plain("  3. Use the components:");
  logger.plain('     <Button title="Hello" onPress={() => {}} />');
  logger.break();
  logger.info("Happy coding! \u{1F680}");
}

// src/index.ts
var program = new Command();
program.name("groovy-ui").description("Add beautiful UI components to your React Native project").version("0.1.0");
program.command("init").description("Initialize groovy-ui in your project").option("-y, --yes", "Skip confirmation prompts").action(initCommand);
program.command("add [components...]").description("Add UI components to your project").option("-o, --overwrite", "Overwrite existing components").option("-y, --yes", "Skip confirmation prompts").action(addCommand);
program.parse();
//# sourceMappingURL=index.js.map