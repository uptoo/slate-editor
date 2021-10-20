import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react'
import { Editor, createEditor, Transforms, Range, Element as SlateElement, } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, Editable, withReact, useSlate, useSelected, useFocused, ReactEditor } from 'slate-react'

import './style.css'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Button = React.forwardRef(({
  className,
  active,
  reversed,
  ...props
}, ref) => (
  <span
    {...props}
    ref={ref}
    className={className}
  />
))

export default function MyEditor({
  content = [{ children: [{ text: '' }] }],
  onChange,
  mentions = [],
  onMention,
  placeholder = "Contenu de votre message",
  readOnly = false,
  minHeight = 0,
  ...props
}) {

  // Editeur
  const editor = useMemo(() => withMentions(withReact(withHistory(createEditor()))), [])

  // Valeur du contenu
  const [value, setValue] = useState(content)

  // Pour les mentions
  const ref = useRef()
  const [target, setTarget] = useState()
  const [index, setIndex] = useState(0)
  const [search, setSearch] = useState('')

  // Fonctions de render
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const users = mentions.filter((m) =>
    m.firstName.toLowerCase().startsWith(search.toLowerCase())
  ).slice(0, 10)

  const onKeyDown = useCallback(
    event => {
      if (target) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault()
            const prevIndex = index >= users.length - 1 ? 0 : index + 1
            setIndex(prevIndex)
            break
          case 'ArrowUp':
            event.preventDefault()
            const nextIndex = index <= 0 ? users.length - 1 : index - 1
            setIndex(nextIndex)
            break
          case 'Tab':
          case 'Enter':
            event.preventDefault()
            Transforms.select(editor, target)
            insertMention(editor, users[index])
            if (onMention) {
              onMention(users[index])
            }
            setTarget(null)
            break
          case 'Escape':
            event.preventDefault()
            setTarget(null)
            break
          default:
        }
      }
    },
    [index, search, target]
  )

  useEffect(() => {
    if (target && users.length > 0) {
      const el = ref.current
      const domRange = ReactEditor.toDOMRange(editor, target)
      const rect = domRange.getBoundingClientRect()
      el.style.top = `${rect.top + window.pageYOffset + 24}px`
      el.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [users.length, editor, index, search, target])

  useEffect(() => {
    ReactEditor.focus(editor)
    const editorEl = document.querySelector(
      '[data-slate-editor="true"]',
    )
    editorEl.style.minHeight = `${minHeight}px`
  }, [])

  useEffect(() => {
    if (onChange) {
      onChange(value)
    }
  }, [value])

  return (
    <div 
      className={classNames(!readOnly ? "editor-bordered" : "")}
      style={{ minHeight: minHeight + 85 }}
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
            const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/)
            const after = Editor.after(editor, start)
            const afterRange = Editor.range(editor, start, after)
            const afterText = Editor.string(editor, afterRange)
            const afterMatch = afterText.match(/^(\s|$)/)

            if (beforeMatch && afterMatch) {
              setTarget(beforeRange)
              setSearch(beforeMatch[1])
              setIndex(0)
              return
            }
          }

          setTarget(null)
        }}
      >
        {!readOnly && (
          <div className="editor-toolbar">
            <div>
              <MarkButton format="bold">
                <i class="editor-icon icon-bold">&#xe800;</i>
              </MarkButton>
              <MarkButton format="italic">
                <i class="editor-icon icon-italic">&#xe801;</i>
              </MarkButton>
              <MarkButton format="underline">
                <i class="editor-icon icon-underline">&#xf0cd;</i>
              </MarkButton>
              <BlockButton format="bulleted-list">
                <i class="editor-icon icon-list-bullet">&#xf0ca;</i>
              </BlockButton>
              <BlockButton format="numbered-list">
                <i class="editor-icon icon-list-numbered">&#xf0cb;</i>
              </BlockButton>
            </div>
          </div>
        )}
        <Editable
          readOnly={readOnly}
          className={readOnly ? "" : "editor-editable"}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
        {target && users.length > 0 && (
          <div
            ref={ref}
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
                  background: i === index ? '#B4D5FF' : 'transparent',
                }}
              >
                {user.firstName} {user.lastName}
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
      className={isActive ? 'isActive' : ''}
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
      className={isActive ? 'isActive' : ''}
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

const insertMention = (editor, user) => {
  const mention = {
    type: 'mention',
    user,
    children: [{ text: '' }],
  }
  Transforms.insertNodes(editor, mention)
  Transforms.move(editor)
}

const Element = (props) => {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'mention':
      return <Mention {...props} />
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
