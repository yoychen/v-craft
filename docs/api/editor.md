# Editor

A object in the `<Editor />` for maintaining the editor's context.

## Properties

### enabled

 * type: `boolean`

The editor state.

### selectedNode

 * type: `Node`

The current selected page element.

## Methods

### enable

 * type: `() => void` 

Set the editor state to enabled.

### disable

 * type: `() => void`

Set the editor state to disabled.

### selectNode

 * type: `(node: Node) => void`

Set the current selected page element.

### getCraftConfig

 * type: `(node: Node) => Object`

Get the craft config of the inputted page element.

### getSettings

 * type: `(node: Node) => Object<string, Object (component’s options object)>`

Get the setting components of the inputted page element.

### export

 * type: `() => string` 

Serialize the editor's context to JSON.

### import

 * type: `(plainEditorData: string) => void` 

Deserialize the inputted JSON to the editor's context.
