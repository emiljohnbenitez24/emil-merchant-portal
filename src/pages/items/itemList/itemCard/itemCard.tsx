import { Card, Tooltip } from "antd"
import { ItemProps } from "../../../../utils/models/itemModel"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import React from "react";

interface Props {
    item: ItemProps
    deleteItem: (id: string) => void;
    setSelectedItem: (item: ItemProps) => void;
}

const ItemCard: React.FC<Props> = ({ item, deleteItem, setSelectedItem }) => {

    return (
        <Card title={item.name}
            actions={[
                <Tooltip placement="bottom" title={"Edit"} >
                    <EditOutlined onClick={() => setSelectedItem(item)} />
                </Tooltip>
                ,
                <Tooltip placement="bottom" title={"Delete"}>
                    <DeleteOutlined onClick={() => deleteItem(item.id)} />
                </Tooltip>
            ]}
        >
            <p>Category: {item.category}</p>
            <p>Price: ₱{item.price}</p>
            <p>Stock: {item.stock}</p>
        </Card>
    )
}

export default ItemCard