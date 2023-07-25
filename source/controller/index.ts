import { createAPI } from 'koagger';

import { isProduct } from '../model';
import { UserController } from './User';
import { FnController } from './Fn';

export * from './User';

export const { swagger, mocker, router } = createAPI({
    mock: !isProduct,
    controllers: [UserController, FnController]
});
