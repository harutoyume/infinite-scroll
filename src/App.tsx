import ItemsList from "./components/ItemsList/ItemsList"
import { Typography } from "antd";

const { Title } = Typography;

function App() {
  return (
    <>
    <main>
      <Title >Cписок книг по веб-разработке</Title>
      <Title level={2} style={{marginTop: 0}}>Источник: <a href="https://openlibrary.org/" target="_blank" rel="noreferrer">OpenLibrary</a></Title>
      <ItemsList />
    </main>
    </>
  )
}

export default App