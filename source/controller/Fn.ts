import {
    Authorized,
    Get,
    HeaderParam,
    JsonController,
    Param
} from 'routing-controllers';
import { getToken } from '../common/CommonUtils';
import {
    EnvMap,
    EnvStringKey,
    getEnv,
    getEnvStringValue
} from '../common/EnvUtils';
import { sign, verify } from '../function/FunctionService';

@JsonController('/fn')
export class FnController {
    @Get('/sign')
    async sign() {
        console.log(getEnvStringValue(EnvStringKey.SECRET_KEY));
        console.log(EnvMap.getEnv('PAGE_SIZE'));
        return sign({ name: 'mythcsj' });
    }

    @Get('/verify')
    @Authorized()
    async verify(@HeaderParam('authorization') authorization: string) {
        const token = getToken(authorization);
        return verify(token);
    }

    @Get('/env/:constKey')
    async env(@Param('constKey') constKey: string) {
        return getEnv(constKey);
    }
}
