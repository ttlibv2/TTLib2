export interface PopupOption {
    left?: number;
    top?: number;
    height?: number;
    width?: number;
    centerscreen?: 0 | 1;
}

export interface ErrorResponse {
    error: string;
    error_description?: string;
    error_uri?: string;
}

