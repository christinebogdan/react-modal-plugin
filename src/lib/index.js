import {
  ModalBackdrop,
  ModalContainer,
  ModalCloseButton,
  ModalTextButton,
} from "./Style";
import React, { useEffect } from "react";

/**
 * Callback for the closetext.eventHandling key
 * @callback closeTextEventHandling
 */

/**
 * Callback as value for the toggle prop
 * @callback setShowModal
 */

/**
 * Function component that renders the modal HTML elements
 * @param {boolean} [showClose=true] - The state of displaying the X-close button
 * @param {boolean} [escapeClose=true] - The state of closing the modal via Escape button
 * @param {boolean} [clickClose=true] - The state of closing the modal via click
 * @param {Object} [closeText] - The state of displaying an additional button
 * @param {string} [closeText.text] - The text to be displayed on additional button
 * @param {closeTextEventHandling} [closetext.eventHandling] - A custom event handler for the additional button
 * @param {boolean} [animation=false] - The state of animating the modal display
 * @param {boolean} [blockScrolling=true] - The state of keeping the body scrollable while modal is displayed
 * @param {string} [modalCloseButtonStyle=""] - The custom style for the X-close button
 * @param {string} [modalTextButtonStyle=""] - The custom style for the additional button
 * @param {string} [modalContainerStyle=""] - The custom style for the modal container
 * @param {string} [modalBackdropStyle=""] - The custom style for the modal backdrop
 * @param {boolean} show - The state of displaying the modal
 * @param {setShowModal} setShowModal - The callback that handles the modal's parent's local state to show or hide modal
 * @returns {HTMLElement} The modal HTML elements (incl. backdrop, container, X-close button and additional button)
 */
export default function Modal({
  showClose = true,
  escapeClose = true,
  clickClose = true,
  closeText = undefined,
  animation = false,
  blockScrolling = true,
  modalCloseButtonStyle = "",
  modalTextButtonStyle = "",
  modalContainerStyle = "",
  modalBackdropStyle = "",
  show,
  toggle,
  children,
}) {
  const modalCloseButton = React.useRef(null);
  /**
   * Once component has mounted, focus is set on modal X-close button, if
   * show prop is true. If blockScrolling prop is true, body is set
   * to overflow = hidden.
   */
  useEffect(() => {
    // why does this not log "hello"?
    console.log("hello", blockScrolling);
    if (show) {
      modalCloseButton.current.focus();
      if (blockScrolling) {
        // why does this not log?
        console.log(blockScrolling);
        block();
      }
    }
  });

  /**
   * Blocks body scrolling
   */
  const block = () => {
    document.body.style.overflow = "hidden";
  };

  /**
   * Enables body scrolling
   */
  const unblock = () => {
    document.body.style.overflow = "visible";
  };

  /**
   * Closing the modal
   * @param {Object} e - The emitted event
   */
  const close = (e) => {
    e.preventDefault();
    console.log(e);
    if (clickClose && e.type === "click") {
      toggle();
      if (blockScrolling) unblock();
    }
    if (
      e.type === "keydown" &&
      (e.key === "Enter" || (escapeClose && e.key === "Escape"))
    ) {
      toggle();
      if (blockScrolling) unblock();
    }
  };

  return (
    <ModalBackdrop
      show={show}
      onClick={close}
      onKeyDown={close}
      customStyle={modalBackdropStyle}
    >
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
        animation={animation}
        customStyle={modalContainerStyle}
      >
        {children}
        <ModalTextButton
          closeText={closeText}
          onClick={
            closeText.eventHandling
              ? () => {
                  if (blockScrolling) unblock();
                  closeText.eventHandling();
                }
              : close
          }
          customStyle={modalTextButtonStyle}
        >
          {closeText.text}
        </ModalTextButton>
        <ModalCloseButton
          ref={modalCloseButton}
          onClick={close}
          onKeyDown={close}
          showClose={showClose}
          tabIndex="-1"
          customStyle={modalCloseButtonStyle}
        >
          <span
            style={{
              height: "100%",
            }}
          >
            +
          </span>
        </ModalCloseButton>
      </ModalContainer>
    </ModalBackdrop>
  );
}
