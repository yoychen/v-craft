<template>
  <component :is="editor.findResolver(component)" v-bind="$attrs">
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
