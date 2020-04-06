export default {
  inject: [
    'editor',
  ],
  computed: {
    elementPropsSetter() {
      const { selectedNode } = this.editor;

      let setter = selectedNode && selectedNode.setProps;
      setter = setter.bind(selectedNode);

      return setter;
    },
    elementProps() {
      const { selectedNode } = this.editor;

      return selectedNode && selectedNode.props;
    },
  },
};
