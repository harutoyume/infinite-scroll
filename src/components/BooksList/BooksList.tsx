import React from 'react'
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchBooks } from '../../store/booksSlice'
import styles from './BooksList.module.css'
import Book from '../Book/Book';
import useBookListLogic from './BooksList.logic';
import { List, Spin } from "antd";


const BooksList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { books, page, isLoading } = useAppSelector(state => state.books)
  const initialFetch = useRef(false);

  const { handleScroll } = useBookListLogic();

  useEffect(() => {
    if (!initialFetch.current && page === 1 && !isLoading) {
      dispatch(fetchBooks(page))
      initialFetch.current = true
    }
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
      <section className={styles.list}>
        <List 
          dataSource={books}
          renderItem={book => <Book book={book} key={book.key} />}
          locale={{ emptyText: 'Книги загружаются :)' }}
        />
        <div className={styles.loading}>
          {isLoading && <Spin />}
        </div>
      </section>
  )
}

export default BooksList;