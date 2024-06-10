import React from 'react';
import { ItemProps } from '../../../utils/models/itemModel'
import ItemCard from './itemCard/itemCard'

interface Props {
    items: ItemProps[]
    deleteItem: (id: string) => void;
    setSelectedItem: (item: ItemProps) => void;
}


const ItemList: React.FC<Props> = ({ items, deleteItem, setSelectedItem}) => {
    return (
        <div className='list-container'>
            {items.length > 0 ? items.map(item => <ItemCard key={item.id} item={item} deleteItem={deleteItem} setSelectedItem={setSelectedItem}/>) : <p className='empty-text'>No Items</p>}
        </div>
    )
}

export default ItemList