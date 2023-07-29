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
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        sidebar: [
          { text: '介绍', link: '/zh/' },
          { text: '开始使用', link: '/zh/getting-started' },
          { text: '指南', link: '/zh/guide' },
          { text: '疑难解答', link: '/zh/troubleshooting' },
          { text: '从 v4 迁移', link: '/zh/migrating-from-v4' },
        ],
      },
    }
  }
})
