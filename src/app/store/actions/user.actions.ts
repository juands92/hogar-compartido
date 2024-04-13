import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user";

export const fetchUserDetails = createAction(
    '[User] Fetch User Details'
);

export const updateUserProfile = createAction(
    '[User] Update User Profile',
    props<{ userProfile: User }>()
);