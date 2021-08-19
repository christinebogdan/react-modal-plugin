# About this modal plugin

This is a simple plugin that contains a modal component for react projects.

- The plugin renders a **pre-styled modal**
- In the background, it consists of
  1. a Modal backdrop component
  2. a Modal container component
  3. a Modal close button component (optional)
  4. a Modal text button component (optional)
- **Custom style can be easily applied**

## Installation

You can install the [react-modal-plugin](https://www.npmjs.com/package/@christinebogdan/react-modal-plugin1) with npm:

`npm install @christinebogdan/react-modal-plugin1`

## Using the plugin

### The content

Simply import the plugin into the file where you would like to use the modal with and **set its children** to your modal content.

Example:

```
<Modal>
    <h1>Congratulations!</h1>
    <p>You've created a modal!</p>
</Modal>
```

### The functionality

The modal functionality is handled by the local state of the modal's parent. Therefore, the **parent component requires state**. I have used showModal and setShowModal as variable names, but you can call them whatever you like.

**Important:** The initial state should be set to false.

The "show" prop communicates the parent's state to the modal.
The "toggle" prop receives the setShowModal as value. This enables the modal to be closed on button click.

Both, "show" and "toggle" are required.

```
function parentComponent(props) {
  const [showModal, setShowModal] = useState(false);
}

// (remaining code)

return (
    <SomeOtherComponent>
        <Modal
            show={showModal}
            toggle={setShowModal}>
                <h1>Congratulations!</h1>
                <p>You've created a modal!</p>
        </Modal>
    </SomeOthercomponent>
)

```

### Custom Styling

The props "modalBackdropStyle", "modalContainerStyle", "modalCloseButtonStyle" and "modalTextButtonStyle" enable custom styling. The values can be passed in as a string as normal **CSS syntax**.

```
<Modal
    show={showModal}
    toggle={setShowModal}
    modalBackdropStyle={"background-color: yellow; opacity: 0.4"}
    >
        <h1>Congratulations!</h1>
        <p>You've created a modal!</p>
</Modal>
```

### Animation

The modal comes with a **built-in animation effect** that can be turned on by setting the "animation" prop to true.

```
<Modal
    show={showModal}
    toggle={setShowModal}
    modalBackdropStyle={"background-color: yellow; opacity: 0.4"}
    animation={true}
    >
        <h1>Congratulations!</h1>
        <p>You've created a modal!</p>
</Modal>
```

### Scrolling

The prop "blockScrolling" determines, whether the body is scrollable while the modal is open. Its default value is set to true.

### Buttons

#### X-close button

Per default the modal is rendered with the usual x-close button. This can be turned off by setting the "showClose" prop to false.

#### Additional button

The modal can be rendered with an additional button via the "closeText" prop. This prop takes an object as its value with the two keys **text** and **eventHandling**.

**text:** The text value determines the button text and is **required**.

**eventHandling:** If passed in a value, the function will be called on button click. Otherwise the button click **defaults to closing the modal**.

```
<Modal
    show={showModal}
    toggle={setShowModal}
    modalBackdropStyle={`background-color: yellow; opacity: 0.4`}
    animation={true}
    closeText={{text: "I'm an additional button", eventHandling: customEventHandler}}
    >
        <h1>Congratulations!</h1>
        <p>You've created a modal!</p>
</Modal>
```

### Closing event types

Per default, the modal can be claused either via click, or via Escape key. This can be adjusted using the "clickClose" and "escapeClose" props. Both default to "true". If set to false, the functionality is turned off.

**Important:** In case you deactivate both, clickClose and escapeClose, you should define an object for the "closeText" prop and pass in a custom event handler. Otherwise, you will not be able to close the modal.

### Overview

| Prop                    | Type     | Required?                                   | Default                  | Description                                                                                                                                                                     |
| ----------------------- | -------- | ------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| animation               | boolean  | _optional_                                  | false                    | When set to true, modal appears with a short fade-in animation.                                                                                                                 |
| blockScrolling          | boolean  | optional                                    | true                     | When set to false, the body will be scrollable while the modal is open.                                                                                                         |
| clickClose              | boolean  | _optional_                                  | true                     | When set to false, modal cannot be closed on click.                                                                                                                             |
| closeText               | Object   | _optional_                                  | undefined                | Object, that adds an additional button to the modal with the option to add custom event handling (closeText = {text: _string_, eventHandling: _function_}).                     |
| closeText.text          | string   | **required** (if additional button is used) | -                        | The text to be displayed on the additional button.                                                                                                                              |
| closeText.eventHandling | function | _optional_                                  | function to close modal  | A custom event handler for the button.                                                                                                                                          |
| escapeClose             | boolean  | _optional_                                  | true                     | When set to false, modal cannot be closed via Escape key                                                                                                                        |
| modalBackdropStyle      | string   | _optional_                                  | pre-styled               | Contains custom styling for the modal backdrop.                                                                                                                                 |
| modalCloseButtonStyle   | string   | _optional_                                  | pre-styled               | Contains custom styling for the close button.                                                                                                                                   |
| modalContainerStyle     | string   | _optional_                                  |  pre-styled              | Contains custom styling for the modal container.                                                                                                                                |
| modalTextButtonStyle    | string   | _optional_                                  | pre-styled               | Contains custom styling for the optional additional button.                                                                                                                     |
| show                    | boolean  | **required**                                | false                    | Determines whether the modal is displayed, or not. Depends on the respective variable value in the parent's local state.                                                        |
| showClose               | boolean  | _optional_                                  | true                     | When set to false, no close button is displayed.                                                                                                                                |
| toggle                  | boolean  | **required**                                | function to update state | Hands the function that updates the show variable in the parent's local state to the modal component. In the modal component, it is used as event handler for the close button. |
