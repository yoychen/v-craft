<template>
  <el-form label-position="top" size="mini" :model="elementProps">
    <el-form-item label="Heading Type">
      <el-radio-group
        :value="elementProps.headingType" @input="updateHeadingType"
      >
        <el-radio-button label="h1"></el-radio-button>
        <el-radio-button label="h2"></el-radio-button>
        <el-radio-button label="h3"></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Content">
      <el-input :value="elementProps.content" @input="updateContent" />
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
    updateHeadingType(headingType) {
      this.elementPropsSetter({ headingType });
    },
  },
};
</script>
