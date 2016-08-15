export class User {
    CMSUserID: number;
    UserName: string;
    Password: string;
    FirstName: string;
    LastName: string;
    EmailAddress: string;
    UserTypeID: number;
    Enabled: boolean;
    IsBlogUser: boolean;
    Clocked: boolean;

    static NoUser: User = {
        Clocked: null,
        CMSUserID: -1,
        EmailAddress: null,
        Enabled: null,
        FirstName: "Not",
        IsBlogUser: null,
        LastName: "Assigned",
        Password: null,
        UserName: null,
        UserTypeID: null,
    }
}