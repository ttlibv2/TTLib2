import { ParamOption } from "../option";

export class TokenResponse {
    private access_token: string;
    private id_token: string;
    private refresh_token: string;
    private token_type: string;
    private expires_in: number;

    constructor(data: { [key: string]: string | number }) {
        Object.assign(this, data);
    }

    getAccessToken(): string { return this.access_token; }




}