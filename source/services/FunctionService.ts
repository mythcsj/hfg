import { HCFunction } from '../common/FnConst';
import { EnvStringKey, getEnvStringValue } from '../function/EnvUtils';
import { invokeFunction } from '../function/FunctionUtils';

export async function sign(userInfo: any) {
    const secretKey = await getEnvStringValue(EnvStringKey.SECRET_KEY);
    const res = await invokeFunction(HCFunction.SIGN, {
        secretKey,
        userInfo
    });
    return res['data'];
}

export async function verify(token: string) {
    const secretKey = await getEnvStringValue(EnvStringKey.SECRET_KEY);
    const res = invokeFunction(HCFunction.VERIFY, {
        secretKey,
        token
    });
    return res['data'];
}
