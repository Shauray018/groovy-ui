// types/docs.types.ts
export interface DocItem {
  slug: string;
  title: string;
}

export interface DocSection {
  title: string;
  items: DocItem[];
}

export interface DocsConfig {
  [key: string]: DocSection;
}

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description?: string;
}

export interface ExampleDefinition {
  title: string;
  code: string;
}

export interface ComponentDefinition {
  title: string;
  description: string;
  installation?: string;
  usage?: string;
  props?: PropDefinition[];
  examples?: ExampleDefinition[];
  additionalContent?: React.ReactNode;
}

export interface ComponentsConfig {
  [key: string]: ComponentDefinition;
}