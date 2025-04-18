import { User } from "./user.model";

export interface Volunteer extends User{
    phone: string,
    milestoneBirthday?: string
}