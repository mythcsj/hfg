import { Get, JsonController } from 'routing-controllers';
import { getHWFunction } from '../function/FunctionService';
import { FunctionName, Region } from '../common/FnConst';

@JsonController('/fn')
export class FnController {
    @Get('/sign')
    sign() {
        return getHWFunction(Region.GUI_YANG_1, FunctionName.SIGN, { re: '1' });
    }
}
