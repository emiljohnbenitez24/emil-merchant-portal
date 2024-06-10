import React from 'react';
import CategoryCard from './categoryCard/CategoryCard'
import { CategoryProps } from '../../../utils/models/categoryModel';
import { StoreProps } from '../../../utils/models/storeModel';

interface Props {
    store: StoreProps,
    categories: CategoryProps[]
    setSelectedCategory: (store: CategoryProps) => void;
    deleteCategory: (id: string) => void;
}


const CategoryList : React.FC<Props> = ({ store, categories, deleteCategory, setSelectedCategory }) => {
    return (
        <div className='list-container'>
            {categories.length > 0 ? categories.map(category => 
            <CategoryCard key={category.id} store={store} category={category} deleteCategory={deleteCategory} setSelectedCategory={setSelectedCategory} />) 
            : <p className='empty-text'>No Categories</p>}
        </div>
    )
}

export default CategoryList