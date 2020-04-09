# `<Editor />`

The root component of the page editor, response to create and maintain the editor state. 

## Props

### component

 * type: `string | Object (component’s options object)`

Specify the component or HTML tag to display. 

### resolverMap

 * type: `Object<string, Object (component’s options object)>`

A map of page elements that will be used in the editor.

### import?

 * type: `string (editor state JSON)`

Optional. Used to set the initial content of the editable area (`<Frame />`).
