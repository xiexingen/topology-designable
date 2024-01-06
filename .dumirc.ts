import { defineConfig } from 'dumi';
import { version } from './package.json';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/topology-designable/',
  publicPath: '/topology-designable/',

  define: {
    'process.env.version': version,
  },
  // 国内提速，部分案例会使用不了(如:web worker部分的案例)
  // publicPath: 'https://fastly.jsdelivr.net/gh/xiexingen/topology-designable@gh-pages/', // cdn.jsdelivr.net
  // publicPath: 'https://github.com.cnpmjs.org/xiexingen/blog/tree/gh-pages/',
  // favicons: [
  //   "https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png",
  // ],
  // mode: 'site',
  // more config: https://d.umijs.org/config
  exportStatic: {},
  // styles: [],
  // links: [
  //   {
  //     rel: 'stylesheet',
  //     href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
  //   },
  //   { rel: 'stylesheet', href: '/style.css' },
  // ],
  // copy: ['CNAME'], // 自定义域名,放public文件夹即可
  themeConfig: {
    hd: { rules: [] },
    rtl: true,
    // name: 'TE',
    logo: 'https://avatars.githubusercontent.com/u/7939085',
    footer: `Open-source MIT Licensed | Copyright © 2021-present Powered by XXG`,
    prefersColor: { default: 'auto' },
    socialLinks: {
      github: 'https://github.com/xiexingen/topology-designable',
    },
  },
  // ...(process.env.NODE_ENV === 'development' ? {} : { ssr: {} }),
});
