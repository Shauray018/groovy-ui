import { ComponentsConfig } from '../types/docs.types';

export const COMPONENTS: ComponentsConfig = {
  button: {
    title: 'Button',
    description: 'A versatile button component with multiple variants, sizes, and animations for React Native.',
    installation: 'npm install react-native-reanimated',
    videoUrl: '/demos/button.mp4',
    sourceCode: `import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { useState } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onPress, 
  variant = 'primary',
  size = 'md',
  disabled = false 
}) => {
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.button,
          styles[variant],
          styles[size],
          disabled && styles.disabled
        ]}
      >
        <Text style={[styles.text, styles[\`text_\${variant}\`]]}>{children}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#5856D6',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  text_primary: {
    color: 'white',
  },
  text_secondary: {
    color: 'white',
  },
  text_outline: {
    color: '#007AFF',
  },
});`,
    dependencies: ['react-native-reanimated'],
    usage: `import { Button } from '@/components/ui/button';

export default function App() {
  return (
    <Button 
      variant="primary"
      size="md"
      onPress={() => console.log('Button pressed!')}
    >
      Click Me
    </Button>
  );
}`,
    props: [
      {
        name: 'children',
        type: 'React.ReactNode',
        default: '-',
        description: 'The content to display inside the button'
      },
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'outline'",
        default: "'primary'",
        description: 'The visual style of the button'
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'The size of the button'
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Whether the button is disabled'
      },
      {
        name: 'onPress',
        type: '() => void',
        default: '-',
        description: 'Callback when button is pressed'
      }
    ],
    examples: [
      {
        title: 'Primary Button',
        code: `<Button variant="primary" onPress={() => {}}>
  Primary Button
</Button>`
      },
      {
        title: 'Outline Button',
        code: `<Button variant="outline" onPress={() => {}}>
  Outline Button
</Button>`
      },
      {
        title: 'Disabled Button',
        code: `<Button disabled onPress={() => {}}>
  Disabled Button
</Button>`
      }
    ]
  },

  input: {
    title: 'Input',
    description: 'A customizable text input component with support for labels, icons, validation states, and animations.',
    installation: 'npm install react-native-vector-icons',
    videoUrl: '/demos/input.mp4',
    sourceCode: `import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  secureTextEntry?: boolean;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  leftIcon,
  rightIcon,
  secureTextEntry = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [focusAnim] = useState(new Animated.Value(0));

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E5EA', '#007AFF'],
  });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Animated.View style={[styles.inputContainer, { borderColor }, error && styles.errorBorder]}>
        {leftIcon && <Icon name={leftIcon} size={20} color="#8E8E93" style={styles.leftIcon} />}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#8E8E93"
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
        />
        {rightIcon && <Icon name={rightIcon} size={20} color="#8E8E93" style={styles.rightIcon} />}
      </Animated.View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1C1C1E',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  errorBorder: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
});`,
    dependencies: ['react-native-vector-icons'],
    usage: `import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function App() {
  const [value, setValue] = useState('');

  return (
    <Input
      label="Email"
      placeholder="Enter your email"
      value={value}
      onChangeText={setValue}
      leftIcon="mail"
    />
  );
}`,
    props: [
      {
        name: 'value',
        type: 'string',
        default: '-',
        description: 'The controlled value of the input'
      },
      {
        name: 'onChangeText',
        type: '(text: string) => void',
        default: '-',
        description: 'Callback when text changes'
      },
      {
        name: 'placeholder',
        type: 'string',
        default: '-',
        description: 'Placeholder text when input is empty'
      },
      {
        name: 'label',
        type: 'string',
        default: '-',
        description: 'Label displayed above the input'
      },
      {
        name: 'error',
        type: 'string',
        default: '-',
        description: 'Error message displayed below input'
      },
      {
        name: 'leftIcon',
        type: 'string',
        default: '-',
        description: 'Icon name from Feather icons displayed on left'
      },
      {
        name: 'rightIcon',
        type: 'string',
        default: '-',
        description: 'Icon name from Feather icons displayed on right'
      },
      {
        name: 'secureTextEntry',
        type: 'boolean',
        default: 'false',
        description: 'Whether to obscure text (for passwords)'
      }
    ],
    examples: [
      {
        title: 'Basic Input',
        code: `<Input
  placeholder="Enter text"
  value={value}
  onChangeText={setValue}
/>`
      },
      {
        title: 'Input with Label and Icon',
        code: `<Input
  label="Email"
  placeholder="you@example.com"
  leftIcon="mail"
  value={email}
  onChangeText={setEmail}
/>`
      },
      {
        title: 'Password Input with Error',
        code: `<Input
  label="Password"
  placeholder="Enter password"
  leftIcon="lock"
  secureTextEntry
  error="Password must be at least 8 characters"
  value={password}
  onChangeText={setPassword}
/>`
      }
    ]
  },

  card: {
    title: 'Card',
    description: 'A flexible card component for displaying content in a contained, elevated format with shadows and rounded corners.',
    installation: 'npm install react-native',
    videoUrl: '/demos/card.mp4',
    sourceCode: `import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
}

interface CardHeaderProps {
  children: React.ReactNode;
}

interface CardTitleProps {
  children: React.ReactNode;
}

interface CardContentProps {
  children: React.ReactNode;
}

interface CardFooterProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Title: React.FC<CardTitleProps>;
  Content: React.FC<CardContentProps>;
  Footer: React.FC<CardFooterProps>;
} = ({ children, style, elevated = true }) => {
  return (
    <View style={[styles.card, elevated && styles.elevated, style]}>
      {children}
    </View>
  );
};

Card.Header = ({ children }) => (
  <View style={styles.header}>{children}</View>
);

Card.Title = ({ children }) => (
  <Text style={styles.title}>{children}</Text>
);

Card.Content = ({ children }) => (
  <View style={styles.content}>{children}</View>
);

Card.Footer = ({ children }) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  content: {
    padding: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
});`,
    dependencies: ['react-native'],
    usage: `import { Card } from '@/components/ui/card';

export default function App() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
      </Card.Header>
      <Card.Content>
        <Text>Your content goes here</Text>
      </Card.Content>
      <Card.Footer>
        <Text>Footer content</Text>
      </Card.Footer>
    </Card>
  );
}`,
    props: [
      {
        name: 'children',
        type: 'React.ReactNode',
        default: '-',
        description: 'The content of the card'
      },
      {
        name: 'style',
        type: 'ViewStyle',
        default: '-',
        description: 'Additional styles to apply to the card'
      },
      {
        name: 'elevated',
        type: 'boolean',
        default: 'true',
        description: 'Whether the card has shadow elevation'
      }
    ],
    examples: [
      {
        title: 'Basic Card',
        code: `<Card>
  <Card.Content>
    <Text>Simple card content</Text>
  </Card.Content>
</Card>`
      },
      {
        title: 'Card with All Sections',
        code: `<Card>
  <Card.Header>
    <Card.Title>Product Details</Card.Title>
  </Card.Header>
  <Card.Content>
    <Text>Description of the product goes here</Text>
  </Card.Content>
  <Card.Footer>
    <Button onPress={() => {}}>Buy Now</Button>
  </Card.Footer>
</Card>`
      },
      {
        title: 'Flat Card',
        code: `<Card elevated={false}>
  <Card.Content>
    <Text>Card without shadow</Text>
  </Card.Content>
</Card>`
      }
    ]
  },

  modal: {
    title: 'Modal',
    description: 'A modal dialog component for displaying content in an overlay with backdrop, animations, and customizable positioning.',
    installation: 'npm install react-native-reanimated',
    videoUrl: '/demos/modal.mp4',
    sourceCode: `import React, { useEffect } from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'center' | 'bottom';
}

interface ModalHeaderProps {
  children: React.ReactNode;
  showClose?: boolean;
}

interface ModalBodyProps {
  children: React.ReactNode;
}

const { height } = Dimensions.get('window');

export const Modal: React.FC<ModalProps> & {
  Header: React.FC<ModalHeaderProps>;
  Body: React.FC<ModalBodyProps>;
} = ({ visible, onClose, children, position = 'center' }) => {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(position === 'bottom' ? height : 0);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: position === 'bottom' ? height : 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.backdropTouchable}
          activeOpacity={1}
          onPress={onClose}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.modalContainer,
          position === 'center' ? styles.centerModal : styles.bottomModal,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.modalContent}>{children}</View>
      </Animated.View>
    </RNModal>
  );
};

Modal.Header = ({ children, showClose = true }) => {
  const modal = React.useContext(ModalContext);
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{children}</Text>
      {showClose && (
        <TouchableOpacity onPress={modal?.onClose} style={styles.closeButton}>
          <Icon name="x" size={24} color="#1C1C1E" />
        </TouchableOpacity>
      )}
    </View>
  );
};

Modal.Body = ({ children }) => (
  <View style={styles.body}>{children}</View>
);

const ModalContext = React.createContext<{ onClose: () => void } | null>(null);

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropTouchable: {
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    width: '100%',
  },
  centerModal: {
    top: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  bottomModal: {
    bottom: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  closeButton: {
    padding: 4,
  },
  body: {
    padding: 20,
  },
});`,
    dependencies: ['react-native-reanimated', 'react-native-vector-icons'],
    usage: `import { Modal } from '@/components/ui/modal';
import { useState } from 'react';

export default function App() {
  const [isVisible, setVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)}>Open Modal</Button>
      
      <Modal visible={isVisible} onClose={() => setVisible(false)}>
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>
          <Text>Your modal content goes here</Text>
        </Modal.Body>
      </Modal>
    </>
  );
}`,
    props: [
      {
        name: 'visible',
        type: 'boolean',
        default: '-',
        description: 'Whether the modal is visible'
      },
      {
        name: 'onClose',
        type: '() => void',
        default: '-',
        description: 'Callback when modal should close'
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        default: '-',
        description: 'The content of the modal'
      },
      {
        name: 'position',
        type: "'center' | 'bottom'",
        default: "'center'",
        description: 'Position of the modal on screen'
      }
    ],
    examples: [
      {
        title: 'Center Modal',
        code: `<Modal 
  visible={visible} 
  onClose={() => setVisible(false)}
  position="center"
>
  <Modal.Header>Confirmation</Modal.Header>
  <Modal.Body>
    <Text>Are you sure?</Text>
  </Modal.Body>
</Modal>`
      },
      {
        title: 'Bottom Sheet Modal',
        code: `<Modal 
  visible={visible} 
  onClose={() => setVisible(false)}
  position="bottom"
>
  <Modal.Header>Select Option</Modal.Header>
  <Modal.Body>
    <Text>Choose an option below</Text>
  </Modal.Body>
</Modal>`
      }
    ]
  },

}