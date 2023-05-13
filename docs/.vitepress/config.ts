import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '🐶 husky',
  description: 'Git hooks made easy',
  base: '/husky/',
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/typicode/husky' },
    ],
    carbonAds: {
      code: 'CWYDP53L',
      placement: 'typicodegithubio',
    },
  },
})
