<template>
  <el-form label-position="top" size="mini" :model="elementProps">
    <el-form-item label="Height (px)">
      <el-input type="number" :value="elementProps.height" @input="updateHeight" />
    </el-form-item>

    <el-form-item label="Interval (ms)">
      <el-input type="number" :value="elementProps.interval" @input="updateInterval" />
    </el-form-item>

    <label class="el-form-item__label">Slides</label>

    <el-card
      v-for="(slide, index) in slides"
      :key="index"
      shadow="never"
    >
      <el-form-item label="Background">
        <el-input v-model="slide.background" />
      </el-form-item>

      <el-button
        v-if="showDeleteBtn"
        @click="deleteSlide(slide)"
        class="delete-btn"
        type="danger"
        icon="el-icon-close"
        plain
        circle
      ></el-button>
    </el-card>

    <el-button
      @click="addSlide"
      class="add-btn"
      type="primary"
      icon="el-icon-plus"
      plain
      round
    >Add Slide</el-button>
  </el-form>
</template>

<script>
import { settingMixin } from '@';

export default {
  mixins: [settingMixin],
  computed: {
    slides() {
      return this.elementProps.slides;
    },
    showDeleteBtn() {
      return this.slides.length > 1;
    },
  },
  methods: {
    updateHeight(height) {
      this.elementPropsSetter({ height: parseInt(height, 10) });
    },
    updateInterval(interval) {
      this.elementPropsSetter({ interval: parseInt(interval, 10) });
    },
    addSlide() {
      const newSlide = {
        title: 'Lorem Ipsum Dolor Sit Amet',
        subtitle: 'Curabitur varius lorem nisl, non egestas leo feugiat at.',
        background: 'https://picsum.photos/id/363/2401/1601',
      };

      this.elementPropsSetter({
        slides: [...this.slides, newSlide],
      });
    },
    deleteSlide(slide) {
      this.elementPropsSetter({
        slides: this.slides.filter((e) => e !== slide),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  position: relative;
  margin-bottom: 1em;
}
.delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 2px;
  .el-icon-close {
    vertical-align: middle;
  }
}
.add-btn {
  margin-bottom: 1.5em;
}
</style>
