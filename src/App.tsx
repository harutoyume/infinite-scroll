import BooksList from "./components/BooksList/BooksList"
import { Typography } from "antd";

const { Title } = Typography;

function App() {
  return (
    <>
    <main>
      <Title >Cписок книг по веб-разработке</Title>
      <Title level={2} style={{marginTop: 0}}>Источник: <a href="https://openlibrary.org/" target="_blank" rel="noreferrer">OpenLibrary</a></Title>
      <BooksList />
    </main>
    </>
  )
}

export default App