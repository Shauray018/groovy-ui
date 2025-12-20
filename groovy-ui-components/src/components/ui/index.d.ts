import type { 
  PressableProps, 
  ViewProps as RNViewProps, 
  TextProps as RNTextProps,
  TextInputProps,
  ModalProps as RNModalProps,
} from 'react-native';

// Button Component
export interface ButtonProps extends Omit<PressableProps, 'style'> {
  /**
   * The text to display on the button
   */
  title: string;
  /**
   * Button variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  /**
   * Button size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the button is in loading state
   * @default false
   */
  loading?: boolean;
  /**
   * Icon to display before the title
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display after the title
   */
  rightIcon?: React.ReactNode;
  /**
   * Custom style for the button container
   */
  style?: RNViewProps['style'];
  /**
   * Custom style for the button text
   */
  textStyle?: RNTextProps['style'];
}

export declare const Button: React.FC<ButtonProps>;

// Alert Component
export interface AlertProps {
  /**
   * The title of the alert
   */
  title?: string;
  /**
   * The description/message of the alert
   */
  description: string;
  /**
   * Alert variant
   * @default 'info'
   */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /**
   * Whether to show an icon
   * @default true
   */
  showIcon?: boolean;
  /**
   * Custom icon component
   */
  icon?: React.ReactNode;
  /**
   * Whether the alert can be dismissed
   * @default false
   */
  dismissible?: boolean;
  /**
   * Callback when alert is dismissed
   */
  onDismiss?: () => void;
  /**
   * Custom style for the alert container
   */
  style?: RNViewProps['style'];
}

export declare const Alert: React.FC<AlertProps>;

// Card Component
export interface CardProps extends RNViewProps {
  /**
   * Card title
   */
  title?: string;
  /**
   * Card description
   */
  description?: string;
  /**
   * Content to render inside the card
   */
  children?: React.ReactNode;
  /**
   * Whether to show a shadow
   * @default true
   */
  shadow?: boolean;
  /**
   * Card variant
   * @default 'elevated'
   */
  variant?: 'elevated' | 'outlined' | 'filled';
  /**
   * Custom header component
   */
  header?: React.ReactNode;
  /**
   * Custom footer component
   */
  footer?: React.ReactNode;
}

export declare const Card: React.FC<CardProps>;

// Modal Component
export interface ModalProps extends Omit<RNModalProps, 'visible'> {
  /**
   * Whether the modal is visible
   */
  open?: boolean;
  /**
   * Callback when modal requests to close
   */
  onClose?: () => void;
  /**
   * Modal title
   */
  title?: string;
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Modal size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'full';
  /**
   * Whether to show close button
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Modal footer content
   */
  footer?: React.ReactNode;
  /**
   * Custom style for modal container
   */
  containerStyle?: RNViewProps['style'];
}

export declare const Modal: React.FC<ModalProps>;

// Input Component
export interface InputProps extends Omit<TextInputProps, 'style'> {
  /**
   * Input label
   */
  label?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display
   */
  helperText?: string;
  /**
   * Whether the input is required
   * @default false
   */
  required?: boolean;
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Icon to display on the left
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display on the right
   */
  rightIcon?: React.ReactNode;
  /**
   * Input size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Custom container style
   */
  containerStyle?: RNViewProps['style'];
  /**
   * Custom input style
   */
  inputStyle?: TextInputProps['style'];
}

export declare const Input: React.FC<InputProps>;

// Text Component
export interface TextProps extends RNTextProps {
  /**
   * Text variant
   * @default 'body'
   */
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
  /**
   * Font weight
   */
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  /**
   * Text color
   */
  color?: string;
  /**
   * Whether text should be centered
   * @default false
   */
  center?: boolean;
}

export declare const Text: React.FC<TextProps>;

// View Component
export interface ViewProps extends RNViewProps {
  /**
   * Padding size
   */
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Margin size
   */
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Whether to center content
   * @default false
   */
  center?: boolean;
  /**
   * Background color
   */
  bg?: string;
}

export declare const View: React.FC<ViewProps>;

// Re-export React Native types that might be useful
export type {
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleProp,
  ColorValue,
} from 'react-native';