"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;
exports.default = MyEditor;

var _react = _interopRequireWildcard(require("react"));

var _slate = require("slate");

var _slateHistory = require("slate-history");

var _slateReact = require("slate-react");

var _excluded = ["className", "active", "reversed"],
    _excluded2 = ["initialValue", "onChange", "mentions", "onMention", "placeholder", "readOnly", "minHeight"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function classNames() {
  for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
    classes[_key] = arguments[_key];
  }

  return classes.filter(Boolean).join(' ');
}

var Button = /*#__PURE__*/_react.default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      active = _ref.active,
      reversed = _ref.reversed,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_react.default.createElement("span", _extends({}, props, {
    ref: ref,
    className: className
  }));
});

exports.Button = Button;

function MyEditor(_ref2) {
  var _ref2$initialValue = _ref2.initialValue,
      initialValue = _ref2$initialValue === void 0 ? null : _ref2$initialValue,
      onChange = _ref2.onChange,
      _ref2$mentions = _ref2.mentions,
      mentions = _ref2$mentions === void 0 ? [] : _ref2$mentions,
      onMention = _ref2.onMention,
      _ref2$placeholder = _ref2.placeholder,
      placeholder = _ref2$placeholder === void 0 ? 'Contenu de votre message' : _ref2$placeholder,
      _ref2$readOnly = _ref2.readOnly,
      readOnly = _ref2$readOnly === void 0 ? false : _ref2$readOnly,
      _ref2$minHeight = _ref2.minHeight,
      minHeight = _ref2$minHeight === void 0 ? 0 : _ref2$minHeight,
      props = _objectWithoutProperties(_ref2, _excluded2);

  // Editeur
  var editor = (0, _react.useMemo)(function () {
    return withMentions((0, _slateReact.withReact)((0, _slateHistory.withHistory)((0, _slate.createEditor)())));
  }, []); // Valeur du contenu

  var _useState = (0, _react.useState)(initialValue || [{
    children: [{
      text: ''
    }]
  }]),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1]; // Pour les mentions


  var ref = (0, _react.useRef)();

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      target = _useState4[0],
      setTarget = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      index = _useState6[0],
      setIndex = _useState6[1];

  var _useState7 = (0, _react.useState)(''),
      _useState8 = _slicedToArray(_useState7, 2),
      search = _useState8[0],
      setSearch = _useState8[1]; // Fonctions de render


  var renderElement = (0, _react.useCallback)(function (props) {
    return /*#__PURE__*/_react.default.createElement(Element, props);
  }, []);
  var renderLeaf = (0, _react.useCallback)(function (props) {
    return /*#__PURE__*/_react.default.createElement(Leaf, props);
  }, []);
  var users = mentions.filter(function (m) {
    return m.firstName.toLowerCase().startsWith(search.toLowerCase());
  }).slice(0, 10);
  var onKeyDown = (0, _react.useCallback)(function (event) {
    if (target) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          var prevIndex = index >= users.length - 1 ? 0 : index + 1;
          setIndex(prevIndex);
          break;

        case 'ArrowUp':
          event.preventDefault();
          var nextIndex = index <= 0 ? users.length - 1 : index - 1;
          setIndex(nextIndex);
          break;

        case 'Tab':
        case 'Enter':
          event.preventDefault();

          _slate.Transforms.select(editor, target);

          insertMention(editor, users[index]);

          if (onMention) {
            onMention(users[index]);
          }

          setTarget(null);
          break;

        case 'Escape':
          event.preventDefault();
          setTarget(null);
          break;

        default:
      }
    }
  }, [index, search, target]);
  (0, _react.useEffect)(function () {
    if (target && users.length > 0) {
      var el = ref.current;

      var domRange = _slateReact.ReactEditor.toDOMRange(editor, target);

      var rect = domRange.getBoundingClientRect();
      el.style.top = "".concat(rect.top + window.pageYOffset + 24, "px");
      el.style.left = "".concat(rect.left + window.pageXOffset, "px");
    }
  }, [users.length, editor, index, search, target]);
  (0, _react.useEffect)(function () {
    _slateReact.ReactEditor.focus(editor);

    var editorEl = document.querySelector('[data-slate-editor="true"]');
    editorEl.style.minHeight = "".concat(minHeight, "px");
  }, []);
  (0, _react.useEffect)(function () {
    if (readOnly) {
      setValue(readOnly);
    }
  }, [readOnly]);
  (0, _react.useEffect)(function () {
    if (onChange) {
      onChange(value);
    }
  }, [value]);
  (0, _react.useEffect)(function () {
    if (onChange && props.value && JSON.stringify(props.value) !== JSON.stringify(value)) {
      setValue(props.value);
    }
  }, [props.value]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classNames(!readOnly ? 'editor-bordered' : ''),
    style: {
      minHeight: minHeight + 85
    }
  }, /*#__PURE__*/_react.default.createElement(_slateReact.Slate, {
    editor: editor,
    value: value,
    onChange: function onChange(value) {
      setValue(value);
      var selection = editor.selection;

      if (selection && _slate.Range.isCollapsed(selection)) {
        var _Range$edges = _slate.Range.edges(selection),
            _Range$edges2 = _slicedToArray(_Range$edges, 1),
            start = _Range$edges2[0];

        var wordBefore = _slate.Editor.before(editor, start, {
          unit: 'word'
        });

        var before = wordBefore && _slate.Editor.before(editor, wordBefore);

        var beforeRange = before && _slate.Editor.range(editor, before, start);

        var beforeText = beforeRange && _slate.Editor.string(editor, beforeRange);

        var beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);

        var after = _slate.Editor.after(editor, start);

        var afterRange = _slate.Editor.range(editor, start, after);

        var afterText = _slate.Editor.string(editor, afterRange);

        var afterMatch = afterText.match(/^(\s|$)/);

        if (beforeMatch && afterMatch) {
          setTarget(beforeRange);
          setSearch(beforeMatch[1]);
          setIndex(0);
          return;
        }
      }

      setTarget(null);
    }
  }, !readOnly && /*#__PURE__*/_react.default.createElement("div", {
    className: "editor-toolbar"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(MarkButton, {
    format: "bold"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "editor-icon icon-bold"
  }, "\uE800")), /*#__PURE__*/_react.default.createElement(MarkButton, {
    format: "italic"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "editor-icon icon-italic"
  }, "\uE801")), /*#__PURE__*/_react.default.createElement(MarkButton, {
    format: "underline"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "editor-icon icon-underline"
  }, "\uF0CD")), /*#__PURE__*/_react.default.createElement(BlockButton, {
    format: "bulleted-list"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "editor-icon icon-list-bullet"
  }, "\uF0CA")), /*#__PURE__*/_react.default.createElement(BlockButton, {
    format: "numbered-list"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "editor-icon icon-list-numbered"
  }, "\uF0CB")))), /*#__PURE__*/_react.default.createElement(_slateReact.Editable, {
    readOnly: readOnly,
    className: readOnly ? '' : 'editor-editable',
    renderElement: renderElement,
    renderLeaf: renderLeaf,
    onKeyDown: onKeyDown,
    placeholder: placeholder
  }), target && users.length > 0 && /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    style: {
      top: '-9999px',
      left: '-9999px',
      position: 'fixed',
      zIndex: 100,
      padding: '3px',
      background: 'white',
      borderRadius: '4px',
      boxShadow: '0 1px 5px rgba(0,0,0,.2)'
    },
    "data-cy": "mentions-portal"
  }, users.map(function (user, i) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: user._id,
      style: {
        padding: '1px 3px',
        borderRadius: '3px',
        background: i === index ? '#B4D5FF' : 'transparent'
      }
    }, user.firstName, " ", user.lastName);
  }))));
}

var LIST_TYPES = ['numbered-list', 'bulleted-list'];

var isMarkActive = function isMarkActive(editor, format) {
  var marks = _slate.Editor.marks(editor);

  return marks ? marks[format] === true : false;
};

var isBlockActive = function isBlockActive(editor, format) {
  var selection = editor.selection;
  if (!selection) return false;

  var _Editor$nodes = _slate.Editor.nodes(editor, {
    at: _slate.Editor.unhangRange(editor, selection),
    match: function match(n) {
      return !_slate.Editor.isEditor(n) && _slate.Element.isElement(n) && n.type === format;
    }
  }),
      _Editor$nodes2 = _slicedToArray(_Editor$nodes, 1),
      match = _Editor$nodes2[0];

  return !!match;
};

var toggleBlock = function toggleBlock(editor, format) {
  var isActive = isBlockActive(editor, format);
  var isList = LIST_TYPES.includes(format);

  _slate.Transforms.unwrapNodes(editor, {
    match: function match(n) {
      return !_slate.Editor.isEditor(n) && _slate.Element.isElement(n) && LIST_TYPES.includes(n.type);
    },
    split: true
  });

  var newProperties = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format
  };

  _slate.Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    var block = {
      type: format,
      children: []
    };

    _slate.Transforms.wrapNodes(editor, block);
  }
};

var toggleMark = function toggleMark(editor, format) {
  var isActive = isMarkActive(editor, format);

  if (isActive) {
    _slate.Editor.removeMark(editor, format);
  } else {
    _slate.Editor.addMark(editor, format, true);
  }
};

var BlockButton = function BlockButton(_ref3) {
  var format = _ref3.format,
      children = _ref3.children;
  var editor = (0, _slateReact.useSlate)();
  var isActive = isBlockActive(editor, format);
  return /*#__PURE__*/_react.default.createElement(Button, {
    className: isActive ? 'isActive' : '',
    onMouseDown: function onMouseDown(event) {
      event.preventDefault();
      toggleBlock(editor, format);
    }
  }, children);
};

var MarkButton = function MarkButton(_ref4) {
  var format = _ref4.format,
      children = _ref4.children,
      className = _ref4.className;
  var editor = (0, _slateReact.useSlate)();
  var isActive = isMarkActive(editor, format);
  return /*#__PURE__*/_react.default.createElement(Button, {
    className: isActive ? 'isActive' : '',
    onMouseDown: function onMouseDown(event) {
      event.preventDefault();
      toggleMark(editor, format);
    }
  }, children);
};

var withMentions = function withMentions(editor) {
  var isInline = editor.isInline,
      isVoid = editor.isVoid;

  editor.isInline = function (element) {
    return element.type === 'mention' ? true : isInline(element);
  };

  editor.isVoid = function (element) {
    return element.type === 'mention' ? true : isVoid(element);
  };

  return editor;
};

var insertMention = function insertMention(editor, user) {
  var mention = {
    type: 'mention',
    user: user,
    children: [{
      text: ''
    }]
  };

  _slate.Transforms.insertNodes(editor, mention);

  _slate.Transforms.move(editor);
};

var Element = function Element(props) {
  var attributes = props.attributes,
      children = props.children,
      element = props.element;

  switch (element.type) {
    case 'mention':
      return /*#__PURE__*/_react.default.createElement(Mention, props);

    case 'block-quote':
      return /*#__PURE__*/_react.default.createElement("blockquote", attributes, children);

    case 'bulleted-list':
      return /*#__PURE__*/_react.default.createElement("ul", attributes, children);

    case 'heading-one':
      return /*#__PURE__*/_react.default.createElement("h1", attributes, children);

    case 'heading-two':
      return /*#__PURE__*/_react.default.createElement("h2", attributes, children);

    case 'list-item':
      return /*#__PURE__*/_react.default.createElement("li", attributes, children);

    case 'numbered-list':
      return /*#__PURE__*/_react.default.createElement("ol", attributes, children);

    default:
      return /*#__PURE__*/_react.default.createElement("div", attributes, children);
  }
};

var Leaf = function Leaf(_ref5) {
  var attributes = _ref5.attributes,
      children = _ref5.children,
      leaf = _ref5.leaf;

  if (leaf.bold) {
    children = /*#__PURE__*/_react.default.createElement("strong", null, children);
  }

  if (leaf.code) {
    children = /*#__PURE__*/_react.default.createElement("code", null, children);
  }

  if (leaf.italic) {
    children = /*#__PURE__*/_react.default.createElement("em", null, children);
  }

  if (leaf.underline) {
    children = /*#__PURE__*/_react.default.createElement("u", null, children);
  }

  return /*#__PURE__*/_react.default.createElement("span", attributes, children);
};

var Mention = function Mention(_ref6) {
  var attributes = _ref6.attributes,
      children = _ref6.children,
      element = _ref6.element;
  var selected = (0, _slateReact.useSelected)();
  var focused = (0, _slateReact.useFocused)();
  return /*#__PURE__*/_react.default.createElement("span", _extends({}, attributes, {
    contentEditable: false,
    "data-cy": "mention-".concat(element.user._id),
    style: {
      padding: '3px 3px 2px',
      margin: '0 1px',
      verticalAlign: 'baseline',
      display: 'inline-block',
      borderRadius: '4px',
      backgroundColor: '#eee',
      fontSize: '0.9em',
      boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none'
    }
  }), "@", element.user.firstName, " ", element.user.lastName, children);
};