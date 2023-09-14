import React, { useState } from "react";
import "./ProductList.css";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
const products = [
    { id: '1', title: 'Джинсы', price: 5000, description: 'Синие, узкие, размер 43' },
    { id: '2', title: 'Футболка', price: 1000, description: 'Белая, размер M' },
    { id: '3', title: 'Кроссовки', price: 3000, description: 'Черные, размер 40' },
    { id: '4', title: 'Рубашка', price: 2500, description: 'Синяя, размер L' },
    { id: '5', title: 'Шорты', price: 1500, description: 'Коричневые, размер S' },
    { id: '6', title: 'Пальто', price: 7000, description: 'Черное, размер XL' },
    { id: '7', title: 'Свитер', price: 1800, description: 'Серый, размер S' },
    { id: '8', title: 'Шарф', price: 500, description: 'Шершавый, цвет зеленый' },
    { id: '9', title: 'Платье', price: 3500, description: 'Красное, размер M' },
    { id: '10', title: 'Ботинки', price: 4500, description: 'Кожаные, размер 38' },
  ];
  const getTotalPrice = (items=[])=>{
    return items.reduce((acc, item)=>{
        return acc += item.price;
    },0)
  }
const ProductList = () => {
    const [addedItems,setAddedItems] = useState([]);
    const {tg} = useTelegram();
    const onAdd = (product)=>{
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];
        if(alreadyAdded){
            newItems = addedItems.filter(item => item.id !== product.id);
        }else{
            newItems = [...addedItems, product];
        }
        setAddedItems(newItems)
        if(newItems.length === 0){
            tg.MainButton.hide();
        }else{
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    
  return (
     <div className="list">
        {products.map(item =>(
            <ProductItem
            product={item}
            onAdd={onAdd}
            className={'item'}
            />
        ))}
     </div>
     
     );
};

export default ProductList;
