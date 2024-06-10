import React, { useEffect, useState } from "react"
import LayoutContainer from "../../layout/LayoutContainer"
import './ItemsPage.scss'
import PrimaryButton from "../../components/buttons/PrimaryButton"
import ItemModal from "../../components/modals/items/ItemModal"
import { db } from "../../configs/firebaseConfig"
import { onValue, ref, set, update } from 'firebase/database';
import uuid from 'react-uuid';
import { ItemProps } from "../../utils/models/itemModel"
import { useLocation, useNavigate } from "react-router-dom"
import ItemList from "./itemList/itemList"
import SecondaryButton from "../../components/buttons/SecondaryButton"

const ItemsPage = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const [item, setItem] = useState(null)
    const [items, setItems] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        const storeRef = ref(db, 'stores/' + state.store.id + '/items/')
        onValue(storeRef, (snapshot) => {
            const data = snapshot.val();
            if (!!data) {
                let newArr = []
                for (let i in data) {
                    newArr.push({ id: i, ...data[i] })
                }
                setItems(newArr)
            } else {
                setItems([])
                console.log('data not found!');
            }
        });
    }, [])

    const addItem = async (values: ItemProps) => {
        try {
            await set(ref(db, 'stores/' + state.store.id + '/items/' + uuid()),
                { ...values, options: values.options ? values.options : null })
            setModalVisible(false)
        } catch (error) {
            console.log('error adding item', error)
        }
    }

    const updateItem = async (values: ItemProps) => {
        const updates = {};
        updates['stores/' + state.store.id + '/items/' + item.id] = values
        try {
            await update(ref(db), updates)
            setItem(null)
            setModalVisible(false)
        } catch (error) {
            console.log('error updating item', error)
        }
    }


    const deleteItem = async (id: string) => {
        try {
            await set(ref(db, 'stores/' + state.store.id + '/items/' + id), null)
        } catch (error) {
            console.log('error deleting item', error)
        }
    }


    const setSelectedItem = (selectedItem) => {
        setItem(selectedItem)
        setModalVisible(true)
    }


    const cancel = () => {
        setItem(null)
        setModalVisible(false)
    }
    return (
        <LayoutContainer>
            <div className="items-container">
                <div className="button-container">
                    <SecondaryButton title='Go Back' onClick={() => navigate(-1)} />
                    <PrimaryButton title='Add Item' onClick={() => setModalVisible(true)} />
                </div>
                <p className="list-title">{state.store.name}'s Items</p>
                <ItemList items={items} deleteItem={deleteItem} setSelectedItem={setSelectedItem} />
            </div>
            <ItemModal modalVisible={modalVisible} item={item} title={item ? 'Edit Item' : 'Add Item'} submit={item ? updateItem : addItem} cancel={cancel} />
        </LayoutContainer>
    )
}

export default React.memo(ItemsPage)