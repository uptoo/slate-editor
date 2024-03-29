"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Underlined;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Underlined() {
  return /*#__PURE__*/_react.default.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      fill: '#64748b'
    }
  }, /*#__PURE__*/_react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12.79 16.95C15.82 16.56 18 13.84 18 10.79V4.25C18 3.56 17.44 3 16.75 3C16.06 3 15.5 3.56 15.5 4.25V10.9C15.5 12.57 14.37 14.09 12.73 14.42C10.48 14.89 8.5 13.17 8.5 11V4.25C8.5 3.56 7.94 3 7.25 3C6.56 3 6 3.56 6 4.25V11C6 14.57 9.13 17.42 12.79 16.95ZM5 20C5 20.55 5.45 21 6 21H18C18.55 21 19 20.55 19 20C19 19.45 18.55 19 18 19H6C5.45 19 5 19.45 5 20Z"
  }));
}