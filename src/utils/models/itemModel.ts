import { OptionProps } from "./OptionModel";

export interface ItemProps {
    id?: string,
    name: string,
    price: number,
    stock: number,
    cost: number,
    category: string,
    options?: OptionProps[]
}