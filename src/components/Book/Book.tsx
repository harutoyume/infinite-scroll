import { IBook } from "../../models/Book";
import styles from './Book.module.css';
import useBookLogic from "./Book.logic";
import { Typography, Divider, Button } from "antd";
import BookEdit from "./BookEdit";

const { Title, Paragraph, Link } = Typography;

interface IItemProps {
    book: IBook;
}

const Book: React.FC<IItemProps> = ({ book }) => {


    const { handleDelete } = useBookLogic(book);

    return (
        <>
            <article className={styles.book}>
                <Title level={4}>{book.title}</Title>
                <Title level={5}>{book.subtitle}</Title>
                <Paragraph>{book.author_name?.join(', ')}</Paragraph>
                <Paragraph>{book.publish_year?.join(', ')}</Paragraph>
                <footer>
                {book.isbn && book.isbn.length > 0 && (
                    <Link href={`https://openlibrary.org/isbn/${book.isbn[0]}`} target="_blank" rel="noreferrer">Подробнее</Link>
                )}
                <section className={styles.actions}>
                    <BookEdit book={book}/>
                    <Button onClick={handleDelete} danger>Удалить</Button>
                </section>
                </footer>
            </article>
            <Divider />
        </>
    )
}

export default Book;