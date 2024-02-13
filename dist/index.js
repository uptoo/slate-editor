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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Button = /*#__PURE__*/_react.default.forwardRef((props, ref) => /*#__PURE__*/_react.default.createElement("span", _extends({
  ref: ref
}, props, {
  style: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30px',
    width: '30px',
    background: '#FFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '2px',
    ...props.style
  }
})));
exports.Button = Button;
function MyEditor(_ref) {
  let {
    initialValue = null,
    onChange,
    mentions = [],
    onMention,
    tags = [],
    placeholder = 'Contenu de votre message',
    readOnly = false,
    hideButtons = false,
    minHeight = 0,
    maxHeight,
    extra,
    preview,
    isPreview,
    autoFocus = true,
    // Focus à l'initialisation
    onBlur,
    style = {},
    id,
    ...props
  } = _ref;
  // Editeur
  const editor = (0, _react.useMemo)(() => withLinks(withTags(withMentions((0, _slateReact.withReact)((0, _slateHistory.withHistory)((0, _slate.createEditor)()))))), []);

  // Valeur du contenu
  const [value, setValue] = (0, _react.useState)(initialValue || [{
    children: [{
      text: ''
    }],
    type: 'paragraph'
  }]);

  // Pour les mentions
  const mentionRef = (0, _react.useRef)();
  const [mentionTarget, setMentionTarget] = (0, _react.useState)();
  const [mentionIndex, setMentionIndex] = (0, _react.useState)(0);
  const [mentionSearch, setMentionSearch] = (0, _react.useState)('');

  // Pour les tags
  const tagRef = (0, _react.useRef)();
  const [tagTarget, setTagTarget] = (0, _react.useState)();
  const [tagIndex, setTagIndex] = (0, _react.useState)(0);
  const [tagSearch, setTagSearch] = (0, _react.useState)('');

  // Fonctions de render
  const renderElement = (0, _react.useCallback)(props => /*#__PURE__*/_react.default.createElement(Element, _extends({}, props, {
    tags: tags,
    isPreview: isPreview
  })), [tags, isPreview]);
  const renderLeaf = (0, _react.useCallback)(props => /*#__PURE__*/_react.default.createElement(Leaf, props), []);
  const users = mentions.filter(m => {
    var _m$firstName;
    return (_m$firstName = m.firstName) === null || _m$firstName === void 0 ? void 0 : _m$firstName.toLowerCase().startsWith(mentionSearch.toLowerCase());
  }).slice(0, 10);
  const availableTags = tags.filter(t => t.value.toLowerCase().startsWith(tagSearch.toLowerCase())).slice(0, 10);
  const showButtons = !readOnly && !hideButtons;
  const onKeyDown = (0, _react.useCallback)(event => {
    if (mentionTarget) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          const prevIndex = mentionIndex >= users.length - 1 ? 0 : mentionIndex + 1;
          setMentionIndex(prevIndex);
          break;
        case 'ArrowUp':
          event.preventDefault();
          const nextIndex = mentionIndex <= 0 ? users.length - 1 : mentionIndex - 1;
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
          const prevIndex = tagIndex >= availableTags.length - 1 ? 0 : tagIndex + 1;
          setTagIndex(prevIndex);
          break;
        case 'ArrowLeft':
          event.preventDefault();
          const nextIndex = tagIndex <= 0 ? availableTags.length - 1 : tagIndex - 1;
          setTagIndex(nextIndex);
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
          _slate.Editor.addMark(editor, 'bold', true);
          break;
        }
      case 'u':
        {
          event.preventDefault();
          _slate.Editor.addMark(editor, 'underline', true);
          break;
        }
      case 'i':
        {
          event.preventDefault();
          _slate.Editor.addMark(editor, 'italic', true);
          break;
        }
      default:
        break;
    }
  }, [mentionIndex, mentionSearch, mentionTarget, tagIndex, tagSearch, tagTarget]);
  (0, _react.useEffect)(() => {
    if (mentionTarget && users.length > 0) {
      const el = mentionRef.current;
      const domRange = _slateReact.ReactEditor.toDOMRange(editor, mentionTarget);
      const rect = domRange.getBoundingClientRect();
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

  (0, _react.useEffect)(() => {
    if (autoFocus) {
      _slateReact.ReactEditor.focus(editor);
    }
    const element = document.querySelector('[data-slate-editor="true"]');
    if (element !== null && element !== void 0 && element.style) {
      // element.style.minHeight = `${minHeight}px`
      element.style.overflowY = 'auto';
      element.style.overflowX = 'hidden';
      if (maxHeight) {
        element.style.maxHeight = "".concat(maxHeight, "px");
      }
    }
  }, [id]);
  (0, _react.useEffect)(() => {
    if (readOnly) {
      setValue(readOnly);
    }
  }, [readOnly]);
  (0, _react.useEffect)(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value]);
  (0, _react.useEffect)(() => {
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
    onChange: value => {
      setValue(value);
      const {
        selection
      } = editor;
      if (selection && _slate.Range.isCollapsed(selection)) {
        const [start] = _slate.Range.edges(selection);
        const wordBefore = _slate.Editor.before(editor, start, {
          unit: 'word'
        });
        const before = wordBefore && _slate.Editor.before(editor, wordBefore);
        const beforeRange = before && _slate.Editor.range(editor, before, start);
        const beforeText = beforeRange && _slate.Editor.string(editor, beforeRange);
        const beforeMention = beforeText && beforeText.match(/^@(\w+)$/);
        const beforeTag = beforeText && beforeText.match(/^{(\w+)$/);
        const after = _slate.Editor.after(editor, start);
        const afterRange = _slate.Editor.range(editor, start, after);
        const afterText = _slate.Editor.string(editor, afterRange);
        const afterMatch = afterText.match(/^(\s|$)/);
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
  }, users.map((user, i) => /*#__PURE__*/_react.default.createElement("div", {
    key: user._id,
    style: {
      padding: '1px 3px',
      borderRadius: '3px',
      background: i === mentionIndex ? '#B4D5FF' : 'transparent'
    }
  }, user.firstName, " ", user.lastName))), tagTarget && /*#__PURE__*/_react.default.createElement("div", {
    ref: tagRef,
    style: {
      padding: '3px',
      background: 'white',
      borderRadius: '4px',
      display: 'flex'
    },
    "data-cy": "tags-portal"
  }, availableTags.map((tag, i) => /*#__PURE__*/_react.default.createElement("div", {
    key: tag.value,
    style: {
      padding: '1px 3px',
      borderRadius: '3px',
      background: i === tagIndex ? '#B4D5FF' : 'transparent'
    }
  }, "{", tag.value, "}")))));
}
const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const isMarkActive = (editor, format) => {
  const marks = _slate.Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
const isBlockActive = (editor, format) => {
  const {
    selection
  } = editor;
  if (!selection) return false;
  const [match] = _slate.Editor.nodes(editor, {
    at: _slate.Editor.unhangRange(editor, selection),
    match: n => !_slate.Editor.isEditor(n) && _slate.Element.isElement(n) && n.type === format
  });
  return !!match;
};
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);
  _slate.Transforms.unwrapNodes(editor, {
    match: n => !_slate.Editor.isEditor(n) && _slate.Element.isElement(n) && LIST_TYPES.includes(n.type),
    split: true
  });
  const newProperties = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format
  };
  _slate.Transforms.setNodes(editor, newProperties);
  if (!isActive && isList) {
    const block = {
      type: format,
      children: []
    };
    _slate.Transforms.wrapNodes(editor, block);
  }
};
const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  console.log('isActive', isActive);
  if (isActive) {
    _slate.Editor.removeMark(editor, format);
  } else {
    _slate.Editor.addMark(editor, format, true);
  }
};
const BlockButton = _ref2 => {
  let {
    format,
    children
  } = _ref2;
  const editor = (0, _slateReact.useSlate)();
  const isActive = isBlockActive(editor, format);
  return /*#__PURE__*/_react.default.createElement(Button, {
    style: {
      background: isActive && '#eeeeee'
    },
    onMouseDown: event => {
      event.preventDefault();
      toggleBlock(editor, format);
    }
  }, children);
};
const MarkButton = _ref3 => {
  let {
    format,
    children,
    className
  } = _ref3;
  const editor = (0, _slateReact.useSlate)();
  const isActive = isMarkActive(editor, format);
  return /*#__PURE__*/_react.default.createElement(Button, {
    style: {
      background: isActive && '#eeeeee'
    },
    onMouseDown: event => {
      event.preventDefault();
      toggleMark(editor, format);
    }
  }, children);
};
const withLinks = editor => {
  const {
    isInline
  } = editor;
  editor.isInline = element => element.type === 'link' ? true : isInline(element);
  return editor;
};
const withMentions = editor => {
  const {
    isInline,
    isVoid
  } = editor;
  editor.isInline = element => ['mention'].includes(element.type) ? true : isInline(element);
  editor.isVoid = element => element.type === 'mention' ? true : isVoid(element);
  return editor;
};
const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};
const unwrapLink = editor => {
  _slate.Transforms.unwrapNodes(editor, {
    match: n => !_slate.Editor.isEditor(n) && _slate.Element.isElement(n) && n.type === 'link'
  });
};
const wrapLink = (editor, url) => {
  const isActive = isMarkActive(editor, 'link');
  if (isActive) {
    unwrapLink(editor);
  }
  const {
    selection,
    insertBreak
  } = editor;
  const isCollapsed = selection && _slate.Range.isCollapsed(selection);
  const link = {
    type: 'link',
    url,
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
const AddLinkButton = _ref4 => {
  let {
    format
  } = _ref4;
  const editor = (0, _slateReact.useSlate)();
  const isActive = isMarkActive(editor, format);
  return /*#__PURE__*/_react.default.createElement(Button, {
    onMouseDown: event => {
      if (!isActive) {
        event.preventDefault();
        const url = window.prompt('Entrer l\'url du lien:');
        if (!url) return;
        insertLink(editor, url);
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_format_link.default, null));
};
const withTags = editor => {
  const {
    isInline,
    isVoid,
    markableVoid
  } = editor;
  editor.isInline = element => element.type === 'tag' ? true : isInline(element);
  editor.isVoid = element => element.type === 'tag' ? true : isVoid(element);
  editor.markableVoid = element => element.type === 'tag' || markableVoid(element);
  return editor;
};
const insertMention = (editor, user) => {
  const mention = {
    type: 'mention',
    user,
    children: [{
      text: ''
    }]
  };
  _slate.Transforms.insertNodes(editor, mention);
  _slate.Transforms.move(editor);
};
const insertTag = (editor, tag) => {
  const node = {
    type: 'tag',
    children: [{
      text: "{".concat(tag.value, "}")
    }]
  };
  _slate.Transforms.insertNodes(editor, node);
  _slate.Transforms.move(editor);
};
const Element = props => {
  const {
    attributes,
    children,
    element
  } = props;
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
const Leaf = _ref5 => {
  let {
    attributes,
    children,
    leaf
  } = _ref5;
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
const LinkComponent = _ref6 => {
  let {
    attributes,
    children,
    element
  } = _ref6;
  return /*#__PURE__*/_react.default.createElement("a", _extends({}, attributes, {
    href: element.url,
    target: "_blank",
    rel: "noreferrer noopener"
  }), children);
};
const Mention = _ref7 => {
  let {
    attributes,
    children,
    element
  } = _ref7;
  const selected = (0, _slateReact.useSelected)();
  const focused = (0, _slateReact.useFocused)();
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
const Tag = _ref8 => {
  let {
    attributes,
    children,
    element,
    tags = [],
    isPreview
  } = _ref8;
  const selected = (0, _slateReact.useSelected)();
  const focused = (0, _slateReact.useFocused)();
  const found = tags.find(t => "{".concat(t.value, "}") === element.children[0].text);
  const style = {
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