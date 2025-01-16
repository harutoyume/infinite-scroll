import { useDispatch } from 'react-redux';
import { editItem, deleteItem } from '../../store/itemsSlice';
import { IItem } from '../../models/Item';

const useItemLogic = (item: IItem) => {
    const dispatch = useDispatch();

    const handleEdit = (newTitle: string, newSubtitle: string, author_name: string, publish_year: string) => {
        dispatch(editItem({ 
            key: item.key, 
            updatedItem: { 
                title: newTitle, 
                subtitle: newSubtitle,
                author_name: author_name.split(','),
                publish_year: publish_year.split(','),
            } 
        }))
    }

    const handleDelete = () => {
        dispatch(deleteItem(item.key))
    }

    return { handleEdit, handleDelete }
}

export default useItemLogic;