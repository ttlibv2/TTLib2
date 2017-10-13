export const ContentType = {
    JSON: 'application/json',
    FORM_URL_ENCODED: 'application/x-www-form-urlencoded'
};

export const GrantType: {[name: string]: string} = {
    AuthCode: ''
};

export interface PopupOption {
    left?: number;
    top?: number;
    height?: number;
    width?: number;
    centerscreen?: 0 | 1;
}

export interface OAuthEndpoint
{
    auth_uri?: string;

    token_uri?: string;

    revoke_uri?: string;
}
