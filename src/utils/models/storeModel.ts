import { CategoryProps } from "./categoryModel"

export interface StoreProps {
    id?: string,
    name: string,
    description: string,
    address: string
    categories?: CategoryProps []
}
