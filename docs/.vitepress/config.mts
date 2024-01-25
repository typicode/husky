import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Husky",
  description: "Git hooks made easy",
  base: '/husky/',
  themeConfig: {
    // outline: [2, 3],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/typicode/husky' },
    ],
    carbonAds: {
      code: 'CWYDP53L',
      placement: 'typicodegithubio',
    },
    sidebar: [
      { text: 'Introduction', link: '/' },
      { text: 'Get Started', link: '/get-started' },
      { text: 'How To', link: '/how-to' },
      { text: 'Troubleshoot', link: '/troubleshoot' },
      { text: 'Migrate from v4', link: '/migrate-from-v4' },
    ],
  }
})
