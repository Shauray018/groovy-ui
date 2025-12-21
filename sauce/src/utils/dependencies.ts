// src/utils/dependencies.ts
import { execa, execaSync } from 'execa';
import fs from 'fs-extra';
import path from 'path';

export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

/**
 * Detects the package manager being used based on lock files
 */
export function detectPackageManager(): PackageManager {
  const cwd = process.cwd();

  // Check lock files in order of preference
  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return 'bun';
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(cwd, 'package-lock.json'))) return 'npm';

  // Check if any package manager is in PATH
  try {
    execaSync('bun', ['--version']);
    return 'bun';
  } catch {}

  try {
    execaSync('pnpm', ['--version']);
    return 'pnpm';
  } catch {}

  try {
    execaSync('yarn', ['--version']);
    return 'yarn';
  } catch {}

  // Default to npm (most common)
  return 'npm';
}

/**
 * Installs package dependencies using the specified package manager
 */
export async function installPackageDependencies(
  dependencies: string[],
  packageManager: PackageManager,
  projectPath: string
): Promise<void> {
  const commands: Record<PackageManager, string[]> = {
    npm: ['install', ...dependencies],
    yarn: ['add', ...dependencies],
    pnpm: ['add', ...dependencies],
    bun: ['add', ...dependencies],
  };

  const args = commands[packageManager];

  if (!args) {
    throw new Error(`Unsupported package manager: ${packageManager}`);
  }

  await execa(packageManager, args, {
    cwd: projectPath,
    stdio: 'inherit',
  });
}

/**
 * Checks which dependencies are already installed
 */
export async function checkExistingDependencies(
  dependencies: string[],
  projectPath: string
): Promise<{ installed: string[]; missing: string[] }> {
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);

  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const installed: string[] = [];
  const missing: string[] = [];

  for (const dep of dependencies) {
    // Handle scoped packages like @react-navigation/native
    const depName = dep.includes('@') && dep.startsWith('@') 
      ? dep.split('@').slice(0, 2).join('@')
      : dep.split('@')[0];

    if (allDeps[depName]) {
      installed.push(dep);
    } else {
      missing.push(dep);
    }
  }

  return { installed, missing };
}

/**
 * Gets the run command for a script based on package manager
 */
export function getRunCommand(
  packageManager: PackageManager,
  script: string
): string {
  const commands: Record<PackageManager, string> = {
    npm: `npm run ${script}`,
    yarn: `yarn ${script}`,
    pnpm: `pnpm ${script}`,
    bun: `bun run ${script}`,
  };

  return commands[packageManager];
}

/**
 * Gets the install command for the package manager
 */
export function getInstallCommand(packageManager: PackageManager): string {
  const commands: Record<PackageManager, string> = {
    npm: 'npm install',
    yarn: 'yarn',
    pnpm: 'pnpm install',
    bun: 'bun install',
  };

  return commands[packageManager];
}