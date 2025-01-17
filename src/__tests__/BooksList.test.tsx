import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import reducer from '../store/booksSlice';
import BooksList from '../components/BooksList/BooksList';

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
          author_name: undefined,
          publish_year: undefined,
          isbn: undefined
        }
      ],
      isLoading: false,
      error: '',
      page: 1,
    }
  }
})

describe('Компонент BooksList', () => {
  it('отображает список элементов', () => {

    render(
      <Provider store={store}>        
        <BooksList />
      </Provider>
    );
    expect(screen.getByText('Тестовая книга')).toBeInTheDocument();
  });
});
