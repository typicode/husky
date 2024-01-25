import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Husky",
  description: "Git hooks made easy",
	head: [
		['link', { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="85">🐶</text></svg>' }],
	],
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
