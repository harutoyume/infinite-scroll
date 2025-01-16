import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchItems } from '../../store/itemsSlice'


const useItemListLogic = () => {
      const dispatch = useAppDispatch()
      const { page, isLoading } = useAppSelector(state => state.items)
    
      const handleScroll = useCallback(() => {
        if (isLoading) return;
        const height = document.documentElement.offsetHeight; // Высота документа
        const screenHeight = window.innerHeight; // Высота экрана
        const scrolled = window.scrollY; // Сколько пикселей уже проскроллили
    
        const scrollPosition = screenHeight + scrolled; // Низ экрана относительно страницы
        const threshold = height - height / 4; // Порог
    
        if (scrollPosition >= threshold) {
          dispatch(fetchItems(page));
        }
      }, [isLoading, page, dispatch]);

    return { handleScroll };
}

export default useItemListLogic;