module.exports = {
  title: 'V-Craft',
  themeConfig: {
    sidebarDepth: 2,
    sidebar: [
      {
        title: 'Guide',
        collapsable: false,
        children: [
          '/guide/',
          '/guide/installation',
          '/guide/tutorial',
        ]
      },
      // {
      //   title: 'API Reference',
      //   collapsable: false,
      //   children: [
      //     '/api/',
      //   ]
      // }
    ],
  },
  markdown: {
    lineNumbers: true,
  },
}
