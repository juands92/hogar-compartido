import { createReducer, on } from "@ngrx/store";
import * as UserActions from "../actions/user.actions";
import { UserState } from "../state/user.state";

export const initialUserState: UserState = {
    userDetails: null
};

export const userReducer = createReducer(
    initialUserState,
    on(UserActions.fetchUserDetails, state => ({
        ...state,
        userDetails: null
    })),
    on(UserActions.updateUserProfile, (state, { userProfile }) => ({
        ...state,
        userDetails: userProfile
    }))
);
