// ItemModal.tsx
import React, { useState } from "react";
import { Modal } from "antd";
import DynamicForm from "../../forms/DynamicForm";
import { StoreProps } from "../../../utils/models/storeModel";
import formConfig from '../../../jsons/storeForm.json'

interface Props {
    store: StoreProps;
    title: string;
    modalVisible: boolean;
    submit: (values: StoreProps) => void;
    cancel: () => void;
}

const StoreModal: React.FC<Props> = ({ modalVisible, submit, cancel, title, store }) => {
    const [formInstance, setFormInstance] = useState<any>(null);
    
    const handleOk = async () => {
        try {
            const values = await formInstance.validateFields();
            submit(values);
            if(formInstance){
              formInstance.resetFields();
            }
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const handleCancel = () => {
      if(formInstance){
        console.log('ey', store)
        formInstance.resetFields();
      }
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
            <DynamicForm formConfig={formConfig} initialValues={store} onFormInstance={handleFormInstance} />
        </Modal>
    );
};

export default StoreModal;