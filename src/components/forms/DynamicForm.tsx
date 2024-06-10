import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import { ItemProps } from "../../utils/models/itemModel";
import { CategoryProps } from "../../utils/models/categoryModel";
import { StoreProps } from "../../utils/models/storeModel";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import './DynamicForm.scss'

interface FormField {
    name: string;
    label?: string;
    type: string;
    required: boolean;
    categories?: any[];
    options?: any[];
}

interface Props {
    isItem?: boolean;
    formConfig: FormField[];
    initialValues: ItemProps | CategoryProps | StoreProps;
    onFormInstance: (form: any) => void;
}

const DynamicForm: React.FC<Props> = ({ formConfig, initialValues, onFormInstance, isItem }) => {
    const [additionalFieldLength, setAdditionalFieldLength] = useState(0)
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(initialValues);
        onFormInstance(form)
        if (isItem) {
            const itemValues = initialValues as ItemProps;
            setAdditionalFieldLength(itemValues?.options ? itemValues.options?.length : 0)
        }
    }, [initialValues]);

    const renderFormItems = () => {
        return formConfig.map((field) => {
            console.log(additionalFieldLength)
            const shouldHideField = additionalFieldLength && (field.name === "price" || field.name === "cost" || field.name === "stock");
            if (shouldHideField) return null;
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
                            rules={[
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

    const renderAdditionalFields = () => {
        return <Form.List name="options">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }, index) => (
                        <div key={key} className="additional-fields-container">
                            <Form.Item
                                {...restField}
                                name={[name, 'name']}
                                label={`Option ${index + 1} Name`}
                                rules={[{ required: true, message: `Option ${index + 1} Name is required` }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'price']}
                                label={`Option ${index + 1} Price`}
                                rules={[{ required: true, message: `Option ${index + 1} Price is required` }]}
                            >
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'stock']}
                                label={`Option ${index + 1} Stock`}
                                rules={[{ required: true, message: `Option ${index + 1} Stock is required` }]}
                            >
                                <Input type="number" />
                            </Form.Item>
                            <SecondaryButton title="Remove Option" onClick={() => {
                                setAdditionalFieldLength(prev => prev - 1)
                                remove(name)
                            }} />
                        </div>
                    ))}
                    <br />
                    <Form.Item>
                        <PrimaryButton title="Add Option" onClick={() => {
                            setAdditionalFieldLength(prev => prev + 1)
                            add()
                        }} />
                    </Form.Item>
                </>
            )}
        </Form.List>

    };

    return (
        <Form
            form={form}
            layout="vertical"
        >
            {renderFormItems()}
            {isItem && renderAdditionalFields()}
        </Form>
    );
};

export default DynamicForm