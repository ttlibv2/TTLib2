export const PopupName = {

    /** URL is loaded into a new window. This is default */
    BLANK: '_blank',

    /** URL is loaded into the parent frame */
    PARENT: '_parent',

    /** URL replaces the current page */
    SELF: '_self',

    /** URL replaces any framesets that may be loaded */
    TOP: '_top'
};

export const GRANT_TYPE = {
    AuthCode: 'authorization_code',
    PASSWORD: 'password',
    TOKEN: 'refresh_token',
    CLIENT: 'client_credentials',
    JWT_BEAR: '',
}

export const Content_Type = {
    FORM: 'application/x-www-form-urlencoded',
    JSON: 'application/json'
};

export const ERROR_CODE = {
    invalid_request: 'The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed.',
    invalid_client: 'Client authentication failed (e.g., unknown client, no client authentication included, or unsupported authentication method)',
    invalid_grant: 'The provided authorization grant (e.g., authorization code, resource owner credentials) or refresh token is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.',
    access_denied: 'The resource owner or authorization server denied the request.',
    invalid_scope: 'The requested scope is invalid, unknown, or malformed.',
    server_error: 'The authorization server encountered an unexpected condition that prevented it from fulfilling the request.',
    idpiframe_initialization_failed: 'Failed to initialize a required iframe from %s, for instance, due to an unsupported environment. A details property will give more information on the error raised.',
    unauthorized_client: 'The client is not authorized to request an authorization code using this method.',
    unsupported_grant_type: 'The authorization grant type is not supported by the authorization server.',
    unsupported_response_type: 'The authorization server does not support obtaining an authorization code using this method.',
    immediate_failed: 'No user could be automatically selected without prompting the consent flow. Error raised when using signIn with prompt: \'none\' option.',
    popup_closed_by_user: 'The user closed the popup before finishing the sign in flow.',
    time_out: ''
}