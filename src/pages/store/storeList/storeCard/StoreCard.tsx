import { Card, Tooltip } from "antd"
import { StoreProps } from "../../../../utils/models/storeModel"
import { EditOutlined, DeleteOutlined, FileSearchOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import React from "react";
import { getlength } from "../../../../utils/getLength";

interface Props {
    store: StoreProps
    setSelectedStore: (store: StoreProps) => void;
    deleteStore: (id: string) => void;
}

const StoreCard: React.FC<Props> = ({ store, deleteStore, setSelectedStore }) => {

    const navigate = useNavigate()
    return (
        <Card title={store.name}
            actions={[
                <Tooltip placement="bottom" title={"View"}>
                    <FileSearchOutlined className="custom-icon" onClick={() => navigate('/categories', { state: { store } })} />
                </Tooltip>
                ,
                <Tooltip placement="bottom" title={"Edit"}>
                    <EditOutlined onClick={() => setSelectedStore(store)} />
                </Tooltip>,
                <Tooltip placement="bottom" title={"Delete"}>
                    <DeleteOutlined onClick={() => deleteStore(store.id)} />
                </Tooltip>
            ]}
        >
            <div>
                <p>Description: {store.description}</p>
                <p>Address: {store.address}</p>
                <p>No. of Categories: {getlength(store.categories)}</p>
            </div>
        </Card>
    )
}

export default StoreCard