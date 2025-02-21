import axios from 'axios';

const getSignedRequest = async (file) => {
  const ROOT_URL = 'https://aws-upload-gkgt.onrender.com/api';
  const fileName = encodeURIComponent(file.name);
  const response = await axios.get(
    `${ROOT_URL}/sign-s3?file-name=${fileName}&file-type=${file.type}`,
  );
  console.log(response);
  return response;
};

const uploadFileToS3 = async (signedRequest, file, url) => {
  await axios.put(signedRequest, file, {
    headers: { 'Content-Type': file.type },
  });
  return url;
};

const uploadImage = async (file) => {
  const response = await getSignedRequest(file);
  return uploadFileToS3(response.data.signedRequest, file, response.data.url);
};

export default uploadImage;
