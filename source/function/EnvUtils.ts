import { invokeFunction } from './FunctionUtils';
import { HCFunction, Region } from '../common/FnConst';

const { SECRET_KEY: sk, PAGE_NUM: pageNum } = process.env;

export enum EnvStringKey {
    SECRET_KEY = 'sk'
}
export enum EnvNumberKey {
    PAGE_NUM = 'pageNum'
}

export const EnvObj = {
    [EnvStringKey.SECRET_KEY]: {
        env: sk,
        errorMesaage: 'please configure the environment [SECRET_KEY]'
    },
    [EnvNumberKey.PAGE_NUM]: {
        env: pageNum,
        errorMesaage: 'please configure the environment [PAGE_NUM]'
    }
};

export async function getEnv(
    constKey: string,
    regionId: string = Region.GUI_YANG_1
) {
    const res = await invokeFunction(HCFunction.ENV, { constKey }, regionId);
    return res['data'] as string;
}

export async function getEnvBasicValue(
    key: string,
    regionId: string = Region.GUI_YANG_1
) {
    const { env, errorMesaage } = EnvObj[key];
    if (!env) throw new Error(errorMesaage);
    return await getEnv(env, regionId);
}

export async function getEnvStringValue(
    key: EnvStringKey,
    regionId: string = Region.GUI_YANG_1
) {
    return await getEnvBasicValue(key, regionId);
}

export async function getEnvNumberValue(
    key: EnvNumberKey,
    regionId: string = Region.GUI_YANG_1
) {
    return +(await getEnvBasicValue(key, regionId));
}
