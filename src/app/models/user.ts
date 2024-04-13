export interface User {
    id: number;
    dateOfBirth: string;
    email: string;
    lastName: string;
    name: string;
    password: string;
    role: string;
    termsAccepted: boolean;
    homeId: number;
    profilePictureUrl?: string;
}