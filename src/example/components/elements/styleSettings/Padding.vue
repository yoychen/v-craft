<template>
  <el-form label-position="top" size="mini" :model="elementProps">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Top" v-if="styleExist('padding-top')">
          <el-slider :value="getStyle('padding-top')" @input="setStyle('padding-top', $event)" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Right" v-if="styleExist('padding-right')">
          <el-slider
            :value="getStyle('padding-right')"
            @input="setStyle('padding-right', $event)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Bottom" v-if="styleExist('padding-bottom')">
          <el-slider
            :value="getStyle('padding-bottom')"
            @input="setStyle('padding-bottom', $event)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Left" v-if="styleExist('padding-left')">
          <el-slider :value="getStyle('padding-left')" @input="setStyle('padding-left', $event)" />
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin],
};
</script>
