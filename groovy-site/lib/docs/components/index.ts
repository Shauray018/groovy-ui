import { silkConfig } from './silk.config';
import { lightningConfig } from './lightning.config';
// Import more component configs as you add them
// import { buttonConfig } from './button.config';
// import { cardConfig } from './card.config';

export const COMPONENT_CONFIGS = {
  silk: silkConfig,
  lightning: lightningConfig,
  // Add more components here
  // button: buttonConfig,
  // card: cardConfig,
} as const;

export type ComponentSlug = keyof typeof COMPONENT_CONFIGS;