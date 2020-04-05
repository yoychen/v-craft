<template>
  <component
    @click="setEditable(true)"
    @blur="setEditable(false)"
    @keyup="emitInput"
    @paste="handlePaste"
    :contenteditable="contenteditable"
    :is="tag"
    ref="editor"
  />
</template>

<script>
export default {
  props: {
    tag: String,
    value: String,
  },
  inject: [
    'editor',
  ],
  data() {
    return {
      editable: false,
    };
  },
  mounted() {
    /*
    Different browser will use different strategy on creating a new line of text.
    In Chrome, it will wrap the new line with <div>,
    so we choose directly manipulating DOM instead of using vue binding
    to avoid the previous problem.

    For further details, please see the following link.
    https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content#Differences_in_markup_generation
    */
    this.updateDOMContent();
  },
  updated() {
    this.updateDOMContent();
  },
  watch: {
    value() {
      this.updateDOMContent();
    },
  },
  computed: {
    contenteditable() {
      return this.enabled && this.editable;
    },
    enabled() {
      return this.editor
        ? this.editor.enabled
        : true;
    },
  },
  methods: {
    updateDOMContent() {
      // To avoid that cursor jumps to start on typing.
      if (this.value !== this.$refs.editor.innerText) {
        this.$refs.editor.innerText = this.value;
      }
    },
    setEditable(bool) {
      this.editable = bool;
    },
    emitInput() {
      const value = this.$refs.editor.innerText;
      this.$emit('input', value);
    },
    handlePaste(event) {
      event.preventDefault();

      // To paste plain text.
      document.execCommand(
        'insertText',
        false,
        event.clipboardData.getData('text'),
      );
    },
  },
};
</script>
