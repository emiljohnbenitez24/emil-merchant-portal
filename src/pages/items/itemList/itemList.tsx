import React from 'react';
import { ItemProps } from '../../../utils/models/itemModel'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Table, Tooltip } from 'antd';
import { NavigateFunction } from 'react-router-dom';

interface Props {
    navigate?: NavigateFunction;
    items: ItemProps[]
    deleteItem: (id: string) => void;
    setSelectedItem: (item: ItemProps) => void;
}

const columns = (setSelectedItem, deleteItem) => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Cost',
        dataIndex: 'cost',
        key: 'cost',
    },
    {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'stock',
    },
    {
        title: 'Options',
        dataIndex: 'options',
        key: 'options',
        render: (options) => {
            return options ? <span>
                {options.map((option, index) => (
                    <div key={index} style={{ marginRight: 8 }}>
                        {option.name} (Price: ₱ {option.price}, Cost: ₱ {option.cost}, stock {option.stock})
                    </div>
                ))}
            </span> : null
        },
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
            <div>
                <Tooltip placement="bottom" title={"Edit"}>
                    <EditOutlined onClick={() => setSelectedItem(record)} />
                </Tooltip>,
                <Tooltip placement="bottom" title={"Delete"}>
                    <DeleteOutlined onClick={() => deleteItem(record.id)} />
                </Tooltip>
            </div>
        ),
    },
];


const ItemList: React.FC<Props> = ({ items, setSelectedItem, deleteItem }) => {

    return (
        <div className='list-container'>
            <Table dataSource={items} columns={columns(setSelectedItem, deleteItem)} pagination={{ pageSize: 10 }} />;
        </div>
    )
}

export default ItemList