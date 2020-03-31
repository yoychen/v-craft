<template>
  <el-form label-position="top" size="mini" :model="elementProps">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Top" v-if="styleExist('margin-top')">
          <el-slider :value="getStyle('margin-top')" @input="setStyle('margin-top', $event)" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Right" v-if="styleExist('margin-right')">
          <el-slider :value="getStyle('margin-right')" @input="setStyle('margin-right', $event)" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Bottom" v-if="styleExist('margin-bottom')">
          <el-slider
            :value="getStyle('margin-bottom')"
            @input="setStyle('margin-bottom', $event)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Left" v-if="styleExist('margin-left')">
          <el-slider :value="getStyle('margin-left')" @input="setStyle('margin-left', $event)" />
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
