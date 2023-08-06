import { invokeFunction } from './FunctionUtils';
import { HCFunction, Region } from '../common/FnConst';

const { SECRET_KEY: sk } = process.env;

export enum EnvKey {
    SECRET_KEY = 'sk'
}

export const EnvObj = {
    [EnvKey.SECRET_KEY]: {
        env: sk,
        errorMesaage: 'please configure the environment [SECRET_KEY]'
    }
};

export async function getEnv(
    constKey: string,
    regionId: string = Region.GUI_YANG_1
) {
    const res = await invokeFunction(HCFunction.ENV, { constKey }, regionId);
    return res['data'] as string;
}

export async function getEnvValue(
    envKey: EnvKey,
    regionId: string = Region.GUI_YANG_1
) {
    const { env, errorMesaage } = EnvObj[envKey];
    if (!env) throw new Error(errorMesaage);
    return getEnv(env, regionId);
}
