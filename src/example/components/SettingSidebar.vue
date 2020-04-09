<template>
  <div class="sidebar" :class="{ disable: !this.editor.enabled }">
    <div class="content" :class="{ 'has-actions': showActions }">
      <el-collapse v-if="settingComponents">
        <el-collapse-item
          v-for="(component, name) in settingComponents"
          :key="name"
          :title="name"
          :name="name"
        >
          <component
            :is="component"
            :node="selectedNode"
          />
        </el-collapse-item>
      </el-collapse>
      <div v-else class="empty-view">
        <i class="el-icon-edit"></i>
        <span class="description">
          Click on a element in preview panel to start editing.
        </span>
      </div>
    </div>

    <div v-if="showActions" class="actions">
      <el-button
        @click="deleteNode"
        type="danger"
        icon="el-icon-delete"
        circle></el-button>
      <el-button
        @click="focusParent"
        icon="el-icon-top-right"
        circle></el-button>
    </div>
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
    settingComponents() {
      if (!this.selectedNode) {
        return null;
      }

      return this.editor.getSettings(this.selectedNode);
    },
    showActions() {
      return this.selectedNode && this.selectedNode.parent;
    },
  },
  methods: {
    deleteNode() {
      this.$confirm('This will permanently delete this element. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        this.editor.removeNode(this.selectedNode);
      });
    },
    focusParent() {
      const { parent } = this.selectedNode;
      this.editor.selectNode(parent);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../app.scss';

$actions-height: 50px;

.sidebar {
  position: absolute;
  top: $navbar-height;
  right: 0;
  bottom: 0;
  width: $setting-sidebar-width;
  background-color: white;

  transition: 0.2s transform;
  transition-timing-function: ease-in-out;
  &.disable {
    transform: translateX(100%);
  }
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 5px 20px;
  overflow: auto;

  @include scrollbar();

  &.has-actions {
    bottom: $actions-height;
  }
}

.actions {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: $actions-height;
  line-height: $actions-height;
  padding: 0 0.8em;
  border-top: 1px solid #eee;
  background-color: white;
  button {
    padding: 7px;
    & + button {
      margin-left: 6px;
    }
  }
}

.empty-view {
  margin-top: 5em;
  text-align: center;
  color: $color-gray;
  i {
    font-size: 24px;
  }
  .description {
    display: block;
    margin-top: 0.8em;
    font-size: 14px;
    line-height: 1.5;
  }
}
</style>

<style lang="scss">
.sidebar {
  .el-collapse {
    border: none;
  }
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
}
</style>
