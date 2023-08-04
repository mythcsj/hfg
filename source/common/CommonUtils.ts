import { verify } from 'jsonwebtoken';
import { Action } from 'routing-controllers';
import { getSecretKey } from './EnvService';

export async function getAuthorizationChecker(action: Action) {
    const authorization: string = action.request.headers['authorization'];

    if (!authorization) return;

    const [type, token] = authorization.split(/\s+/);

    try {
        if (type != 'Bearer') throw Error(`the authorization type is 'bearer'`);

        const secretKey = await getSecretKey();

        const obj = verify(token, secretKey);

        if (obj) return obj;
    } catch {
        return;
    }
}

export async function getBearerToken(authorization: string) {
    const [type, token] = authorization.split(/\s+/);
    if (type != 'Bearer') throw Error(`the authorization of type is 'bearer'`);
    if (!token) throw Error('the value of [token] is empty');
    return token;
}
