# Node

A object for maintaining the page element's context.

## Properties

### componentName

 * type: `string`

The page element's name. It should also exist in the `resolverMap` prop of `<Frame />` for consistency.

### props

 * type: `Object`

The page element's props.

### parent

 * type: `Node`

The page element's parent page element.

### children

 * type: `Array<Node>`

The page element's child page elements.

### addition

 * type: `Object`

The page element's additional properties.

### uuid

 * type: `string`

The page element's unique identifier.

## Methods

### setProps

 * type: `(change: Object) => void` 

A setter of the Node's props.

### isDroppable

 * type: `(incommingNode: Node) => boolean` 

Determine if the incomming page element can be dragged into itself.

### isDraggable

 * type: `() => boolean` 

Determine if the page element is draggable.

### duplicate

 * type: `() => Node` 

Deep clone current node and its children. it will return a new node instance with a different UUID.
