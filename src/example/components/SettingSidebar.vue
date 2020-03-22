<template>
  <div class="sidebar">
    <el-collapse>
      <el-collapse-item
        v-for="(component, name) in settingComponents"
        :key="name"
        :title="name"
        :name="name"
      >
        <component
          :is="component"
          :elementProps="elementProps"
          :elementPropsSetter="elementPropsSetter"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  inject: [
    'editor',
  ],
  computed: {
    selectedNode() {
      return this.editor.selectedNode;
    },
    elementPropsSetter() {
      let setter = this.selectedNode && this.selectedNode.setProps;
      setter = setter.bind(this.selectedNode);

      return setter;
    },
    elementProps() {
      return this.selectedNode && this.selectedNode.props;
    },
    settingComponents() {
      return this.selectedNode
        ? this.selectedNode.addition.settingComponents
        : {};
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 250px;
  padding: 0 20px;
  overflow-y: auto;
  background-color: white;
}
</style>

<style lang="scss">
  .el-collapse-item__header {
    font-size: 16px;
  }
  .el-collapse-item__content {
    padding: 10px 5px 5px;
  }
  .el-form-item .el-form-item__label {
    line-height: 1;
  }
  .el-slider {
    margin: 0 10px;
  }
</style>
