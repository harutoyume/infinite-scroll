import ItemsList from "./components/ItemsList/ItemsList"


function App() {
  return (
    <>
    <main>
      <h1>Cписок книг по веб-разработке</h1>
      <h2>Источник: <a href="https://openlibrary.org/" target="_blank" rel="noreferrer">OpenLibrary</a></h2>
      <ItemsList />
    </main>
    </>
  )
}

export default App