import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../store/booksSlice';
import BooksList from '../components/BooksList/BooksList';
import { IBook } from '../models/Book';
import { BooksState } from '../store/booksSlice';

const store = configureStore({
  reducer: {
    books: reducer
  },
  preloadedState: {
    books: {
      books: [
        {
          key: 'testKey',
          title: 'Тестовая книга',
          subtitle: 'Это тестовая книга',
          author_name: ['Какой-то автор'],
          publish_year: ['2025'],
          isbn: undefined
        },
      ],
      isLoading: false,
      error: '',
      page: 1,
    }
  }
})

function selectBookById(state: { books: BooksState }, id: string): IBook | undefined {
  return state.books.books.find(book => book.key === id);
}

describe('Компонент Book в BooksList', () => {

  it('показывает данные элемента в BooksList и изменяет их', async () => {
    render(
      <Provider store={store}>
        <BooksList />
      </Provider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText('Изменить'));
    });

    const titleInput = await screen.findByLabelText('Название');

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: 'Новое название' } });
      fireEvent.click(screen.getByText('Готово'));
    });

    const state = store.getState();
    expect(selectBookById(state, 'testKey')?.title).toBe('Новое название');
  });

  it('показывает данные элемента в BooksList и вызывает его удаление', () => {
    
    render(
      <Provider store={store}>
        <BooksList />
      </Provider>
    );

      fireEvent.click(screen.getByText('Удалить'));

      expect(screen.queryByText('Тестовая книга')).not.toBeInTheDocument();

      const state = store.getState();
      
      expect(selectBookById(state, 'testKey')).toBeUndefined();
  });

});
