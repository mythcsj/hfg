import {
    Authorized,
    Get,
    HeaderParam,
    JsonController,
    Param
} from 'routing-controllers';
import { getBearerToken } from '../common/CommonUtils';
import { getSecretKey } from '../common/EnvService';
import { FunctionName } from '../common/FnConst';
import { InvokeFunction } from '../function/FunctionService';

@JsonController('/fn')
export class FnController {
    @Get('/sign')
    async sign() {
        const secretKey = await getSecretKey();
        const res = await InvokeFunction(FunctionName.SIGN, {
            secretKey,
            userInfo: { name: 'mythcsj' }
        });
        return res['data'];
    }

    @Get('/verify')
    @Authorized()
    async verify(@HeaderParam('authorization') authorization: string) {
        const token = await getBearerToken(authorization);
        const secretKey = await getSecretKey();

        return InvokeFunction(FunctionName.VERIFY, {
            secretKey,
            token
        });
    }

    @Get('/env/:constKey')
    async env(@Param('constKey') constKey: string) {
        return InvokeFunction(FunctionName.ENV, { constKey });
    }
}
