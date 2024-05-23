export type ResultResponse<T = {}> = {
  data: T;
  messages: string[];
  fieldsErrors: string[];
  resultCode: number;
};
