export enum TodoStatus {
  COMPLETED = 'COMPLETED',
  INCOMPLETE = 'INCOMPLETE',
}

export enum TodoTab {
  ALL = 'ALL',
  COMPLETED = 'COMPLETED',
  INCOMPLETE = 'INCOMPLETE',
}

export interface TodoResponse {
  id: string;
  content: string;
  status: TodoStatus;
  created_date: string;
  user_id: string;
}
