# Craft Config

A property in the Vue.js component's option for configuring the page element.

## Properties

### defaultProps?

 * type: `Object`

Define the default values for the props of the page element.

### settings?

 * type: `Object<string, Object (component’s options object)>`

A map of the setting components that will be used to edit the page element's props.

### rules?

 * type: `Object`
    * canDrag? `(currentNode: Node) => boolean`
        * Used to specify if the page element is draggable.
    * canMoveIn? `(incomingNode: Node, currentNode: Node) => boolean`
        * Available for page container. Used to specify if the incoming page element can be dragged into the current page container.
    * canMoveOut? `(outgoingNode: Node, currentNode: Node) => boolean`
        * Available for page container. Used to specify if the outgoing page element can be dragged out of the current page container. You should be aware that it only applies to the immediate children of the current page container.

### addition?

 * type: `Object`

Define the additional properties that will not be injected into the page element's props.
