import React from 'react';
import CategoryCard from './categoryCard/CategoryCard'
import { CategoryProps } from '../../../utils/models/categoryModel';
import { StoreProps } from '../../../utils/models/storeModel';
import { Col, Row } from 'antd';

interface Props {
    store: StoreProps,
    categories: CategoryProps[]
    setSelectedCategory: (store: CategoryProps) => void;
    deleteCategory: (id: string) => void;
}


const CategoryList: React.FC<Props> = ({ store, categories, deleteCategory, setSelectedCategory }) => {
    return (
        <div className='list-container'>
            <Row gutter={[16, 24]}>
                {categories.length > 0 ? categories.map(category =>
                    <Col className="gutter-row">
                        <CategoryCard key={category.id} store={store} category={category} deleteCategory={deleteCategory} setSelectedCategory={setSelectedCategory} />
                    </Col>
                )
                    : <p className='empty-text'>No Categories</p>}
            </Row>
        </div>
    )
}

export default CategoryList