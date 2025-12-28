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
  props?: Array<{
    name: string;
    type: string;
    default?: string;
    description?: string;
  }>;
  examples?: Array<{
    title: string;
    code: string;
  }>;
  additionalContent?: React.ReactNode;
  
  // Add these new fields for React Native previews
  videoUrl?: string;      // e.g., "/demos/button.mp4"
  gifUrl?: string;        // e.g., "/demos/button.gif"
  imageUrl?: string;      // e.g., "/demos/button.png"
  sourceCode?: string;    // The actual component source code
  dependencies?: string[]; // e.g., ['react-native-reanimated']
}

export interface ComponentsConfig {
  [key: string]: ComponentDefinition;
}