import { IItem } from "../../models/Item";
import styles from './Item.module.css';
import useItemLogic from "./Item.logic";
import { Typography, Divider, Button } from "antd";
import ItemEdit from "./ItemEdit";

const { Title, Paragraph, Link } = Typography;

interface IItemProps {
    item: IItem;
}

const Item: React.FC<IItemProps> = ({ item }) => {


    const { handleDelete } = useItemLogic(item);

    return (
        <>
            <article className={styles.item}>
                <Title level={4}>{item.title}</Title>
                <Title level={5}>{item.subtitle}</Title>
                <Paragraph>{item.author_name?.join(', ')}</Paragraph>
                <Paragraph>{item.publish_year?.join(', ')}</Paragraph>
                <footer>
                {item.isbn && item.isbn.length > 0 && (
                    <Link href={`https://openlibrary.org/isbn/${item.isbn[0]}`} target="_blank" rel="noreferrer">Подробнее</Link>
                )}
                <section className={styles.actions}>
                    <ItemEdit item={item}/>
                    <Button onClick={handleDelete}>Удалить</Button>
                </section>
                </footer>
            </article>
            <Divider />
        </>
    )
}

export default Item;