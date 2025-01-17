import { useDispatch } from 'react-redux';
import { editBook, deleteBook } from '../../store/booksSlice';
import { IBook } from '../../models/Book';

const useBookLogic = (book: IBook) => {
    const dispatch = useDispatch();

    const handleEdit = (newTitle: string, newSubtitle: string, author_name: string, publish_year: string) => {
        dispatch(editBook({ 
            key: book.key, 
            updatedBook: { 
                title: newTitle, 
                subtitle: newSubtitle,
                author_name: author_name.split(','),
                publish_year: publish_year.split(','),
            } 
        }))
    }

    const handleDelete = () => {
        dispatch(deleteBook(book.key))
    }

    return { handleEdit, handleDelete }
}

export default useBookLogic;