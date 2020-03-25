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

    <el-form-item label="Line Height" v-if="styleExist('line-height')">
      <el-radio-group :value="getStyle('line-height')" @input="setStyle('line-height', $event)">
        <el-radio-button label="1"></el-radio-button>
        <el-radio-button label="1.5"></el-radio-button>
        <el-radio-button label="2"></el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Color" v-if="styleExist('color')">
      <el-color-picker
        show-alpha
        :value="getStyle('color')"
        @active-change="setStyle('color', $event)"
      />
    </el-form-item>

    <label class="el-form-item__label">Shadow</label>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="x" v-if="styleExist('text-shadow')">
          <el-slider
            :max="20"
            :value="getStyle('text-shadow').x"
            @input="updateTextShadow('x', $event)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="y" v-if="styleExist('text-shadow')">
          <el-slider
            :max="20"
            :value="getStyle('text-shadow').y"
            @input="updateTextShadow('y', $event)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="blur" v-if="styleExist('text-shadow')">
          <el-slider
            :max="20"
            :value="getStyle('text-shadow').blur"
            @input="updateTextShadow('blur', $event)"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="color" v-if="styleExist('text-shadow')">
          <el-color-picker
            show-alpha
            :value="getStyle('text-shadow').color"
            @active-change="updateTextShadow('color', $event)"
          />
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>
</template>

<script>
import mixin from './mixin';

export default {
  mixins: [mixin],
  methods: {
    updateTextShadow(key, value) {
      const textShadow = this.getStyle('text-shadow');
      this.setStyle('text-shadow', {
        ...textShadow,
        [key]: value,
      });
    },
  },
};
</script>
