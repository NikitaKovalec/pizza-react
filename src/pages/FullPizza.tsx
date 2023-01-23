import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    title: string,
    price: number,
  }>()
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get('https://6360c8a667d3b7a0a6b52a38.mockapi.io/Items/' + id)
        setPizza(data)
      } catch (e) {
        alert('Нет такой пиццы, попробуйте позже')
        navigate('/')
      }
    }

    fetchPizza()
  }, [])

  if (!pizza) {
    return <div className='container'>
      <h2>Загрузка...</h2>
    </div>
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza image"/>
      <h2>{pizza.title}</h2>
      <p>
        Тут находится описание пиццы
      </p>
      <h3>{pizza.price} р</h3>
    </div>
  );
};

export default FullPizza;