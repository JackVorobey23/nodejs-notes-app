import { Category } from "./category";

export default interface updatedNote {
    id: string,
    name: string,
    content: string,
    dates: string[],
    created: string,
    category: Category,
    isArchived: boolean 
}