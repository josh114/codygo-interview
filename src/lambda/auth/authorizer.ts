import { CustomAuthorizerEvent, CustomAuthorizerResult } from "aws-lambda";
import "source-map-support/register";
import * as uuid from "uuid";
import { createLogger } from "../../utils/logger";

const logger = createLogger("auth");

exports.handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  logger.info("Authorizing a user");
  const id: string = uuid.v4();
  return {
    principalId: id,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: "*",
        },
      ],
    },
  };
};
