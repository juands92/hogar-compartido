import { User } from "../../models/user";

export interface UserState {
    userDetails: User | null;
}