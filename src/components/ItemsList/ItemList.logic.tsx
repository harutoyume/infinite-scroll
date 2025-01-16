import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchItems } from '../../store/itemsSlice'

const throttle = (func: (...args: unknown[]) => void, limit: number) => {
  let timer: number | null = null;

  return function(this: unknown, ...args: unknown[]) {
    if (timer) return;

    timer = window.setTimeout(() => {
      func(...args);
      timer = null;
    }, limit);
  }
}

const useItemListLogic = () => {
  const dispatch = useAppDispatch()
  const { page, isLoading } = useAppSelector(state => state.items)

  const handleScroll = useCallback(throttle(() => {
    if (isLoading) return;
    const height = document.documentElement.offsetHeight; // Высота документа
    const screenHeight = window.innerHeight; // Высота экрана
    const scrolled = window.scrollY; // Сколько пикселей уже проскроллили

    const scrollPosition = screenHeight + scrolled; // Низ экрана относительно страницы
    const threshold = height - height / 4; // Порог

    if (scrollPosition >= threshold) {
      dispatch(fetchItems(page));
    }
  }, 200), [isLoading, page, dispatch]); // Ограничение вызова функции в 200 мс

  return { handleScroll };
}

export default useItemListLogic;