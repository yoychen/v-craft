<template>
  <div id="app">
    <Editor component='div' :resolverMap="resolverMap" >
      <ElementSidebar />
      <Paper>
        <Frame component='div'>
          <Canvas component='Container' />
        </Frame>
      </Paper>
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
import Container from './components/elements/Container.vue';
import Paragraph from './components/elements/Paragraph.vue';

export default {
  name: 'App',
  components: {
    Frame, Editor, Canvas, Paper, SettingSidebar, ElementSidebar,
  },
  data() {
    return {
      resolverMap: {
        Canvas, Container, Paragraph,
      },
    };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

body {
  background: #eee;
}
</style>
