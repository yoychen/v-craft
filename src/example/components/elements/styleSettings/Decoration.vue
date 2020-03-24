<template>
  <el-form label-position="top" size="mini" :model="elementProps">
    <el-form-item label="Corner Radius" v-if="styleExist('border-radius')">
      <el-slider :value="getStyle('border-radius')" @input="setStyle('border-radius', $event)" />
    </el-form-item>

    <label class="el-form-item__label">Shadow</label>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="x" v-if="styleExist('box-shadow')">
          <el-slider
            :max="20"
            :value="getStyle('box-shadow').x"
            @input="updateBoxShadow('x', $event)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="y" v-if="styleExist('box-shadow')">
          <el-slider
            :max="20"
            :value="getStyle('box-shadow').y"
            @input="updateBoxShadow('y', $event)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="blur" v-if="styleExist('box-shadow')">
          <el-slider
            :max="20"
            :value="getStyle('box-shadow').blur"
            @input="updateBoxShadow('blur', $event)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="spread" v-if="styleExist('box-shadow')">
          <el-slider
            :max="20"
            :value="getStyle('box-shadow').spread"
            @input="updateBoxShadow('spread', $event)"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="color" v-if="styleExist('box-shadow')">
      <el-color-picker
        show-alpha
        :value="getStyle('box-shadow').color"
        @active-change="updateBoxShadow('color', $event)"
      />
    </el-form-item>

  </el-form>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin],
  methods: {
    updateBoxShadow(key, value) {
      const boxShadow = this.getStyle('box-shadow');
      this.setStyle('box-shadow', {
        ...boxShadow,
        [key]: value,
      });
    },
  },
};
</script>
