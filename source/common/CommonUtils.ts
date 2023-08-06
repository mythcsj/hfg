import { Action } from 'routing-controllers';
import { EnvKey, getEnvValue } from '../function/EnvUtils';
import { invokeFunction } from '../function/FunctionUtils';
import { HuaweiCloudFunctionName } from './FnConst';

export async function getAuthorizationChecker(action: Action) {
    const authorization: string = action.request.headers['authorization'];

    if (!authorization) return;

    const [type, token] = authorization.split(/\s+/);

    try {
        if (type != 'Bearer') throw Error(`the authorization type is 'bearer'`);

        const secretKey = await getEnvValue(EnvKey.SECRET_KEY);

        const obj = await invokeFunction(HuaweiCloudFunctionName.VERIFY, {
            secretKey,
            token
        });

        if (obj) return obj['data'];
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
