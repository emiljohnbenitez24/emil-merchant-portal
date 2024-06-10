import React from 'react';
import { StoreProps } from '../../../utils/models/storeModel'
import StoreCard from './storeCard/StoreCard'

interface Props {
    stores: StoreProps[]
    setSelectedStore: (store: StoreProps) => void;
    deleteStore: (id: string) => void;
}


const StoreList: React.FC<Props> = ({ stores, deleteStore, setSelectedStore }) => {

    return (
        <div className='list-container'>
            {stores.length > 0 ? stores.map(store => 
            <StoreCard key={store.id} store={store} deleteStore={deleteStore} setSelectedStore={setSelectedStore} />) 
            : <p className='empty-text'>No Stores</p>}
        </div>
    )
}

export default StoreList