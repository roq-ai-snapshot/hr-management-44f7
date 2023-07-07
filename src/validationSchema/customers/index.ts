import * as yup from 'yup';

export const customerValidationSchema = yup.object().shape({
  interaction_history: yup.string(),
  user_id: yup.string().nullable(),
});
