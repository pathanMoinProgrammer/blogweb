import * as Yup from 'yup';

export const blogSchema = Yup.object().shape({
  blogName: Yup.string().required('Blog name is required'),
  enurl: Yup.string()
    .url('Must be a valid URL')
    .required('Blog URL is required'),
  title: Yup.string().required('Blog title is required'),
  description: Yup.string()
    .min(20, 'Description should be at least 20 characters')
    .required('Description is required'),
  imgUrl: Yup.string().url('Invalid image URL').nullable(),
  author: Yup.string().required('Author name required'),
});
