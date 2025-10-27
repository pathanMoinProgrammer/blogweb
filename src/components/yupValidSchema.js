import { checkSlugAvailability } from '@/lib/utils';
import * as Yup from 'yup';

export const blogSchema = Yup.object().shape({
  blogName: Yup.string().required('Blog name is required'),
  slug: Yup.string()
    .required('URL slug is required')
    .test('is-available', 'Slug not available', async (value) => {
      if (!value) return false;
      const available = await checkSlugAvailability(value);
      return available;
    }),
  title: Yup.string().required('Blog title is required'),
  description: Yup.string()
    .min(20, 'Description should be at least 20 characters')
    .required('Description is required'),
  imgUrl: Yup.string()
    .url('Invalid image URL')
    .required('Image Url is required'),
  author: Yup.string().required('Author name required'),
});
