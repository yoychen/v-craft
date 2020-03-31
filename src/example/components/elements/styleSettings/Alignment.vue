<template>
  <el-form label-position="top" size="mini" :model="elementProps">
    <el-form-item label="Flex Direction" v-if="styleExist('flex-direction')">
      <el-radio-group
        :value="getStyle('flex-direction')"
        @input="setStyle('flex-direction', $event)"
      >
        <el-radio-button label="column"></el-radio-button>
        <el-radio-button label="row"></el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Justify Content" v-if="styleExist('justify-content')">
      <el-radio-group
        :value="getStyle('justify-content')"
        @input="setStyle('justify-content', $event)"
      >
        <el-radio-button label="flex-start"></el-radio-button>
        <el-radio-button label="center"></el-radio-button>
        <el-radio-button label="flex-end"></el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Align Items" v-if="styleExist('align-items')">
      <el-radio-group :value="getStyle('align-items')" @input="setStyle('align-items', $event)">
        <el-radio-button label="flex-start"></el-radio-button>
        <el-radio-button label="center"></el-radio-button>
        <el-radio-button label="flex-end"></el-radio-button>
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
