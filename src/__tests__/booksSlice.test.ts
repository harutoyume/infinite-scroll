import booksReducer, { editBook, deleteBook } from '../store/booksSlice';
import { BooksState } from '../store/booksSlice';

describe('Тестирование booksSlice', () => {
  it('наличие начальных данных в state', () => {
    const initialState: BooksState = booksReducer(undefined, { type: '' });
    expect(initialState.books).toEqual([]);
    expect(initialState.isLoading).toBe(false);
    expect(initialState.error).toBe('');
    expect(initialState.page).toBe(1);
  });

  it('редактирование элемента в state', () => {
    const state: BooksState = {
      books: [{
          key: 'testKey', title: 'Старое название',
          subtitle: undefined,
          author_name: undefined,
          publish_year: undefined,
          isbn: undefined
      }],
      isLoading: false, error: '', page: 1
    };
    const newState = booksReducer(state, editBook({ key: 'testKey', updatedBook: { title: 'Новое название' } }));
    expect(newState.books[0].title).toBe('Новое название');
  });

  it('удаление элемента в state', () => {
    const state: BooksState = {
      books: [{
          key: 'testKey', title: 'Тестовая книга',
          subtitle: 'Это книга для теста удаления',
          author_name: undefined,
          publish_year: undefined,
          isbn: undefined
      }],
      isLoading: false, error: '', page: 1
    };
    const newState = booksReducer(state, deleteBook('testKey'));
    expect(newState.books).toHaveLength(0);
  });

});