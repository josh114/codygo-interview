import "source-map-support/register";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as middy from "middy";
import { cors } from "middy/middlewares";

import { getUploads } from "../../business_logic/upload";

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here

    const upload = await getUploads();

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: upload,
      }),
    };
  }
);
handler.use(
  cors({
    origin: "*",
    credentials: false,
  })
);
