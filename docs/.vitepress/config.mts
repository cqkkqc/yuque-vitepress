import { defineConfig } from 'vitepress'
import { genYuqueSideBar } from "../../utils/route";
import { YuQueSVG } from "../../utils/assists";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "Crysx00",
  description: "个人博客",
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  head: [
    [
      'link', { rel: 'icon', href: '/favicon.ico' }
    ]
  ],
  themeConfig: {
    search: {
      provider: 'local'
    },
    outline: [2,6],
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/docs/学习计划.md', activeMatch: '/docs/' },

    ],
    sidebar: {
      "/docs/": await genYuqueSideBar('/docs'),
      // "/docs-shorturl/": await genYuqueSideBarWithShortUrl('/docs-shorturl')
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    socialLinks: [
      { icon: { svg: YuQueSVG }, link: "https://www.yuque.com/dashboard" },
      { icon: 'github', link: 'https://github.com/cqkkqc' }
    ],
    footer: {
      message: 'Powered by <a href="https://www.yuque.com/1874w/yuque-vitepress-template" target="_blank">语雀</a>  & <a href="https://vitepress.dev" target="_blank">VitePress</a> with <a href="https://github.com/LetTTGACO/elog" target="_blank">Elog</a>',
      copyright: 'Copyright © 2024-Crysx00'
    },
  }
})
