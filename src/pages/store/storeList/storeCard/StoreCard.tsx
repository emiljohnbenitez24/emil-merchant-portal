import { Card, Tooltip } from "antd"
import { StoreProps } from "../../../../utils/models/storeModel"
import { EditOutlined, DeleteOutlined, FileSearchOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import React from "react";

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
                    <FileSearchOutlined className="custom-icon" onClick={() => navigate('/items', { state: { store } })} />
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
            </div>
        </Card>
    )
}

export default StoreCard