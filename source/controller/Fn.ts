import {
    Authorized,
    Get,
    HeaderParam,
    JsonController,
    Param
} from 'routing-controllers';
import { getToken } from '../common/CommonUtils';
import { EnvNumberKey, getEnv, getEnvNumberValue } from '../function/EnvUtils';
import { sign, verify } from '../services/FunctionService';

@JsonController('/fn')
export class FnController {
    @Get('/sign')
    async sign() {
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
