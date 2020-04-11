<template>
  <div class="element-block">
    <i class="material-icons">
      {{ icon }}
    </i>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
  },
};
</script>

<style lang="scss" scoped>
$block-height: 50px;

.element-block {
  height: $block-height;
  text-align: center;
  cursor: pointer;
  .material-icons {
    font-size: 40px;
    line-height: $block-height;
    color: #919191;
  }
}
</style>
