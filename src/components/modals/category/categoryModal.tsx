// ItemModal.tsx
import React, { useState } from "react";
import { Modal } from "antd";
import DynamicForm from "../../forms/DynamicForm";
import formConfig from '../../../jsons/categoryForm.json'
import { CategoryProps } from "../../../utils/models/categoryModel";

interface Props {
    category: CategoryProps;
    title: string;
    modalVisible: boolean;
    submit: (values: CategoryProps) => void;
    cancel: () => void;
}

const CategoryModal: React.FC<Props> = ({ modalVisible, submit, cancel, title, category }) => {
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
            <DynamicForm formConfig={formConfig} initialValues={category} onFormInstance={handleFormInstance} />
        </Modal>
    );
};

export default CategoryModal;