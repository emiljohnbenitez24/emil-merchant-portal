import React, { useEffect, useState } from "react"
import LayoutContainer from "../../layout/LayoutContainer"
import './StorePage.scss'
import PrimaryButton from "../../components/buttons/PrimaryButton"
import StoreModal from "../../components/modals/store/StoreModal"
import { db } from "../../configs/firebaseConfig"
import { onValue, ref, set, update } from 'firebase/database';
import uuid from 'react-uuid';
import StoreList from "./storeList/StoreList"
import { StoreProps } from "../../utils/models/storeModel"

const StorePage = () => {
    const [store, setStore] = useState(null)
    const [stores, setStores] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        const storesRef = ref(db, 'stores/')
        onValue(storesRef, (snapshot) => {
            const data = snapshot.val();
            if (!!data) {
                let newArr = []
                for (let i in data) {
                    newArr.push({ id: i, ...data[i] })
                }
                setStores(newArr)
            } else {
                setStores([])
                console.log('data not found!');
            }
        });
    }, [])

    const addStore = async (values: StoreProps) => {
        try {
            await set(ref(db, 'stores/' + uuid()), values)
            setModalVisible(false)
        } catch (error) {
            console.log('error adding store', error)
        }
    }

    const updateStore = async (values: StoreProps) => {
        const updates = {};
        console.log(store.categories)
        updates['stores/' + store.id] = {...values, categories: store.categories ? store.categories : null}
        try {
            await update(ref(db), updates)
            setStore(null)
            setModalVisible(false)
        } catch (error) {
            console.log('error updating store', error)
        }
    }


    const deleteStore = async (id: string) => {
        try {
            await set(ref(db, 'stores/' + id), null)
        } catch (error) {
            console.log('error deleting store', error)
        }
    }

    const setSelectedStore = (store) => {
        setStore(store)
        setModalVisible(true)
    }


    const cancel = () => {
        setStore(null)
        setTimeout(() => {
            setModalVisible(false)
        }, 0)
    }


    return (
        <LayoutContainer>
            <div className="store-container">
                <div className="button-container">
                    <PrimaryButton title='Add Store' onClick={() => setModalVisible(true)} />
                </div>
                <p className="list-title">Stores</p>
                <StoreList stores={stores} deleteStore={deleteStore} setSelectedStore={setSelectedStore}/>
            </div>
            <StoreModal modalVisible={modalVisible} store={store} title={store ? 'Edit Store' : 'Add Store'} submit={store ? updateStore : addStore} cancel={cancel} />
        </LayoutContainer>
    )
}

export default React.memo(StorePage)