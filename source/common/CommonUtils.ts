import { Action } from 'routing-controllers';
import { EnvStringKey, getEnvStringValue } from './EnvUtils';
import { invokeFunction } from '../function/FunctionUtils';
import { HCFunction } from './FnConst';

export async function getAuthorizationChecker(action: Action) {
    const authorization: string = action.request.headers['authorization'];
    if (!authorization) return;

    try {
        const user = await getUser(getToken(authorization));
        if (user) return user;
    } catch {
        return;
    }
}

export function getToken(authorization: string) {
    const [type, token] = authorization.split(/\s+/);
    if (type != 'Bearer') throw Error(`the authorization of type is 'bearer'`);
    if (!token) throw Error('the value of [token] is empty');
    return token;
}

export async function getUser(token: string) {
    const secretKey = await getEnvStringValue(EnvStringKey.SECRET_KEY);

    const obj = await invokeFunction(HCFunction.VERIFY, {
        secretKey,
        token
    });

    if (!obj) throw Error('user information is empty');
    return obj['data'];
}
