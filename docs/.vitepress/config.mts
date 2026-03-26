import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Husky",
  description: "Git hooks made easy",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="85">🐶</text></svg>',
      },
    ],
  ],
  base: "/husky/",
  themeConfig: {
    // outline: [2, 3],
    socialLinks: [
      { icon: "github", link: "https://github.com/typicode/husky" },
      { icon: "twitter", link: "https://x.com/typicode" },
    ],
    // carbonAds: {
    //   code: 'CWYDP53L',
    //   placement: 'typicodegithubio',
    // },
    sidebar: [
      { text: "Introduction", link: "/" },
      { text: "Get Started", link: "/get-started" },
      { text: "How To", link: "/how-to" },
      { text: "Troubleshoot", link: "/troubleshoot" },
      { text: "Migrate from v4", link: "/migrate-from-v4" },
    ],
    nav: [{ text: "Sponsor", link: "https://github.com/sponsors/typicode" }],
  },
  locales: {
    root: {
      label: "English",
      lang: "en-US",
    },
    zh: {
      label: "简体中文",
      lang: "zh-hans",
      description: "使 Git hooks 变得简单",
      link: "/zh/",
      themeConfig: {
        sidebar: [
          { text: "简介", link: "/zh/" },
          { text: "快速开始", link: "/zh/get-started" },
          { text: "如何使用", link: "/zh/how-to" },
          { text: "故障排查", link: "/zh/troubleshoot" },
          { text: "从 v4 迁移", link: "/zh/migrate-from-v4" },
        ],
        docFooter: {
          prev: "上一页",
          next: "下一页",
        },
        outline: {
          label: "页面导航",
        },
        nav: [
          {
            text: "v9.0.1",
            items: [
              {
                text: "更新日志",
                link: "https://github.com/typicode/husky/releases/tag/v9.0.1",
              },
            ],
          },
        ],
      },
    },
    ru: {
      label: "Русский",
      lang: "ru-RU",
      description: "Git hooks made easy",
      link: "/ru/",
      themeConfig: {
        sidebar: [
          { text: "Введение", link: "/ru/" },
          { text: "Начало работы", link: "/ru/get-started" },
          { text: "Как использовать", link: "/ru/how-to" },
          { text: "Устранение неполадок", link: "/ru/troubleshoot" },
          { text: "Миграция с v4", link: "/ru/migrate-from-v4" },
        ],
        docFooter: {
          prev: "Предыдущая страница",
          next: "Следующая страница",
        },
        outline: {
          label: "Содержание страницы",
        },
        nav: [
          { text: "Sponsor", link: "https://github.com/sponsors/typicode" },
        ],
      },
    },
    es: {
      label: "Español",
      lang: "es-EC",
      description: "Git hooks se vuelven fáciles",
      link: "/es/",
      themeConfig: {
        sidebar: [
          { text: "Introducción", link: "/es/" },
          { text: "Comenzar", link: "/es/get-started" },
          { text: "Cómo hacerlo", link: "/es/how-to" },
          { text: "Solucionar problemas", link: "/es/troubleshoot" },
          { text: "Migrar desde v4", link: "/es/migrate-from-v4" },
        ],
        docFooter: {
          prev: "Página anterior",
          next: "Página siguiente",
        },
        outline: {
          label: "Contenido de la página",
        },
        nav: [
          { text: "Sponsor", link: "https://github.com/sponsors/typicode" },
        ],
      },
    },
    jp: {
      label: "日本語",
      lang: "ja-JP",
      description: "Git フックを簡単に",
      link: "/jp/",
      themeConfig: {
        sidebar: [
          { text: "はじめに", link: "/jp/" },
          { text: "始めましょう", link: "/jp/get-started" },
          { text: "方法", link: "/jp/how-to" },
          { text: "トラブルシュート", link: "/jp/troubleshoot" },
          { text: "v4からの移行", link: "/jp/migrate-from-v4" },
        ],
        docFooter: {
          prev: "前のページ",
          next: "次のページ",
        },
        outline: {
          label: "ページナビゲーション",
        },
        nav: [
          { text: "スポンサー", link: "https://github.com/sponsors/typicode" },
        ],
      },
    },
  },
});
