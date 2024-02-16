import "source-map-support/register";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors, httpErrorHandler } from "middy/middlewares";

import { createAttachmentPresignedUrl } from "../../business_logic/upload";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const uploadedUrl = await createAttachmentPresignedUrl();
    return {
      statusCode: 201,
      body: JSON.stringify({
        uploadUrl: uploadedUrl,
      }),
    };
  }
);

handler.use(httpErrorHandler()).use(
  cors({
    origin: "*",
    credentials: false,
  })
);
