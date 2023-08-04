import { verify } from 'jsonwebtoken';
import { Action } from 'routing-controllers';
import { getHWFunction } from '../function/FunctionService';
import { FunctionName, Region } from './FnConst';

export async function getAuthorizationChecker(action: Action) {
    const authorization: string = action.request.headers['authorization'];

    if (!authorization) return;

    const [type, token] = authorization.split(/\s+/);

    try {
        if (type != 'Bearer') throw Error(`the authorization type is 'bearer'`);

        const AUTH_SECRET_KEY = await getEnv('AUTH_SECRET_KEY');

        const obj = verify(token, AUTH_SECRET_KEY);

        if (obj) return obj;
    } catch {
        return;
    }
}

export async function getEnv(
    constKey: string,
    regionId: string = Region.GUI_YANG_1
) {
    return (await getHWFunction(FunctionName.ENV, { constKey }, regionId))[
        'data'
    ] as string;
}

export async function getBearerToken(authorization: string) {
    const [type, token] = authorization.split(/\s+/);
    if (type != 'Bearer') throw Error(`the authorization of type is 'bearer'`);
    if (!token) throw Error('the value of [token] is empty');
    return token;
}
