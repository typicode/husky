import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '🐶 husky',
  description: 'Git hooks made easy',
  base: '/husky/',
  themeConfig: {
    outline: [2, 3],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/typicode/husky' },
    ],
    carbonAds: {
      code: 'CWYDP53L',
      placement: 'typicodegithubio',
    },
    sidebar: [
      { text: 'Introduction', link: '/' },
      { text: 'Getting started', link: '/getting-started' },
      { text: 'Guide', link: '/guide' },
      { text: 'Troubleshooting', link: '/troubleshooting' },
      { text: 'Migrating from v4', link: '/migrating-from-v4' },
    ],
  },
})
