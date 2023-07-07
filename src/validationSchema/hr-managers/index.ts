import * as yup from 'yup';

export const hrManagerValidationSchema = yup.object().shape({
  employee_data: yup.string(),
  time_tracking: yup.string(),
  performance_evaluation: yup.string(),
  engagement_tools: yup.string(),
  automation_tools: yup.string(),
  user_id: yup.string().nullable(),
});
