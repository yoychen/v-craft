<template>
  <el-form label-position="top" size="mini" :model="elementProps">

    <el-form-item label="Color">
      <el-color-picker
        show-alpha
        :value="getStyle('background-color')"
        @active-change="setStyle('background-color', $event)"
      />
    </el-form-item>

    <el-form-item label="Image">
      <el-input
        :value="getStyle('background-image')"
        @input="setStyle('background-image', $event)"
      />
    </el-form-item>

    <el-form-item label="Attachment">
      <el-radio-group
        :value="getStyle('background-attachment')"
        @input="setStyle('background-attachment', $event)"
      >
        <el-radio-button label="scroll"></el-radio-button>
        <el-radio-button label="fixed"></el-radio-button>
      </el-radio-group>
    </el-form-item>

  </el-form>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin],
};
</script>
