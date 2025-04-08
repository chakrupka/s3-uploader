import { Router } from 'express';
import multer from 'multer';
import { signS3, directUpload } from './services/s3';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
  res.json({ message: 'API' });
});

router.get('/sign-s3', signS3);

router.post('/upload', upload.single('image'), directUpload);

export default router;
