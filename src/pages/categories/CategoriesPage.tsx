import React, { useEffect, useState } from "react"
import LayoutContainer from "../../layout/LayoutContainer"
import './CategoriesPage.scss'
import PrimaryButton from "../../components/buttons/PrimaryButton"
import { db } from "../../configs/firebaseConfig"
import { onValue, ref, set, update } from 'firebase/database';
import uuid from 'react-uuid';
import { useLocation, useNavigate } from "react-router-dom"
import SecondaryButton from "../../components/buttons/SecondaryButton"
import CategoryList from "./categoryList/CategoryList"
import CategoryModal from "../../components/modals/category/categoryModal"
import { CategoryProps } from "../../utils/models/categoryModel"

const CategoriesPage = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const [category, setCategory] = useState(null)
    const [categories, setCategories] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        const storeRef = ref(db, 'stores/' + state.store.id + '/categories/')
        onValue(storeRef, (snapshot) => {
            const data = snapshot.val();
            if (!!data) {
                let newArr = []
                for (let i in data) {
                    newArr.push({ id: i, ...data[i] })
                }
                setCategories(newArr)
            } else {
                setCategories([])
                console.log('data not found!');
            }
        });
    }, [])

    const addCategory = async (values: CategoryProps) => {
        try {
            await set(ref(db, 'stores/' + state.store.id + '/categories/' + uuid()), values)
            setModalVisible(false)
        } catch (error) {
            console.log('error adding item', error)
        }
    }

    const updateCategory = async (values: CategoryProps) => {
        const updates = {};
        updates['stores/' + state.store.id + '/categories/' + category.id] = { ...values, items: category.items ? category.items : null }
        try {
            await update(ref(db), updates)
            setCategory(null)
            setModalVisible(false)
        } catch (error) {
            console.log('error updating item', error)
        }
    }


    const deleteCategory = async (id: string) => {
        try {
            await set(ref(db, 'stores/' + state.store.id + '/categories/' + id), null)
        } catch (error) {
            console.log('error deleting item', error)
        }
    }


    const setSelectedCategory = (selectedItem) => {
        setCategory(selectedItem)
        setModalVisible(true)
    }


    const cancel = () => {
        setCategory(null)
        setTimeout(() => {
            setModalVisible(false)
        }, 0)
    }
    return (
        <LayoutContainer>
            <div className="category-container">
                <div className="button-container">
                    <SecondaryButton title='Go Back' onClick={() => navigate(-1)} />
                    <PrimaryButton title='Add Category' onClick={() => setModalVisible(true)} />
                </div>
                <p className="list-title">{state.store.name}'s Categories</p>
                <CategoryList categories={categories} store={state.store} deleteCategory={deleteCategory} setSelectedCategory={setSelectedCategory} />
            </div>
            <CategoryModal modalVisible={modalVisible} category={category} title={category ? 'Edit Category' : 'Add Category'} submit={category ? updateCategory : addCategory} cancel={cancel} />
        </LayoutContainer>
    )
}

export default React.memo(CategoriesPage)