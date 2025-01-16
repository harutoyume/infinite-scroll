import React from 'react'
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchItems } from '../../store/itemsSlice'
import styles from './ItemsList.module.css'
import Item from '../Item/Item';
import useItemListLogic from './ItemList.logic';
import { List, Spin } from "antd";


const ItemsList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items, page, isLoading } = useAppSelector(state => state.items)
  const initialFetch = useRef(false);

  const { handleScroll } = useItemListLogic();

  useEffect(() => {
    if (!initialFetch.current && page === 1 && !isLoading) {
      dispatch(fetchItems(page))
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
          dataSource={items}
          renderItem={item => <Item item={item} key={item.key} />}
          locale={{ emptyText: 'Книги загружаются :)' }}
        />
        <div className={styles.loading}>
          {isLoading && <Spin />}
        </div>
      </section>
  )
}

export default ItemsList