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
          tags={[
            { value: 'destPrenom', description: 'Prénom du destinataire' },
            { value: 'destNom', description: 'Nom du destinataire' }
          ]}
        />
      </div>
    </div>
  )
}

export default App
