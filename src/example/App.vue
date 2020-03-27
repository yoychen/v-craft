<template>
  <div id="app">
    <Editor component='div' :resolverMap="resolverMap" >
      <Navbar />
      <ElementSidebar />
      <div class="content">
        <Paper>
          <Frame component='div'>
            <Canvas component='Container' />
          </Frame>
        </Paper>
      </div>
      <SettingSidebar />
    </Editor>
  </div>
</template>

<script>
import Frame from '@/components/Frame.vue';
import Editor from '@/components/Editor.vue';
import Canvas from '@/components/Canvas.vue';
import Paper from './components/Paper.vue';
import SettingSidebar from './components/SettingSidebar.vue';
import ElementSidebar from './components/ElementSidebar.vue';
import Navbar from './components/Navbar.vue';
import Container from './components/elements/Container.vue';
import Paragraph from './components/elements/Paragraph.vue';
import Heading from './components/elements/Heading.vue';
import Picture from './components/elements/Picture.vue';
import Carousel from './components/elements/Carousel.vue';

export default {
  name: 'App',
  components: {
    Frame, Editor, Canvas, Paper, SettingSidebar, ElementSidebar, Navbar,
  },
  data() {
    return {
      resolverMap: {
        Canvas, Container, Paragraph, Heading, Picture, Carousel,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import './app.scss';

.content {
  position: absolute;
  top: $navbar-height;
  left: $element-sidebar-width;
  right: $setting-sidebar-width;
  bottom: 0;
  padding: 2em 3em;
  overflow: auto;
}
</style>

<style lang="scss">
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

body {
  background: #eee;
  margin: 0;
}
</style>
