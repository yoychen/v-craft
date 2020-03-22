<template>
  <el-form label-position="top" size="mini" :model="elementProps">
    <el-form-item label="Font Size" v-if="styleExist('font-size')">
      <el-slider :value="getStyle('font-size')" @input="setStyle('font-size', $event)"></el-slider>
    </el-form-item>

    <el-form-item label="Align" v-if="styleExist('text-align')">
      <el-radio-group :value="getStyle('text-align')" @input="setStyle('text-align', $event)">
        <el-radio-button label="left"></el-radio-button>
        <el-radio-button label="center"></el-radio-button>
        <el-radio-button label="right"></el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Weight" v-if="styleExist('font-weight')">
      <el-radio-group :value="getStyle('font-weight')" @input="setStyle('font-weight', $event)">
        <el-radio-button label="lighter">lighter</el-radio-button>
        <el-radio-button label="normal">normal</el-radio-button>
        <el-radio-button label="bold">bold</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Color" v-if="styleExist('color')">
      <el-color-picker
        show-alpha
        :value="getStyle('color')"
        @active-change="setStyle('color', $event)"
      />
    </el-form-item>

  </el-form>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin],
};
</script>
