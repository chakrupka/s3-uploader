import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs';

const createPresignedUrlWithClient = ({ region, bucket, key }) => {
  const client = new S3Client({ region });
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

export const signS3 = async (req, res) => {
  const fileName = req.query['file-name'];
  const s3Params = {
    bucket: process.env.S3_BUCKET_NAME,
    key: fileName,
    region: process.env.AWS_REGION,
  };
  try {
    const clientURL = await createPresignedUrlWithClient(s3Params);
    const returnData = {
      signedRequest: clientURL,
      url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
    };
    return res.send(JSON.stringify(returnData));
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
};

export const directUpload = async (req, res) => {
  if (!req.file) {
    return res.status(422).json({ error: 'No file provided' });
  }
  const { file } = req;
  const fileStream = fs.createReadStream(file.path);
  const s3Client = new S3Client({
    region: process.env.AWS_REGION,
  });
  const s3Params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.originalname,
    Body: fileStream,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(s3Params);
    await s3Client.send(command);
    await fs.promises.unlink(file.path);
    const publicUrl = `https://${s3Params.Bucket}.s3.amazonaws.com/${s3Params.Key}`;
    return res.send(`${publicUrl}\n`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error uploading file' });
  }
};
