import { ComponentsConfig } from '../types/docs.types';

export const COMPONENTS: ComponentsConfig = {
  button: {
    title: 'Button',
    description: 'A versatile button component with multiple variants and sizes.',
    installation: 'npx your-ui-library add button',
    usage: `import { Button } from '@/components/ui/button';

<Button onPress={() => console.log('Pressed')}>
  Click Me
</Button>`,
    props: [
      {
        name: 'variant',
        type: 'primary | secondary | outline',
        default: 'primary',
        description: 'The visual style of the button'
      },
      {
        name: 'size',
        type: 'sm | md | lg',
        default: 'md',
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
        code: `<Button variant="primary">Primary</Button>`
      },
      {
        title: 'Outline Button',
        code: `<Button variant="outline">Outline</Button>`
      }
    ]
  },
  input: {
    title: 'Input',
    description: 'A customizable text input component with support for labels, placeholders, and validation states.',
    installation: 'npx your-ui-library add input',
    usage: `import { Input } from '@/components/ui/input';

<Input
  placeholder="Enter your name"
  value={value}
  onChangeText={setValue}
/>`,
    props: [
      {
        name: 'value',
        type: 'string',
        default: '-',
        description: 'The controlled value of the input'
      },
      {
        name: 'placeholder',
        type: 'string',
        default: '-',
        description: 'Placeholder text'
      },
      {
        name: 'onChangeText',
        type: '(text: string) => void',
        default: '-',
        description: 'Callback when text changes'
      }
    ]
  },
  card: {
    title: 'Card',
    description: 'A flexible card component for displaying content in a contained format.',
    installation: 'npx your-ui-library add card',
    usage: `import { Card } from '@/components/ui/card';

<Card>
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
  </Card.Header>
  <Card.Content>
    Your content here
  </Card.Content>
</Card>`
  },
  modal: {
    title: 'Modal',
    description: 'A modal dialog component for displaying content in an overlay.',
    installation: 'npx your-ui-library add modal',
    usage: `import { Modal } from '@/components/ui/modal';

<Modal visible={isVisible} onClose={() => setVisible(false)}>
  <Modal.Header>Modal Title</Modal.Header>
  <Modal.Body>
    Modal content goes here
  </Modal.Body>
</Modal>`
  },
  dropdown: {
    title: 'Dropdown',
    description: 'A dropdown menu component for displaying a list of options.',
    installation: 'npx your-ui-library add dropdown',
    usage: `import { Dropdown } from '@/components/ui/dropdown';

<Dropdown
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' }
  ]}
  onSelect={(value) => console.log(value)}
/>`
  }
};