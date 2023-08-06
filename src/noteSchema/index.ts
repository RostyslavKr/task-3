import * as yup from 'yup';
// Validation schema using Yup
export const noteSchema = yup.object().shape({
  name: yup.string().required(),
  created: yup.string().required(),
  content: yup.string().required(),
  category: yup.string().required(),
  dates: yup.array().of(yup.string()).required(),
  archived: yup.boolean().required(),
});
