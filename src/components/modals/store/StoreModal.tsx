import { Form, Input, Modal } from "antd"
import storeForm from '../../../jsons/storeForm.json'
import { StoreProps } from "../../../utils/models/storeModel";
import React, { useEffect } from "react";


interface Props {
  store: StoreProps,
  title: string,
  modalVisible: boolean,
  submit: (values: StoreProps) => void;
  cancel: () => void;
}

const StoreModal: React.FC<Props> = ({ modalVisible, submit, cancel, title, store }) => {

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(store)
  }, [store])

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
    return storeForm.map((field) => {
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
    >
      {renderFormItems()}
    </Form>
  </Modal>
}

export default StoreModal