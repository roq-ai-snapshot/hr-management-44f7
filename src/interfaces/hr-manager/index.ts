import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface HrManagerInterface {
  id?: string;
  user_id?: string;
  employee_data?: string;
  time_tracking?: string;
  performance_evaluation?: string;
  engagement_tools?: string;
  automation_tools?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface HrManagerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  employee_data?: string;
  time_tracking?: string;
  performance_evaluation?: string;
  engagement_tools?: string;
  automation_tools?: string;
}
