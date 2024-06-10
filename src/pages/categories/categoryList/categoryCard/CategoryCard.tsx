import { Card, Tooltip } from "antd"
import { EditOutlined, DeleteOutlined, FileSearchOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import React from "react";
import { CategoryProps } from "../../../../utils/models/categoryModel";
import { StoreProps } from "../../../../utils/models/storeModel";
import { getlength } from "../../../../utils/getLength";

interface Props {
    store: StoreProps,
    category: CategoryProps
    setSelectedCategory: (store: CategoryProps) => void;
    deleteCategory: (id: string) => void;
}

const StoreCard: React.FC<Props> = ({ store, category, deleteCategory, setSelectedCategory }) => {

    const navigate = useNavigate()
    return (
        <Card title={category.name}
            actions={[
                <Tooltip placement="bottom" title={"View"}>
                    <FileSearchOutlined className="custom-icon" onClick={() => navigate('/items', { state: { store, category } })} />
                </Tooltip>
                ,
                <Tooltip placement="bottom" title={"Edit"}>
                    <EditOutlined onClick={() => setSelectedCategory(category)} />
                </Tooltip>,
                <Tooltip placement="bottom" title={"Delete"}>
                    <DeleteOutlined onClick={() => deleteCategory(category.id)} />
                </Tooltip>
            ]}
        >
            <div>
                <p>Description: {category.description}</p>
                <p>No. of Items: {getlength(category.items)}</p>
            </div>
        </Card>
    )
}

export default StoreCard