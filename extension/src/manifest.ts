import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json'

//@ts-ignore
const isDev = process.env.NODE_ENV == 'development'

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ''}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-32.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  // Keep basic structure, remove specific features
  web_accessible_resources: [
    {
      resources: ['img/logo-16.png', 'img/logo-32.png', 'img/logo-48.png', 'img/logo-128.png'],
      matches: ['*://*/*'], // Allow resources to be accessible by web pages
    },
  ],
  // Permissions needed for a website editor
  permissions: [
    'storage', 
    'activeTab', 
    'scripting'
  ],
  host_permissions: [
    '*://*/*'
  ],
  // Update content script to use TSX file
  content_scripts: [
    {
      matches: ['*://*/*'],
      js: ['src/content.tsx'],
      run_at: 'document_end'
    }
  ],
})
