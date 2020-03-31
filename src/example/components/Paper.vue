<template>
  <div class="paper">
    <slot />
  </div>
</template>

<style lang="scss">
.paper {
  max-width: 1300px;
  margin: auto;
  border: 1px solid #eee;
  box-shadow: 0 14px 24px -6px #474d4730;
  background-color: white;

  .cf-node-selected {
    outline: #1faee5 solid 2px !important;
  }
}
</style>
