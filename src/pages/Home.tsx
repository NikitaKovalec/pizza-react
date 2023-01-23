import React, {useCallback, useEffect, useRef} from "react";
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import qs from 'qs'


import {PizzaBlock, Skeleton, Categories, Sort} from "../components";

import {useAppDispatch} from "../redux/store";
import {selectFilter} from "../redux/filter/selectors";
import {setCategoryId} from "../redux/filter/slice";
import {selectPizzasData} from "../redux/pizzas/selectors";
import {fetchPizzas} from "../redux/pizzas/asyncActions";

const Home: React.FC = () => {
  const {categoryId, sortItem, searchValue} = useSelector(selectFilter)
  const {items, status} = useSelector(selectPizzasData)
  const isSearch = useRef<boolean>(false)
  const isMounted = useRef<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const order = sortItem.name.includes('алфавиту') ? 'asc' : 'desc'
  const category = categoryId > 0 ? `category=${categoryId}` : ''
  const sortBy = sortItem.sortProp;

  const getPizzas = async () => {
    dispatch(fetchPizzas({order, category, sortBy}))
  }

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, [])

  //Если были изменены параметры сортировки, то вшиваются в URL
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sortBy,
  //       categoryId
  //     })
  //     navigate(`?${queryString}`)
  //   }
  //   isMounted.current = true
  // }, [categoryId, sortItem])
  //
  // //Если был первый рендер, то проверяем URL параметры и сохраняем в redux
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParamsType
  //     const sort = sortList.find(obj => obj.sortProp === params.sortBy)
  //
  //     dispatch(
  //       setFilters({
  //         searchValue: params.order,
  //         categoryId: Number(params.category),
  //         sortItem: sort ? sort : sortList[0],
  //       })
  //     )
  //     isSearch.current = true
  //   }
  // }, [])

  useEffect(() => {
    window.scrollTo(0, 0)

    if (!isSearch.current) {
      getPizzas()
    }

    isSearch.current = false
  }, [categoryId, sortItem])

  const pizzasList = items.filter((obj: any) => {
    return obj.title.toLowerCase().includes(searchValue.toLowerCase())
  }).map((pizza: any) => (<PizzaBlock key={pizza.id} {...pizza} />))
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort value={sortItem}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? <h3> Ошибка загрузки :C </h3> :
        <div className="content__items">
          {
            status === 'loading'
              ? skeleton
              : pizzasList
          }
        </div>}
    </div>
  );
};

export default Home;

