import { Button } from 'antd'
import React from 'react';

interface Props {
    title: string;
    onClick: () => void;
}

const PrimaryButton: React.FC<Props> = ({ title, onClick }) => {
    return <Button type='primary' onClick={onClick}>{title}</Button>
}

export default PrimaryButton