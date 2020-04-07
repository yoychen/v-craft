# Tutorial

In this tutorial, we will build a simple page builder step-by-step with Bootstrap CSS framework.

## Page element

Page element is just a Vue.js component that will be displayed to our end user in the preview panel, the user will able to edit/create/move it around the preview panel.

```html
<!-- components/elements/Paragraph.vue -->

<template>
  <p>{{ content }}</p>
</template>

<script>
export default {
  props: {
    content: String,
  },
  // We introduce a craft config attribute in vue's component option,
  // that can define the default props of our page element.
  craft: {
    defaultProps: {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  },
};
</script>
```

## Page container

Page container is a page element also, and it can allow our end user to drag page elements into its default slots.


```html
<!-- components/elements/Container.vue -->

<template>
  <div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
div {
  padding: 30px;
  outline: 1px dashed gray;
}
</style>
```

## Basic editor

The following is the simple composition of the page builder, The app must be wrapped with `<Editor />` from V-Craft. The editor state will be managed and provided from `<Editor />`. We use Bootstrap's grid system to simply present the simple page builder layout, which contains a preview panel and a setting panel.

### Setup

 - All page elements that we defined should be passed into `resolverMap` prop
 - `<Frame />` is responsible for rendering the page preview. you can pass page elements into its default slots, and it will be used to the default content of the page preview.
 - If you want to present the page container, you should use `<Canvas />` and put the page container name in its props. `<Canvas />` will create a droppable region where its immediate children are draggable.


```html{5,11,12}
<!-- App.vue -->

<template>
  <div id="app">
    <Editor component='div' class="container" :resolverMap="resolverMap">
      <div class="row">
        <div class="col">
          <div class="setting-panel"></div>
        </div>
        <div class="col-8">
          <Frame component="div" class="preview-panel">
            <Canvas component="Container">
              <Paragraph content="demo text" />
            </Canvas>
          </Frame>
        </div>
      </div>
    </Editor>
  </div>
</template>

<script>
import { Canvas, Editor, Frame } from '@v-craft/core';
import Container from './components/elements/Container.vue';
import Paragraph from './components/elements/Paragraph.vue';

export default {
  name: 'App',
  components: {
    Canvas, Editor, Frame, Paragraph,
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
```

## Setting component

To edit the page element, we introduce the setting component interface that the developer can construct each page element's setting components with a consistent specification.

For example, component `<ParagraphSetting>` is `<Paragraph />`'s setting component. It uses a mixin `settingMixin` from V-Craft, the mixin will provide `elementProps` and `elementPropsSetter`. You can use them with any form input element to describe how to amend the page element.

```html
<!-- components/elements/ParagraphSetting.vue -->

<template>
  <div>
    <input class="form-control" v-model="content" />
  </div>
</template>

<script>
import { settingMixin } from '@v-craft/core';

export default {
  mixins: [settingMixin],
  computed: {
    content: {
      get() {
        return this.elementProps.content;
      },
      set(value) {
        this.updateContent(value);
      },
    },
  },
  methods: {
    updateContent(content) {
      this.elementPropsSetter({ content });
    },
  },
};
</script>
```

Let's use the config `craft.settings` to declare `<ParagraphSetting>` is one of the setting components of `<Paragraph />`.

```html{8,18,19,20}
<!-- components/elements/Paragraph.vue -->

<template>
  <p>{{ content }}</p>
</template>

<script>
import ParagraphSetting from './ParagraphSetting.vue';

export default {
  props: {
    content: String,
  },
  craft: {
    defaultProps: {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    settings: {
      ParagraphSetting,
    },
  },
};
</script>
```

Now, we would like to show the setting components of the currently selected element in our editor. As the following code, relying on Vue's [Provide/Inject API](https://vuejs.org/v2/api/#provide-inject) we can use the injected value `editor` to access the `<Editor />`'s internal context in `<SettingPanel />`, so we can use `editor.selectedNode` and `editor.getSettings()` to get the setting components of the currently selected element.

```html
<!-- components/SettingPanel.vue -->

<template>
  <div class="setting-panel">
    <div v-if="settings" class="settings">
      <component
        v-for="(component, name) in settings"
        :key="name"
        :is="component"
        :node="selectedNode"
      ></component>
    </div>
  </div>
</template>

<script>
export default {
  inject: [
    'editor',
  ],
  computed: {
    selectedNode() {
      return this.editor.selectedNode;
    },
    settings() {
      if (!this.selectedNode) {
        return null;
      }

      return this.editor.getSettings(this.selectedNode);
    },
  },
};
</script>
```

Display `<SettingPanel />` in our editor.

```html{8,26,31}
<!-- App.vue -->

<template>
  <div id="app">
    <Editor component='div' class="container" :resolverMap="resolverMap">
      <div class="row">
        <div class="col">
          <SettingPanel />
        </div>
        <div class="col-8">
          <Frame component="div" class="preview-panel">
            <Canvas component="Container">
              <Paragraph content="demo text" />
            </Canvas>
          </Frame>
        </div>
      </div>
    </Editor>
  </div>
</template>

<script>
import { Canvas, Editor, Frame } from '@v-craft/core';
import Container from './components/elements/Container.vue';
import Paragraph from './components/elements/Paragraph.vue';
import SettingPanel from './components/SettingPanel.vue';

export default {
  name: 'App',
  components: {
    Canvas, Editor, Frame, Paragraph, SettingPanel,
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
```


## Delete page element

To delete the page element that the end-user selected, we can use the method `editor.removeNode()`.

```html{13,35-37}
<!-- components/SettingPanel.vue -->

<template>
  <div class="setting-panel">
    <div v-if="settings" class="settings">
      <component
        v-for="(component, name) in settings"
        :key="name"
        :is="component"
      ></component>
    </div>

    <button class="btn btn-danger mt-3" v-if="selectedNode" @click="removeElement">Delete</button>
  </div>
</template>

<script>
export default {
  inject: [
    'editor',
  ],
  computed: {
    selectedNode() {
      return this.editor.selectedNode;
    },
    settings() {
      if (!this.selectedNode) {
        return null;
      }

      return this.editor.getSettings(this.selectedNode);
    },
  },
  methods: {
    removeElement() {
      return this.editor.removeNode(this.selectedNode);
    },
  },
};
</script>
```

## Create new page element

Until this point, we have built a page builder where our end-user can drag page elements around and edit the page element's parameter. But, we are missing an important feature - creating a new page element by dragging. 

V-Craft provides us with the component `<Blueprint>`, which can be used to define a composition of the page elements. When the end-user drags it, it will create the composition we defined and insert to the point at which the end-user drop.

```html{9-22,33,39}
<!-- App.vue -->

<template>
  <div id="app">
    <Editor component='div' class="container" :resolverMap="resolverMap">
      <div class="row">
        <div class="col">

          <Blueprint component="button" class="btn btn-outline-dark">
            Paragraph
            <template v-slot:blueprint>
              <Paragraph />
            </template>
          </Blueprint>
           <Blueprint component="button" class="btn btn-outline-dark">
            Container
            <template v-slot:blueprint>
              <Canvas component="Container" />
            </template>
          </Blueprint>

          <hr />

          <SettingPanel />
        </div>
        ...
      </div>
    </Editor>
  </div>
</template>

<script>
import { Canvas, Editor, Frame, Blueprint } from '@v-craft/core';
...

export default {
  name: 'App',
  components: {
    Canvas, Editor, Frame, Paragraph, SettingPanel, Blueprint,
  },
  ...
};
</script>
```

## Retrieve and manipulate editor state

We can get the editor's state from the injected value `editor.enabled`, and toggle it by using `editor.enable()` and `editor.disable()` methods. When the editor's state is disabled, all page elements in `<Frame />` can not be dragged and selected, nor can they be edited.

```html{5-14,22-24,28-34}
<!-- components/SettingPanel.vue -->

<template>
  <div class="setting-panel">
    <div class="custom-control custom-switch">
      <input
        :checked="editor.enabled"
        @change="toggleState"
        type="checkbox"
        class="custom-control-input"
        id="editorState">
      <label class="custom-control-label" for="editorState">Enable</label>
    </div>
    <hr />

    ...
  </div>
</template>

<script>
export default {
  inject: [
    'editor',
  ],
  ...
  methods: {
    ...
    toggleState() {
      if (this.editor.enabled) {
        this.editor.disable();
      } else {
        this.editor.enable();
      }
    },
  },
};
</script>
```

## Export / Import

There is the last part of our page builder, we would like to save and restore the user's creation; we can do this by using the methods `editor.export()` and `editor.import()`.


```html
<!-- components/Export.vue -->

<template>
  <div>
    <div class="form-group">
      <textarea class="form-control" v-model="plainData"></textarea>
    </div>
    <button class="btn btn-primary mr-1" @click="doExport">Export</button>
    <button class="btn btn-secondary" @click="doImport">Import</button>
  </div>
</template>

<script>
export default {
  inject: [
    'editor',
  ],
  data() {
    return {
      plainData: '',
    };
  },
  methods: {
    doExport() {
      this.plainData = this.editor.export();
    },
    doImport() {
      this.editor.import(this.plainData);
    },
  },
};
</script>
```

Display `<Export />` in our editor.

```html{8,9,20,25}
<!-- App.vue -->

<template>
  <div id="app">
    <Editor component='div' class="container" :resolverMap="resolverMap">
      <div class="row">
        <div class="col">
          <Export />
          <hr />
          ...
        </div>
        ...
      </div>
    </Editor>
  </div>
</template>

<script>
...
import Export from './components/Export.vue';

export default {
  ...
  components: {
    Canvas, Editor, Frame, Paragraph, SettingPanel, Blueprint, Export,
  },
  ...
};
</script>
```

## Conclusion

Until the end, We implement the most of functionalities of a page builder with V-Craft. you can see this example on [this link](https://github.com/yoychen/v-craft-tutor).

With V-Craft, we won't need to build a drag-n-drop system ourselves, just need to focus on our specific need. Wrapping page elements is the same as writing any other Vue.js component, so we won't need to learn additional skills to do that. We sincerely hope it can help you.
