import { FunctionName, Region } from '../common/FnConst';
import { getSecretKey } from '../function/EnvUtils';
import { invokeFunction } from '../function/FunctionUtils';

export async function sign(userInfo: any) {
    const secretKey = await getSecretKey();
    const res = await invokeFunction(FunctionName.SIGN, {
        secretKey,
        userInfo
    });
    return res['data'];
}

export async function verify(token: string) {
    const secretKey = await getSecretKey();
    const res = invokeFunction(FunctionName.VERIFY, {
        secretKey,
        token
    });
    return res['data'];
}
