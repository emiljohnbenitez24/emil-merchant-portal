import { Form, Input, Modal, Select } from "antd"
import itemForm from '../../../jsons/itemForm.json'
import { ItemProps } from "../../../utils/models/itemModel";
import React, { useEffect } from "react";


interface Props {
    item: ItemProps,
    title: string,
    modalVisible: boolean,
    submit: (values: ItemProps) => void;
    cancel: () => void;
}


const ItemModal: React.FC<Props> = ({ modalVisible, submit, cancel, title, item }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(item)
    }, [item])


    const handleOk = async () => {
        try {
            const values = await form.validateFields()
            submit(values)
            form.resetFields();
        } catch (error) {
        }
    }

    const handleCancel = () => {
        form.resetFields();
        cancel()
    }

    const renderFormItems = () => {
        return itemForm.map((field) => {
            switch (field.type) {
                case 'text':
                    return (
                        <Form.Item
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            rules={[{ required: field.required, message: `${field.label} is required` }]}
                        >
                            <Input />
                        </Form.Item>
                    );
                case 'number':
                    return (
                        <Form.Item
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            rules={
                                [
                                    { required: field.required, message: `${field.label} is required` },
                                    {
                                        validator: (_, value) => {
                                            if (value && value <= 0) {
                                                return Promise.reject(`${field.label} should be greater than 0`);
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    );
                case 'selectSingle':
                    return (
                        <Form.Item
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            rules={[{ required: field.required, message: `${field.label} is required` }]}
                        >
                            <Select options={field.categories} />
                        </Form.Item>
                    );
                case 'selectMultiple':
                    return (
                        <Form.Item
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            rules={[{ required: field.required, message: `${field.label} is required` }]}
                        >
                            <Select mode="multiple" options={field.options} />
                        </Form.Item>
                    );
                case 'textarea':
                    return (
                        <Form.Item
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            rules={[{ required: field.required, message: `${field.label} is required` }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                    );
                default:
                    return null;
            }
        });
    };

    return <Modal
        title={title}
        centered
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Save'
    >
        <Form
            form={form}
            layout="vertical"
            initialValues={{ remember: true }}
        >
            {renderFormItems()}
        </Form>
    </Modal>
}

export default ItemModal