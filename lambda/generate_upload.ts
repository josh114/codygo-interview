const AWS = require('aws-sdk'); // Assuming Node.js environment

// Import your environment variables or load credentials from a secure configuration file
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // ... other credentials if needed
};

async function generateSignedUploadUrl(bucketName, objectKey, contentType, expiresIn = 3600) { // Default expiration: 1 hour

  try {
     // Create S3 client with secure credentials
  const s3 = new AWS.S3(credentials);
  console.log('created instancce of s3')

  const params = {
    Bucket: bucketName,
    Key: objectKey,
    ContentType: contentType, // Provide appropriate content type based on the file upload
    // ExpiresIn: expiresIn, // Adjust expiration time as needed
  };
  console.log('about to fetch signed url')
    const url = await s3.getSignedUrlPromise('putObject', params);
    // Optionally, you can add ACL (Access Control List) or CORS (Cross-Origin Resource Sharing) restrictions if needed
    return url;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw for proper error handling
  }
}
