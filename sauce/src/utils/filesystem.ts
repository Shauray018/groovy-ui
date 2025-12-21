// src/utils/filesystem.ts
import fs from 'fs-extra';
import path from 'path';

/**
 * Validates if the current directory is a valid React Native/Expo project
 */
export async function validateProjectStructure(
  projectPath: string
): Promise<boolean> {
  const packageJsonPath = path.join(projectPath, 'package.json');

  if (!(await fs.pathExists(packageJsonPath))) {
    return false;
  }

  try {
    const packageJson = await fs.readJson(packageJsonPath);

    // Check if it's a React Native or Expo project
    const hasReactNative =
      packageJson.dependencies?.['react-native'] ||
      packageJson.devDependencies?.['react-native'];
    const hasExpo =
      packageJson.dependencies?.['expo'] ||
      packageJson.devDependencies?.['expo'];

    return !!(hasReactNative || hasExpo);
  } catch (error) {
    return false;
  }
}

/**
 * Ensures a directory exists, creating it if necessary
 */
export async function ensureDirectoryExists(dirPath: string): Promise<void> {
  await fs.ensureDir(dirPath);
}

/**
 * Writes content to a file
 */
export async function writeComponentFile(
  filePath: string,
  content: string
): Promise<void> {
  await fs.writeFile(filePath, content, 'utf-8');
}

/**
 * Checks if a file exists
 */
export async function fileExists(filePath: string): Promise<boolean> {
  return fs.pathExists(filePath);
}

/**
 * Checks for component conflicts (existing files)
 */
export async function checkComponentConflicts(
  components: string[],
  projectPath: string
): Promise<string[]> {
  const conflicts: string[] = [];
  
  // Dynamic import to avoid circular dependency
  const { getComponent } = await import('../registry/index.js');

  for (const componentName of components) {
    const component = getComponent(componentName);
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

/**
 * Reads package.json from the project
 */
export async function readPackageJson(projectPath: string): Promise<any> {
  const packageJsonPath = path.join(projectPath, 'package.json');
  return fs.readJson(packageJsonPath);
}

/**
 * Writes package.json to the project
 */
export async function writePackageJson(
  projectPath: string,
  data: any
): Promise<void> {
  const packageJsonPath = path.join(projectPath, 'package.json');
  await fs.writeJson(packageJsonPath, data, { spaces: 2 });
}

/**
 * Reads a file's content
 */
export async function readFile(filePath: string): Promise<string> {
  return fs.readFile(filePath, 'utf-8');
}

/**
 * Copies a template directory to a destination
 */
export async function copyTemplate(
  templatePath: string,
  destPath: string
): Promise<void> {
  await fs.copy(templatePath, destPath, {
    overwrite: true,
    errorOnExist: false,
  });
}