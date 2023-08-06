import { HuaweiCloudFunctionName } from '../common/FnConst';
import { EnvKey, getEnvValue } from '../function/EnvUtils';
import { invokeFunction } from '../function/FunctionUtils';

export async function sign(userInfo: any) {
    const secretKey = await getEnvValue(EnvKey.SECRET_KEY);
    const res = await invokeFunction(HuaweiCloudFunctionName.SIGN, {
        secretKey,
        userInfo
    });
    return res['data'];
}

export async function verify(token: string) {
    const secretKey = await getEnvValue(EnvKey.SECRET_KEY);
    const res = invokeFunction(HuaweiCloudFunctionName.VERIFY, {
        secretKey,
        token
    });
    return res['data'];
}
