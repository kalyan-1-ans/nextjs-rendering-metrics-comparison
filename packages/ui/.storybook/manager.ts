import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Small Bites UI',
    brandImage: './brand/icon.svg',
    colorPrimary: '#315E43',
    colorSecondary: '#315E43',
    appBg: '#FCFBF8',
    fontBase: 'Inter, system-ui, sans-serif',
  }),
})
