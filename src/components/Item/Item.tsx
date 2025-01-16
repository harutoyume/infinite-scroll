import { IItem } from "../../models/Item";
import styles from './Item.module.css';
import useItemLogic from "./Item.logic";

interface IItemProps {
    item: IItem;
}

const Item: React.FC<IItemProps> = ({ item }) => {
    const { handleEdit, handleDelete } = useItemLogic(item);

    return (
        <article className={styles.item}>
            <h2>{item.title}</h2>
            <h3>{item.subtitle}</h3>
            <p>{item.author_name?.join(', ')}</p>
            <p>{item.publish_year?.join(', ')}</p>
            <footer>
              {item.isbn && item.isbn.length > 0 && (
                <a href={`https://openlibrary.org/isbn/${item.isbn[0]}`} target="_blank" rel="noreferrer">Подробнее</a>
              )}
              <div className={styles.itemActions}>
                <button onClick={handleEdit}>Изменить</button>
                <button onClick={handleDelete}>Удалить</button>
              </div>
            </footer>
          </article>
    )
}

export default Item;