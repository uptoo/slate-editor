"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;
exports.default = MyEditor;
var _react = _interopRequireWildcard(require("react"));
var _slate = require("slate");
var _slateHistory = require("slate-history");
var _slateReact = require("slate-react");
var _format_bold = _interopRequireDefault(require("./icons/format_bold"));
var _format_italic = _interopRequireDefault(require("./icons/format_italic"));
var _format_underlined = _interopRequireDefault(require("./icons/format_underlined"));
var _format_list_bulleted = _interopRequireDefault(require("./icons/format_list_bulleted"));
var _format_list_numbered = _interopRequireDefault(require("./icons/format_list_numbered"));
var _format_link = _interopRequireDefault(require("./icons/format_link"));
var _excluded = ["initialValue", "onChange", "mentions", "onMention", "tags", "placeholder", "readOnly", "hideButtons", "minHeight", "maxHeight", "extra", "preview", "isPreview", "autoFocus", "onBlur", "style", "id"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Button = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    ref: ref
  }, props, {
    style: _objectSpread({
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '30px',
      width: '30px',
      background: '#FFF',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginRight: '2px'
    }, props.style)
  }));
});
exports.Button = Button;
function MyEditor(_ref) {
  var _ref$initialValue = _ref.initialValue,
    initialValue = _ref$initialValue === void 0 ? null : _ref$initialValue,
    onChange = _ref.onChange,
    _ref$mentions = _ref.mentions,
    mentions = _ref$mentions === void 0 ? [] : _ref$mentions,
    onMention = _ref.onMention,
    _ref$tags = _ref.tags,
    tags = _ref$tags === void 0 ? [] : _ref$tags,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? 'Contenu de votre message' : _ref$placeholder,
    _ref$readOnly = _ref.readOnly,
    readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
    _ref$hideButtons = _ref.hideButtons,
    hideButtons = _ref$hideButtons === void 0 ? false : _ref$hideButtons,
    _ref$minHeight = _ref.minHeight,
    minHeight = _ref$minHeight === void 0 ? 0 : _ref$minHeight,
    maxHeight = _ref.maxHeight,
    extra = _ref.extra,
    preview = _ref.preview,
    isPreview = _ref.isPreview,
    _ref$autoFocus = _ref.autoFocus,
    autoFocus = _ref$autoFocus === void 0 ? true : _ref$autoFocus,
    onBlur = _ref.onBlur,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    id = _ref.id,
    props = _objectWithoutProperties(_ref, _excluded);
  // Editeur
  var editor = (0, _react.useMemo)(function () {
    return withLinks(withTags(withMentions((0, _slateReact.withReact)((0, _slateHistory.withHistory)((0, _slate.createEditor)())))));
  }, []);

  // Valeur du contenu
  var _useState = (0, _react.useState)(initialValue || [{
      children: [{
        text: ''
      }],
      type: 'paragraph'
    }]),
    _useState2 = _slicedToArray(_useState, 2),
    value = _useState2[0],
    setValue = _useState2[1];

  // Pour les mentions
  var mentionRef = (0, _react.useRef)();
  var _useState3 = (0, _react.useState)(),
    _useState4 = _slicedToArray(_useState3, 2),
    mentionTarget = _useState4[0],
    setMentionTarget = _useState4[1];
  var _useState5 = (0, _react.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    mentionIndex = _useState6[0],
    setMentionIndex = _useState6[1];
  var _useState7 = (0, _react.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    mentionSearch = _useState8[0],
    setMentionSearch = _useState8[1];

  // Pour les tags
  var tagRef = (0, _react.useRef)();
  var _useState9 = (0, _react.useState)(),
    _useState10 = _slicedToArray(_useState9, 2),
    tagTarget = _useState10[0],
    setTagTarget = _useState10[1];
  var _useState11 = (0, _react.useState)(0),
    _useState12 = _slicedToArray(_useState11, 2),
    tagIndex = _useState12[0],
    setTagIndex = _useState12[1];
  var _useState13 = (0, _react.useState)(''),
    _useState14 = _slicedToArray(_useState13, 2),
    tagSearch = _useState14[0],
    setTagSearch = _useState14[1];

  // Fonctions de render
  var renderElement = (0, _react.useCallback)(function (props) {
    return /*#__PURE__*/_react.default.createElement(Element, _extends({}, props, {
      tags: tags,
      isPreview: isPreview
    }));
  }, [tags, isPreview]);
  var renderLeaf = (0, _react.useCallback)(function (props) {
    return /*#__PURE__*/_react.default.createElement(Leaf, props);
  }, []);
  var users = mentions.filter(function (m) {
    var _m$firstName;
    return (_m$firstName = m.firstName) === null || _m$firstName === void 0 ? void 0 : _m$firstName.toLowerCase().startsWith(mentionSearch.toLowerCase());
  }).slice(0, 10);
  var availableTags = tags.filter(function (t) {
    return t.value.toLowerCase().startsWith(tagSearch.toLowerCase());
  }).slice(0, 10);
  var showButtons = !readOnly && !hideButtons;
  var onKeyDown = (0, _react.useCallback)(function (event) {
    if (mentionTarget) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          var prevIndex = mentionIndex >= users.length - 1 ? 0 : mentionIndex + 1;
          setMentionIndex(prevIndex);
          break;
        case 'ArrowUp':
          event.preventDefault();
          var nextIndex = mentionIndex <= 0 ? users.length - 1 : mentionIndex - 1;
          setMentionIndex(nextIndex);
          break;
        case 'Tab':
        case 'Enter':
          event.preventDefault();
          _slate.Transforms.select(editor, mentionTarget);
          insertMention(editor, users[mentionIndex]);
          if (onMention) {
            onMention(users[mentionIndex]);
          }
          setMentionTarget(null);
          break;
        case 'Escape':
          event.preventDefault();
          setMentionTarget(null);
          break;
        default:
      }
    }
    if (tagTarget) {
      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          var _prevIndex = tagIndex >= availableTags.length - 1 ? 0 : tagIndex + 1;
          setTagIndex(_prevIndex);
          break;
        case 'ArrowLeft':
          event.preventDefault();
          var _nextIndex = tagIndex <= 0 ? availableTags.length - 1 : tagIndex - 1;
          setTagIndex(_nextIndex);
          break;
        case 'Tab':
        case 'Enter':
          event.preventDefault();
          _slate.Transforms.select(editor, tagTarget);
          insertTag(editor, availableTags[tagIndex]);
          setTagTarget(null);
          break;
        case 'Escape':
          event.preventDefault();
          setTagTarget(null);
          break;
        default:
      }
    }
    if (!event.ctrlKey) {
      return;
    }
    switch (event.key) {
      // When "B" is pressed, bold the text in the selection.
      case 'b':
        {
          event.preventDefault();
          toggleMark(editor, 'bold');
          break;
        }
      case 'u':
        {
          event.preventDefault();
          toggleMark(editor, 'underline');
          break;
        }
      case 'i':
        {
          event.preventDefault();
          toggleMark(editor, 'italic');
          break;
        }
      default:
        break;
    }
  }, [mentionIndex, mentionSearch, mentionTarget, tagIndex, tagSearch, tagTarget]);
  (0, _react.useEffect)(function () {
    if (mentionTarget && users.length > 0) {
      var el = mentionRef.current;
      var domRange = _slateReact.ReactEditor.toDOMRange(editor, mentionTarget);
      var rect = domRange.getBoundingClientRect();
      el.style.top = "".concat(rect.top + window.pageYOffset + 24, "px");
      el.style.left = "".concat(rect.left + window.pageXOffset, "px");
    }
  }, [users.length, editor, mentionIndex, mentionSearch, mentionTarget]);

  // useEffect(() => {
  //   if (tagTarget && availableTags.length > 0) {
  //     const el = tagRef.current
  //     const domRange = ReactEditor.toDOMRange(editor, tagTarget)
  //     const rect = domRange.getBoundingClientRect()
  //     el.style.top = `${rect.top + window.pageYOffset + 24}px`
  //     el.style.left = `${rect.left + window.pageXOffset}px`
  //   }
  // }, [availableTags.length, editor, tagIndex, tagSearch, tagTarget])

  (0, _react.useEffect)(function () {
    if (autoFocus) {
      _slateReact.ReactEditor.focus(editor);
    }
    var element = document.querySelector('[data-slate-editor="true"]');
    if (element !== null && element !== void 0 && element.style) {
      // element.style.minHeight = `${minHeight}px`
      element.style.overflowY = 'auto';
      element.style.overflowX = 'hidden';
      if (maxHeight) {
        element.style.maxHeight = "".concat(maxHeight, "px");
      }
    }
  }, [id]);
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
    if (props.value && JSON.stringify(props.value) !== JSON.stringify(value)) {
      setValue(props.value);
    }
  }, [props.value]);
  editor.children = value;
  return /*#__PURE__*/_react.default.createElement("div", {
    onBlur: onBlur
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
        var beforeMention = beforeText && beforeText.match(/^@(\w+)$/);
        var beforeTag = beforeText && beforeText.match(/^{(\w+)$/);
        var after = _slate.Editor.after(editor, start);
        var afterRange = _slate.Editor.range(editor, start, after);
        var afterText = _slate.Editor.string(editor, afterRange);
        var afterMatch = afterText.match(/^(\s|$)/);
        if (beforeMention && afterMatch) {
          setMentionTarget(beforeRange);
          setMentionSearch(beforeMention[1]);
          setMentionIndex(0);
          return;
        }
        if (beforeTag && afterMatch) {
          setTagTarget(beforeRange);
          setTagSearch(beforeTag[1]);
          setTagIndex(0);
          return;
        }
      }
      setMentionTarget(null);
      setTagTarget(null);
    }
  }, (showButtons || preview) && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      // borderBottom: '1px #CCC solid',
      display: 'flex',
      alignItems: 'center'
    }
  }, preview && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      padding: '8px 12px',
      height: '100%',
      // minHeight: '47px',
      borderRight: '1px #CCC solid',
      alignItems: 'center'
    }
  }, preview), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: '0px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, showButtons && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(MarkButton, {
    format: "bold"
  }, /*#__PURE__*/_react.default.createElement(_format_bold.default, null)), /*#__PURE__*/_react.default.createElement(MarkButton, {
    format: "italic"
  }, /*#__PURE__*/_react.default.createElement(_format_italic.default, null)), /*#__PURE__*/_react.default.createElement(MarkButton, {
    format: "underline"
  }, /*#__PURE__*/_react.default.createElement(_format_underlined.default, null)), /*#__PURE__*/_react.default.createElement(BlockButton, {
    format: "bulleted-list"
  }, /*#__PURE__*/_react.default.createElement(_format_list_bulleted.default, null)), /*#__PURE__*/_react.default.createElement(BlockButton, {
    format: "numbered-list"
  }, /*#__PURE__*/_react.default.createElement(_format_list_numbered.default, null)), /*#__PURE__*/_react.default.createElement(MarkButton, {
    format: "link"
  }, /*#__PURE__*/_react.default.createElement(AddLinkButton, {
    format: "link"
  })))), extra)), /*#__PURE__*/_react.default.createElement(_slateReact.Editable, {
    readOnly: readOnly,
    renderElement: renderElement,
    renderLeaf: renderLeaf,
    onKeyDown: onKeyDown,
    placeholder: placeholder,
    style: {
      padding: !readOnly && '4px',
      minHeight: minHeight && "".concat(minHeight, "px")
    }
  }), mentionTarget && users.length > 0 && /*#__PURE__*/_react.default.createElement("div", {
    ref: mentionRef,
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
        cursor: 'pointer',
        padding: '1px 3px',
        borderRadius: '3px',
        background: i === mentionIndex ? '#B4D5FF' : 'transparent'
      },
      onMouseEnter: function onMouseEnter() {
        return setMentionIndex(i);
      },
      onClick: function onClick() {
        _slate.Transforms.select(editor, mentionTarget);
        insertMention(editor, user);
        if (onMention) {
          onMention(user);
        }
        setMentionTarget(null);
      }
    }, user.firstName, " ", user.lastName);
  })), tagTarget && /*#__PURE__*/_react.default.createElement("div", {
    ref: tagRef,
    style: {
      padding: '3px',
      background: 'white',
      borderRadius: '4px',
      display: 'flex'
    },
    "data-cy": "tags-portal"
  }, availableTags.map(function (tag, i) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: tag.value,
      style: {
        padding: '1px 3px',
        borderRadius: '3px',
        background: i === tagIndex ? '#B4D5FF' : 'transparent'
      }
    }, "{", tag.value, "}");
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
  console.log('isActive', isActive);
  if (isActive) {
    _slate.Editor.removeMark(editor, format);
  } else {
    _slate.Editor.addMark(editor, format, true);
  }
};
var BlockButton = function BlockButton(_ref2) {
  var format = _ref2.format,
    children = _ref2.children;
  var editor = (0, _slateReact.useSlate)();
  var isActive = isBlockActive(editor, format);
  return /*#__PURE__*/_react.default.createElement(Button, {
    style: {
      background: isActive && '#eeeeee'
    },
    onMouseDown: function onMouseDown(event) {
      event.preventDefault();
      toggleBlock(editor, format);
    }
  }, children);
};
var MarkButton = function MarkButton(_ref3) {
  var format = _ref3.format,
    children = _ref3.children,
    className = _ref3.className;
  var editor = (0, _slateReact.useSlate)();
  var isActive = isMarkActive(editor, format);
  return /*#__PURE__*/_react.default.createElement(Button, {
    style: {
      background: isActive && '#eeeeee'
    },
    onMouseDown: function onMouseDown(event) {
      event.preventDefault();
      toggleMark(editor, format);
    }
  }, children);
};
var withLinks = function withLinks(editor) {
  var isInline = editor.isInline;
  editor.isInline = function (element) {
    return element.type === 'link' ? true : isInline(element);
  };
  return editor;
};
var withMentions = function withMentions(editor) {
  var isInline = editor.isInline,
    isVoid = editor.isVoid;
  editor.isInline = function (element) {
    return ['mention'].includes(element.type) ? true : isInline(element);
  };
  editor.isVoid = function (element) {
    return element.type === 'mention' ? true : isVoid(element);
  };
  return editor;
};
var insertLink = function insertLink(editor, url) {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};
var unwrapLink = function unwrapLink(editor) {
  _slate.Transforms.unwrapNodes(editor, {
    match: function match(n) {
      return !_slate.Editor.isEditor(n) && _slate.Element.isElement(n) && n.type === 'link';
    }
  });
};
var wrapLink = function wrapLink(editor, url) {
  var isActive = isMarkActive(editor, 'link');
  if (isActive) {
    unwrapLink(editor);
  }
  var selection = editor.selection,
    insertBreak = editor.insertBreak;
  var isCollapsed = selection && _slate.Range.isCollapsed(selection);
  var link = {
    type: 'link',
    url: url,
    children: [{
      text: url
    }]
  };
  if (isCollapsed) {
    _slate.Transforms.insertNodes(editor, link);
  } else {
    _slate.Transforms.wrapNodes(editor, link, {
      split: true
    });
    _slate.Transforms.collapse(editor, {
      edge: 'end'
    });
  }
  editor.deleteForward();
  editor.insertText(' ');
  toggleMark(editor, 'link');
};
var AddLinkButton = function AddLinkButton(_ref4) {
  var format = _ref4.format;
  var editor = (0, _slateReact.useSlate)();
  var isActive = isMarkActive(editor, format);
  return /*#__PURE__*/_react.default.createElement(Button, {
    onMouseDown: function onMouseDown(event) {
      if (!isActive) {
        event.preventDefault();
        var url = window.prompt('Entrer l\'url du lien:');
        if (!url) return;
        insertLink(editor, url);
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_format_link.default, null));
};
var withTags = function withTags(editor) {
  var isInline = editor.isInline,
    isVoid = editor.isVoid,
    markableVoid = editor.markableVoid;
  editor.isInline = function (element) {
    return element.type === 'tag' ? true : isInline(element);
  };
  editor.isVoid = function (element) {
    return element.type === 'tag' ? true : isVoid(element);
  };
  editor.markableVoid = function (element) {
    return element.type === 'tag' || markableVoid(element);
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
var insertTag = function insertTag(editor, tag) {
  var node = {
    type: 'tag',
    children: [{
      text: "{".concat(tag.value, "}")
    }]
  };
  _slate.Transforms.insertNodes(editor, node);
  _slate.Transforms.move(editor);
};
var Element = function Element(props) {
  var attributes = props.attributes,
    children = props.children,
    element = props.element;
  switch (element.type) {
    case 'mention':
      return /*#__PURE__*/_react.default.createElement(Mention, props);
    case 'tag':
      return /*#__PURE__*/_react.default.createElement(Tag, props);
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
      return /*#__PURE__*/_react.default.createElement("ol", _extends({
        style: {
          listStyleType: 'decimal',
          listStylePosition: 'inside'
        }
      }, attributes), children);
    case 'link':
      return /*#__PURE__*/_react.default.createElement(LinkComponent, props);
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
var LinkComponent = function LinkComponent(_ref6) {
  var attributes = _ref6.attributes,
    children = _ref6.children,
    element = _ref6.element;
  return /*#__PURE__*/_react.default.createElement("a", _extends({}, attributes, {
    href: element.url,
    target: "_blank",
    rel: "noreferrer noopener"
  }), children);
};
var Mention = function Mention(_ref7) {
  var attributes = _ref7.attributes,
    children = _ref7.children,
    element = _ref7.element;
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
var Tag = function Tag(_ref8) {
  var attributes = _ref8.attributes,
    children = _ref8.children,
    element = _ref8.element,
    _ref8$tags = _ref8.tags,
    tags = _ref8$tags === void 0 ? [] : _ref8$tags,
    isPreview = _ref8.isPreview;
  var selected = (0, _slateReact.useSelected)();
  var focused = (0, _slateReact.useFocused)();
  var found = tags.find(function (t) {
    return "{".concat(t.value, "}") === element.children[0].text;
  });
  var style = {
    padding: '3px 3px 2px',
    margin: '0 1px',
    verticalAlign: 'baseline',
    display: 'inline-block',
    borderRadius: '4px',
    backgroundColor: found ? '#cbf4ca' : '#f4caca',
    fontSize: '0.9em',
    boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none'
  };
  if (element.children[0].bold) {
    style.fontWeight = 'bold';
  }
  if (element.children[0].italic) {
    style.fontStyle = 'italic';
  }
  if (element.children[0].underline) {
    style.textDecoration = 'underline';
  }
  return /*#__PURE__*/_react.default.createElement("span", _extends({}, attributes, {
    contentEditable: false,
    "data-cy": "tag-".concat(children),
    style: style
  }), isPreview && found ? found.currentText : element.children[0].text, children);
};