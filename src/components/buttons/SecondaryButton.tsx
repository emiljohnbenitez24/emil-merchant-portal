import { Button } from 'antd'
import React from 'react';

interface Props {
    title: string;
    onClick: () => void;
}

const SecondaryButton: React.FC<Props> = ({ title, onClick }) => {
    return <Button type='default' onClick={onClick}>{title}</Button>
}

export default SecondaryButton