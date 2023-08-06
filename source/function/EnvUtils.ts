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
    [EnvStringKey.SECRET_KEY]: { env: sk },
    [EnvNumberKey.PAGE_NUM]: { env: pageNum }
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
    const { env } = EnvObj[key];
    if (!env) throw new Error(`please configure the environment [${key}]`);
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
