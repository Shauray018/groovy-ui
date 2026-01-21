export interface PropDefinition {
  name: string;
  type: string;
  default: string;
  description: string;
}

export interface ExampleDefinition {
  title: string;
  code: string;
}

export interface ComponentConfig {
  title: string;
  description: string;
  installation: string;
  videoUrl?: string;
  githubUrl?: string; // Raw GitHub URL to fetch source code
  sourceCode?: string; // Optional - will be fetched from githubUrl if not provided
  dependencies: string[];
  usage: string;
  props: PropDefinition[];
  examples: ExampleDefinition[];
}

export interface ComponentsConfig {
  [key: string]: ComponentConfig;
}