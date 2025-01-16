import { useDispatch } from 'react-redux';
import { editItem, deleteItem } from '../../store/itemsSlice';
import { IItem } from '../../models/Item';

const useItemLogic = (item: IItem) => {
    const dispatch = useDispatch();

    const handleEdit = () => {
        const newTitle = prompt("Enter new title", item.title);
        if (newTitle !== null) {
            dispatch(editItem({ key: item.key, updatedItem: { title: newTitle } }))
        }
    }

    const handleDelete = () => {
        dispatch(deleteItem(item.key))
    }

    return { handleEdit, handleDelete }
}

export default useItemLogic;