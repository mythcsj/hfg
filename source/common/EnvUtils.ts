import { HCFunction } from './FnConst';
import { invokeFunction } from './FunctionUtils';

const { SECRET_KEY: sk, PAGE_NUM: pageNum, PAGE_SIZE: pageSize } = process.env;

export enum EnvStringKey {
    SECRET_KEY = 'SECRET_KEY'
}
export enum EnvNumberKey {
    PAGE_NUM = 'PAGE_NUM',
    PAGE_SIZE = 'PAGE_SIZE'
}

export const EnvObj = {
    [EnvStringKey.SECRET_KEY]: { env: sk },
    [EnvNumberKey.PAGE_NUM]: { env: pageNum },
    [EnvNumberKey.PAGE_SIZE]: { env: pageSize }
};

export async function getEnv(constKey: string) {
    const res = await invokeFunction(HCFunction.ENV, { constKey });
    return res['data'] as string;
}

async function getEnvBasicValue(key: string) {
    const { env } = EnvObj[key];
    if (!env) throw new Error(`please configure the environment [${key}]`);
    return await getEnv(env);
}

export function getEnvStringValue(key: EnvStringKey) {
    return EnvMap.getEnv(key);
}

export function getEnvNumberValue(key: EnvNumberKey) {
    return +EnvMap.getEnv(key);
}

export class EnvMap {
    private static data: Map<string, string>;

    constructor() {
        EnvMap.initData();
    }

    private static async initData() {
        if (!this.data) {
            this.data = new Map<string, string>();
            const EnvKey = { ...EnvNumberKey, ...EnvStringKey };
            for (const key in EnvKey) {
                this.data.set(key, await getEnvBasicValue(`${EnvKey[key]}`));
            }
        }
        return this.data;
    }

    public static getEnv(key: string) {
        const value = this.data.get(key);
        if (!value) throw Error(`the value of environment [${key}] is empty`);
        return value;
    }
}
