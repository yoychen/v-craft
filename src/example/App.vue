<template>
  <div id="app">
    <Editor component='div' :resolverMap="resolverMap" :import="demoData" >
      <Navbar />
      <ElementSidebar />
      <Preview />
      <SettingSidebar />
    </Editor>
  </div>
</template>

<script>
import { Editor, Canvas } from '@';
import SettingSidebar from './components/SettingSidebar.vue';
import ElementSidebar from './components/ElementSidebar.vue';
import Navbar from './components/Navbar.vue';
import Preview from './components/Preview.vue';
import Container from './components/elements/Container.vue';
import Paragraph from './components/elements/Paragraph.vue';
import Heading from './components/elements/Heading.vue';
import Picture from './components/elements/Picture.vue';
import Carousel from './components/elements/Carousel.vue';
import demoData from './demoData';

export default {
  name: 'App',
  components: {
    Editor, SettingSidebar, ElementSidebar, Navbar, Preview,
  },
  data() {
    return {
      resolverMap: {
        Canvas, Container, Paragraph, Heading, Picture, Carousel,
      },
      demoData,
    };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

html {
  overflow: hidden;
}

body {
  background: #eee;
  margin: 0;
}
</style>
