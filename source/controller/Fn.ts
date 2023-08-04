import {
    Authorized,
    Get,
    HeaderParam,
    JsonController,
    Param
} from 'routing-controllers';
import { getHWFunction } from '../function/FunctionService';
import { FunctionName, Region } from '../common/FnConst';
import { getBearerToken, getEnv } from '../common/CommonUtils';

@JsonController('/fn')
export class FnController {
    @Get('/sign')
    async sign() {
        const secretKey = await getEnv('AUTH_SECRET_KEY');

        const res = await getHWFunction(FunctionName.SIGN, {
            secretKey,
            userInfo: { name: 'mythcsj' }
        });
        return res['data'];
    }

    @Get('/verify')
    @Authorized()
    async verify(@HeaderParam('authorization') authorization: string) {
        const token = getBearerToken(authorization);
        const secretKey = await getEnv('AUTH_SECRET_KEY');

        return getHWFunction(FunctionName.VERIFY, {
            secretKey,
            token
        });
    }

    @Get('/env/:constKey')
    async env(@Param('constKey') constKey: string) {
        return getHWFunction(FunctionName.ENV, { constKey });
    }
}
