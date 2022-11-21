"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Italic;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Italic(_ref) {
  var className = _ref.className;
  return /*#__PURE__*/_react.default.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: className
  }, /*#__PURE__*/_react.default.createElement("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M10 5.5C10 6.33 10.67 7 11.5 7H12.21L8.79 15H7.5C6.67 15 6 15.67 6 16.5C6 17.33 6.67 18 7.5 18H12.5C13.33 18 14 17.33 14 16.5C14 15.67 13.33 15 12.5 15H11.79L15.21 7H16.5C17.33 7 18 6.33 18 5.5C18 4.67 17.33 4 16.5 4H11.5C10.67 4 10 4.67 10 5.5Z"
  }));
}