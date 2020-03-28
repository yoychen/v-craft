<template>
  <component :is="component">
    <slot></slot>
  </component>
</template>

<script>
import Editor from '../core/Editor';

export default {
  props: {
    component: [Object, String],
    resolverMap: Object,
    import: {
      required: false,
      type: String,
    },
  },
  data() {
    return {
      editor: new Editor([], this.resolverMap),
    };
  },
  created() {
    if (this.import) {
      this.editor.import(this.import);
    }
  },
  provide() {
    return {
      editor: this.editor,
    };
  },
};
</script>
