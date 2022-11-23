import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createEditor, Editor, Element as SlateElement, Range, Transforms } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, ReactEditor, Slate, useFocused, useSelected, useSlate, withReact } from 'slate-react'

import Bold from './icons/format_bold'
import Italic from './icons/format_italic'
import Underlined from './icons/format_underlined'
import ListBulleted from './icons/format_list_bulleted'
import ListNumbered from './icons/format_list_numbered'

export const Button = React.forwardRef((props, ref) => (
  <span
    ref={ref}
    {...props}
    style={{
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
      ...props.style,
    }}
  />
))

export default function MyEditor({
  initialValue = null,
  onChange,
  mentions = [],
  onMention,
  tags = [],
  placeholder = 'Contenu de votre message',
  readOnly = false,
  minHeight = 0,
  maxHeight,
  extra,
  ...props
}) {
  // Editeur
  const editor = useMemo(() => withTags(withMentions(withReact(withHistory(createEditor())))), [])

  // Valeur du contenu
  const [value, setValue] = useState(initialValue || [{ children: [{ text: '' }] }])

  // Pour les mentions
  const mentionRef = useRef()
  const [mentionTarget, setMentionTarget] = useState()
  const [mentionIndex, setMentionIndex] = useState(0)
  const [mentionSearch, setMentionSearch] = useState('')

  // Pour les tags
  const tagRef = useRef()
  const [tagTarget, setTagTarget] = useState()
  const [tagIndex, setTagIndex] = useState(0)
  const [tagSearch, setTagSearch] = useState('')

  // Fonctions de render
  const renderElement = useCallback(props => <Element {...props} tags={tags} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const users = mentions.filter((m) =>
    m.firstName.toLowerCase().startsWith(mentionSearch.toLowerCase())
  ).slice(0, 10)

  const availableTags = tags.filter((t) =>
    t.value.toLowerCase().startsWith(tagSearch.toLowerCase())
  ).slice(0, 10)

  const onKeyDown = useCallback(
    event => {
      if (mentionTarget) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault()
            const prevIndex = mentionIndex >= users.length - 1 ? 0 : mentionIndex + 1
            setMentionIndex(prevIndex)
            break
          case 'ArrowUp':
            event.preventDefault()
            const nextIndex = mentionIndex <= 0 ? users.length - 1 : mentionIndex - 1
            setMentionIndex(nextIndex)
            break
          case 'Tab':
          case 'Enter':
            event.preventDefault()
            Transforms.select(editor, mentionTarget)
            insertMention(editor, users[mentionIndex])
            if (onMention) {
              onMention(users[mentionIndex])
            }
            setMentionTarget(null)
            break
          case 'Escape':
            event.preventDefault()
            setMentionTarget(null)
            break
          default:
        }
      }

      if (tagTarget) {
        switch (event.key) {
          case 'ArrowRight':
            event.preventDefault()
            const prevIndex = tagIndex >= availableTags.length - 1 ? 0 : tagIndex + 1
            setTagIndex(prevIndex)
            break
          case 'ArrowLeft':
            event.preventDefault()
            const nextIndex = tagIndex <= 0 ? availableTags.length - 1 : tagIndex - 1
            setTagIndex(nextIndex)
            break
          case 'Tab':
          case 'Enter':
            event.preventDefault()
            Transforms.select(editor, tagTarget)
            insertTag(editor, availableTags[tagIndex])
            setTagTarget(null)
            break
          case 'Escape':
            event.preventDefault()
            setTagTarget(null)
            break
          default:
        }
      }
    },
    [mentionIndex, mentionSearch, mentionTarget, tagIndex, tagSearch, tagTarget]
  )

  useEffect(() => {
    if (mentionTarget && users.length > 0) {
      const el = mentionRef.current
      const domRange = ReactEditor.toDOMRange(editor, mentionTarget)
      const rect = domRange.getBoundingClientRect()
      el.style.top = `${rect.top + window.pageYOffset + 24}px`
      el.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [users.length, editor, mentionIndex, mentionSearch, mentionTarget])


  // useEffect(() => {
  //   if (tagTarget && availableTags.length > 0) {
  //     const el = tagRef.current
  //     const domRange = ReactEditor.toDOMRange(editor, tagTarget)
  //     const rect = domRange.getBoundingClientRect()
  //     el.style.top = `${rect.top + window.pageYOffset + 24}px`
  //     el.style.left = `${rect.left + window.pageXOffset}px`
  //   }
  // }, [availableTags.length, editor, tagIndex, tagSearch, tagTarget])

  useEffect(() => {
    ReactEditor.focus(editor)
    const element = document.querySelector(
      '[data-slate-editor="true"]',
    )
    if (element?.style) {
      element.style.minHeight = `${minHeight}px`
      if (maxHeight) {
        element.style.maxHeight = `${maxHeight}px`
      }
    }
  }, [])

  useEffect(() => {
    if (readOnly) {
      setValue(readOnly)
    }
  }, [readOnly])

  useEffect(() => {
    if (onChange) {
      onChange(value)
    }
  }, [value])

  useEffect(() => {
    if (onChange && props.value && JSON.stringify(props.value) !== JSON.stringify(value)) {
      setValue(props.value)
    }
  }, [props.value])

  return (
    <div 
      style={{
        minHeight: minHeight + 85,
        border: !readOnly && '1px #CCC solid',
        background: !readOnly && '#fff',
        borderRadius: '4px'
      }}
    >
      <Slate
        editor={editor}
        value={value} 
        onChange={value => {
          setValue(value)
          const { selection } = editor

          if (selection && Range.isCollapsed(selection)) {
            const [start] = Range.edges(selection)
            const wordBefore = Editor.before(editor, start, { unit: 'word' })
            const before = wordBefore && Editor.before(editor, wordBefore)
            const beforeRange = before && Editor.range(editor, before, start)
            const beforeText = beforeRange && Editor.string(editor, beforeRange)

            const beforeMention = beforeText && beforeText.match(/^@(\w+)$/)
            const beforeTag = beforeText && beforeText.match(/^{(\w+)$/)

            const after = Editor.after(editor, start)
            const afterRange = Editor.range(editor, start, after)
            const afterText = Editor.string(editor, afterRange)
            const afterMatch = afterText.match(/^(\s|$)/)

            if (beforeMention && afterMatch) {
              setMentionTarget(beforeRange)
              setMentionSearch(beforeMention[1])
              setMentionIndex(0)
              return
            }

            if (beforeTag && afterMatch) {
              setTagTarget(beforeRange)
              setTagSearch(beforeTag[1])
              setTagIndex(0)
              return
            }
          }

          setMentionTarget(null)
          setTagTarget(null)
        }}
      >
        {!readOnly && (
          <div
            style={{
              borderBottom: '1px #CCC solid',
              padding: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <MarkButton format="bold">
                <Bold />
              </MarkButton>
              <MarkButton format="italic">
                <Italic />
              </MarkButton>
              <MarkButton format="underline">
                <Underlined />
              </MarkButton>
              <BlockButton format="bulleted-list">
                <ListBulleted />
              </BlockButton>
              <BlockButton format="numbered-list">
                <ListNumbered />
              </BlockButton>
            </div>
            {extra}
          </div>
        )}
        <Editable
          readOnly={readOnly}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          style={{
            padding: !readOnly && '1em'
          }}
        />
        {mentionTarget && users.length > 0 && (
          <div
            ref={mentionRef}
            style={{
              top: '-9999px',
              left: '-9999px',
              position: 'fixed',
              zIndex: 100,
              padding: '3px',
              background: 'white',
              borderRadius: '4px',
              boxShadow: '0 1px 5px rgba(0,0,0,.2)',
            }}
            data-cy="mentions-portal"
          >
            {users.map((user, i) => (
              <div
                key={user._id}
                style={{
                  padding: '1px 3px',
                  borderRadius: '3px',
                  background: i === mentionIndex ? '#B4D5FF' : 'transparent',
                }}
              >
                {user.firstName} {user.lastName}
              </div>
            ))}
          </div>
        )}
        {tagTarget && (
          <div
            ref={tagRef}
            style={{
              padding: '3px',
              background: 'white',
              borderRadius: '4px',
              display: 'flex'
            }}
            data-cy="tags-portal"
          >
            {availableTags.map((tag, i) => (
              <div
                key={tag.value}
                style={{
                  padding: '1px 3px',
                  borderRadius: '3px',
                  background: i === tagIndex ? '#B4D5FF' : 'transparent',
                }}
              >
                &#123;{tag.value}&#125;
              </div>
            ))}
          </div>
        )}
      </Slate>
    </div>
  )
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const isBlockActive = (editor, format) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  })

  return !!match
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  })

  const newProperties = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }

  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const BlockButton = ({ format, children }) => {
  const editor = useSlate()
  const isActive = isBlockActive(editor, format)

  return (
    <Button
      style={{
        background: isActive && '#eeeeee'
      }}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {children}
    </Button>
  )
}

const MarkButton = ({ format, children, className }) => {
  const editor = useSlate()
  const isActive = isMarkActive(editor, format)
  return (
    <Button
      style={{
        background: isActive && '#eeeeee'
      }}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      {children}
    </Button>
  )
}

const withMentions = editor => {
  const { isInline, isVoid } = editor

  editor.isInline = element => {
    return element.type === 'mention' ? true : isInline(element)
  }

  editor.isVoid = element => {
    return element.type === 'mention' ? true : isVoid(element)
  }

  return editor
}

const withTags = editor => {
  const { isInline, isVoid } = editor

  editor.isInline = element => {
    return element.type === 'tag' ? true : isInline(element)
  }

  editor.isVoid = element => {
    return element.type === 'tag' ? true : isVoid(element)
  }

  return editor
}

const insertMention = (editor, user) => {
  const mention = {
    type: 'mention',
    user,
    children: [{ text: '' }],
  }
  Transforms.insertNodes(editor, mention)
  Transforms.move(editor)
}

const insertTag = (editor, tag) => {
  const node = {
    type: 'tag',
    children: [{ text: `{${tag.value}}` }],
  }
  Transforms.insertNodes(editor, node)
  Transforms.move(editor)
}

const Element = (props) => {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'mention':
      return <Mention {...props} />
    case 'tag':
      return <Tag {...props} />
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <div {...attributes}>{children}</div>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const Mention = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  return (
    <span
      {...attributes}
      contentEditable={false}
      data-cy={`mention-${element.user._id}`}
      style={{
        padding: '3px 3px 2px',
        margin: '0 1px',
        verticalAlign: 'baseline',
        display: 'inline-block',
        borderRadius: '4px',
        backgroundColor: '#eee',
        fontSize: '0.9em',
        boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
      }}
    >
      @{element.user.firstName} {element.user.lastName}
      {children}
    </span>
  )
}

const Tag = ({ attributes, children, element, tags }) => {
  const selected = useSelected()
  const focused = useFocused()
  return (
    <span
      {...attributes}
      contentEditable={false}
      data-cy={`tag-${children}`}
      style={{
        padding: '3px 3px 2px',
        margin: '0 1px',
        verticalAlign: 'baseline',
        display: 'inline-block',
        borderRadius: '4px',
        backgroundColor: tags.map(t => `{${t.value}}`).includes(element.children[0].text) ? '#cbf4ca' : '#f4caca',
        fontSize: '0.9em',
        boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
      }}
    >
      {element.children[0].text}
      {children}
    </span>
  )
}