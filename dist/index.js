"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Modal;

var _Style = require("./Style");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
 * @param {Object} [closeText] - Object with content to display an additional button (text and event handling)
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
function Modal(_ref) {
  let {
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
    children
  } = _ref;

  const modalCloseButton = _react.default.useRef(null);
  /**
   * Once component has mounted, focus is set on modal X-close button, if
   * show prop is true. If blockScrolling prop is true, body is set
   * to overflow = hidden.
   */


  (0, _react.useEffect)(() => {
    if (show) {
      modalCloseButton.current.focus();

      if (blockScrolling) {
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
   * Closing the modal. If blockScrolling is true, then body style overflow is set to visible.
   * @param {Object} e - The emitted event
   */


  const close = e => {
    e.preventDefault();

    if (clickClose && e.type === "click") {
      toggle();
      if (blockScrolling) unblock();
    }

    if (e.type === "keydown" && (e.key === "Enter" || escapeClose && e.key === "Escape")) {
      toggle();
      if (blockScrolling) unblock();
    }
  };

  return /*#__PURE__*/_react.default.createElement(_Style.ModalBackdrop, {
    show: show,
    onClick: close,
    onKeyDown: close,
    customStyle: modalBackdropStyle
  }, /*#__PURE__*/_react.default.createElement(_Style.ModalContainer, {
    onClick: e => {
      e.stopPropagation();
    },
    animation: animation,
    customStyle: modalContainerStyle
  }, children, /*#__PURE__*/_react.default.createElement(_Style.ModalTextButton, {
    closeText: closeText,
    onClick: closeText.eventHandling ? () => {
      if (blockScrolling) unblock();
      closeText.eventHandling();
    } : close,
    customStyle: modalTextButtonStyle
  }, closeText.text), /*#__PURE__*/_react.default.createElement(_Style.ModalCloseButton, {
    ref: modalCloseButton,
    onClick: close,
    onKeyDown: close,
    showClose: showClose,
    tabIndex: "-1",
    customStyle: modalCloseButtonStyle
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      height: "100%"
    }
  }, "+"))));
}