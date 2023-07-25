import { Get, JsonController } from 'routing-controllers';
import { getHWFunction } from '../function/FunctionService';
import { FunctionName, Region } from '../common/FnConst';

@JsonController('/fn')
export class FnController {
    @Get('/sign')
    sign() {
        return getHWFunction(Region.GUI_YANG_1, FunctionName.SIGN, { re: '1' });
    }

    @Get('/verify')
    verify() {
        return getHWFunction(Region.GUI_YANG_1, FunctionName.VERIFY, {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZSI6IjEiLCJpYXQiOjE2OTAyNzE0NTEsImV4cCI6MTY5MDM1Nzg1MX0.jg0jNV2EL-7uy6DW1CH-_dRp7SmYioAn3AwHPEl2agY'
        });
    }
}
