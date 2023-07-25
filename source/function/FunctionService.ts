import { BasicCredentials } from '@huaweicloud/huaweicloud-sdk-core';
import {
    FunctionGraphClient,
    InvokeFunctionRequest
} from '@huaweicloud/huaweicloud-sdk-functiongraph';

const {
    HW_CLOUD_AK: ak,
    HW_CLOUD_SK: sk,
    HW_CLOUD_ENDPOINT: endpoint,
    HW_CLOUD_PROJECT_ID: projectId
} = process.env;

export function getHWFunction(
    regionId: string,
    functionName: string,
    data: any
) {
    const client = HWFunctionClient.getInstance();

    const request = new InvokeFunctionRequest();
    request.functionUrn = `urn:fss:${regionId}:${projectId}:function:default:${functionName}:latest`;
    request.withBody({ data });

    return client.invokeFunction(request);
}

class HWFunctionClient {
    private static instance: FunctionGraphClient;

    public static getInstance() {
        if (!this.instance) {
            this.instance = FunctionGraphClient.newBuilder()
                .withCredential(
                    new BasicCredentials()
                        .withAk(ak)
                        .withSk(sk)
                        .withProjectId(projectId)
                )
                .withEndpoint(endpoint)
                .build();
        }
        return this.instance;
    }
}
