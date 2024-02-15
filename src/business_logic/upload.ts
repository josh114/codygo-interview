import { createLogger } from "../utils/logger";
import { AttachmentUtils } from "./attachmentUtils";

const logger = createLogger("uploadObject");
const attachmentUtils = new AttachmentUtils();

export async function createAttachmentPresignedUrl(): Promise<string> {
  logger.info("get attcahment url function invoked");
  return attachmentUtils.getUploadUrl() as string;
}

export async function getUploads(): Promise<string[]> {
  const uploads: string[] = [];

  return uploads;
}
