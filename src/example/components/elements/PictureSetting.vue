<template>
  <el-form label-position="top" size="mini" :model="elementProps">
    <el-form-item label="Image">
      <el-input :value="elementProps.imageUrl" @input="updateImageUrl" />
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
    updateImageUrl(imageUrl) {
      this.elementPropsSetter({ imageUrl });
    },
  },
};
</script>
