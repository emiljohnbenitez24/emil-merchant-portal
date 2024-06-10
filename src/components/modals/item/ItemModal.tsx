// ItemModal.tsx
import React, { useState } from "react";
import { Modal } from "antd";
import DynamicForm from "../../forms/DynamicForm";
import formConfig from '../../../jsons/itemForm.json'
import { ItemProps } from "../../../utils/models/itemModel";

interface Props {
    item: ItemProps;
    title: string;
    modalVisible: boolean;
    submit: (values: ItemProps) => void;
    cancel: () => void;
}

const StoreModal: React.FC<Props> = ({ modalVisible, submit, cancel, title, item }) => {
    const [formInstance, setFormInstance] = useState<any>(null);

    const handleOk = async () => {
        try {
            const values = await formInstance.validateFields();
            submit(values);
            formInstance.resetFields();
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const handleCancel = () => {
        formInstance.resetFields();
        cancel();
    };

    const handleFormInstance = (form: any) => {
        setFormInstance(form);
    };

    return (
        <Modal
            title={title}
            centered
            open={modalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='Save'
        >
            <DynamicForm formConfig={formConfig} initialValues={item} onFormInstance={handleFormInstance} isItem/>
        </Modal>
    );
};

export default StoreModal;