<template>
  <component :is="editor.findResolver(component)">
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    component: String,
  },
  inject: [
    'editor',
  ],
  methods: {
    getCraftOption() {
      return this.component.craft || {};
    },
  },
};
</script>
