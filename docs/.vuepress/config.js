module.exports = {
  base: '/v-craft/docs/',
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
        ],
      },
      {
        title: 'API Reference',
        collapsable: false,
        children: [
          '/api/editor_component',
          '/api/frame_component',
          '/api/canvas_component',
          '/api/blueprint_component',
        ],
      },
    ],
  },
  markdown: {
    lineNumbers: true,
  },
}
