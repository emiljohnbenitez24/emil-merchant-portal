import { ItemProps } from "./itemModel";

export interface CategoryProps {
    id?: string;
    name: string;
    description: string;
    items?: ItemProps [] ;
}