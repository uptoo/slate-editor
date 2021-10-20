import Editor from './component'

function App() {
  return (
    <div style={{ padding: 20, backgroundColor: '#EEE' }}>
      <div style={{ backgroundColor: '' }}>
        <Editor
          readOnly={false}
          minHeight={200}
          mentions={[{
            _id: '1',
            firstName: 'Prénom',
            lastName: 'Nom'
          }]}
        />
      </div>
    </div>
  )
}

export default App
