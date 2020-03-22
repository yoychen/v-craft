<template>
  <el-form label-position="top" size="mini" :model="elementProps">
    <el-form-item label="內容">
      <el-input type="textarea" :value="elementProps.content" @input="updateContent" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    elementProps: Object,
    elementPropsSetter: Function,
  },
  methods: {
    updateContent(content) {
      this.elementPropsSetter({ content });
    },
  },
};
</script>
