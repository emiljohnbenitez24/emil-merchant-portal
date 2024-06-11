import React from 'react';
import { StoreProps } from '../../../utils/models/storeModel'
import StoreCard from './storeCard/StoreCard'
import { Col, Row } from 'antd';

interface Props {
    stores: StoreProps[]
    setSelectedStore: (store: StoreProps) => void;
    deleteStore: (id: string) => void;
}


const StoreList: React.FC<Props> = ({ stores, deleteStore, setSelectedStore }) => {

    return (
        <Row gutter={[34, 24]}>
            {stores.length > 0 ? stores.map(store =>
                <Col className="gutter-row">
                    <StoreCard key={store.id} store={store} deleteStore={deleteStore} setSelectedStore={setSelectedStore} />
                </Col>
            )
                : <p className='empty-text'>No Stores</p>}
        </Row>
    )
}

export default StoreList