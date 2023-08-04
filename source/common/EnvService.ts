import { InvokeFunction } from '../function/FunctionService';
import { FunctionName, Region } from './FnConst';

const { SECRET_KEY: sk } = process.env;

export async function getEnv(
    constKey: string,
    regionId: string = Region.GUI_YANG_1
) {
    return (await InvokeFunction(FunctionName.ENV, { constKey }, regionId))[
        'data'
    ] as string;
}

export function getSecretKey() {
    return getEnv(sk);
}
