import React, {useEffect, useRef, useState} from "react";

import {useAppDispatch} from "../redux/store";
import {SortType, SortPropertyEnum} from "../redux/filter/types";
import {setSortItem} from "../redux/filter/slice";

type SortItem = {
  name: string,
  sortProp: SortPropertyEnum
}

export const sortList: SortItem[] = [
  {name: 'популярности', sortProp: SortPropertyEnum.RATING},
  {name: 'цене', sortProp: SortPropertyEnum.PRICE},
  {name: 'алфавиту', sortProp: SortPropertyEnum.TITLE},
]

type SortProps = {
  value: SortType
}

export const Sort: React.FC<SortProps> = React.memo(({value}) => {
  let [isVisiblePopup, setIsVisiblePopup] = useState<boolean>(false)
  const sortRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const onClickSortItem = (obj: SortItem) => {
    dispatch(setSortItem(obj))
    setIsVisiblePopup(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[]
      }
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setIsVisiblePopup(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisiblePopup(!isVisiblePopup)}>{value.name}</span>
      </div>
      {isVisiblePopup && (
        <div className="sort__popup">
          <ul>
            {
              sortList.map((obj, index) => (
                <li key={index}
                    onClick={() => onClickSortItem(obj)}
                    className={value.sortProp === obj.sortProp ? 'active' : ''}
                >{obj.name}</li>
              ))
            }
          </ul>
        </div>
      )}
    </div>
  )
})