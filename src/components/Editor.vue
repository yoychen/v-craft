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
  },
  data() {
    return {
      editor: new Editor([], this.resolverMap),
    };
  },
  provide() {
    return {
      editor: this.editor,
    };
  },
};
</script>
