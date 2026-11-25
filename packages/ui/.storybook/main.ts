import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  staticDirs: [{ from: '../src/assets/brand', to: '/brand' }],
  managerHead: (head) =>
    `${head}<link rel="icon" type="image/svg+xml" href="./brand/favicon.svg" />`,
  previewHead: (head) => `${head}<style>#storybook-root { isolation: isolate; }</style>`,
  core: { disableTelemetry: true },
}

export default config
