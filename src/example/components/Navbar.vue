<template>
  <nav class="navbar">
    <span class="brand">V-Craft</span>
    <div class="actions">
      <a href="#">Github</a>
      <a href="#">Import</a>
      <a href="#">Export</a>
      <el-switch
        :value="enabled"
        @input="updateState"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
    </div>
  </nav>
</template>

<script>
export default {
  inject: [
    'editor',
  ],
  computed: {
    enabled() {
      return this.editor.enabled;
    },
  },
  methods: {
    updateState(enabled) {
      if (enabled) {
        this.editor.enable();
      } else {
        this.editor.disable();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../app.scss';

.navbar {
  position: relative;
  z-index: 100;
  display: flex;
  height: $navbar-height;
  line-height: $navbar-height;
  padding: 0 13px;
  background-color: white;
  box-shadow: 0 2px 3px rgba($color: #000000, $alpha: 0.03);
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.12);
  .brand {
    font-size: 26px;
    color: $color-black;
  }
  .actions {
    display: flex;
    align-items: center;
    margin-left: auto;
    padding: 0 12px;
    & > * {
      margin-left: 15px;
    }
  }
  a {
    display: block;
    color: $color-gray;
    text-decoration: none;
    &:hover {
      color: $color-black;
    }
  }
}
</style>
