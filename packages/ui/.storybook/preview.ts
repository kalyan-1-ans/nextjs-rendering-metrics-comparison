import type { Preview } from '@storybook/react-vite'
import '../src/foundations/fonts.css'
import '../src/foundations/styles.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    options: {
      storySort: {
        order: [
          'Foundations',
          'Brand and icons',
          'Typography',
          'Actions',
          'Forms',
          'Content',
          'Data display',
          'Feedback',
          'Accessibility',
          'Shared layout',
        ],
      },
    },
    backgrounds: { options: { surface: { name: 'Small Bites', value: '#FCFBF8' } } },
  },
  initialGlobals: { backgrounds: { value: 'surface' } },
}

export default preview
