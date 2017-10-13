import { Observable, Observer } from 'rxjs';
import { GrantType } from './GrantType';
import { TokenResponse } from './TokenResponse';

export class TokenRequest {

    grantType: GrantType;

    execute(): Observable<TokenResponse> {
        return Observable.create((ob: Observer<TokenResponse>) => {
            this.grantType.build();

        });
    }



}