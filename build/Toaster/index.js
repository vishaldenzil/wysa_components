"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToasterComponent = function ToasterComponent(_ref) {
  var toast = _ref.toast,
      removeToast = _ref.removeToast;
  var toastIcon;
  return /*#__PURE__*/_react.default.createElement("div", {
    key: toast.id,
    role: "presentation",
    onClick: function onClick() {
      return removeToast(toast.id);
    },
    className: "toast ".concat(toast.type, "_toast fade-in")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(toast.type, "_text")
  }, /*#__PURE__*/_react.default.createElement("strong", null, toast.title), /*#__PURE__*/_react.default.createElement("br", null), toast.message, toast.refresh ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("span", {
    role: "presentation",
    className: "refresh_toast",
    onClick: function onClick() {
      return toast.refreshFunc();
    }
  }, "Click here to refresh")) : null));
};

var _default = ToasterComponent;
exports.default = _default;