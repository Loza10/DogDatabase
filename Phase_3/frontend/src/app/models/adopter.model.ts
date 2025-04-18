import { User } from "./user.model";

export interface Adopter extends User{
    state: string,
    city: string,
    zip: string,
    street: string,
    householdSize: number
    phone: string

}