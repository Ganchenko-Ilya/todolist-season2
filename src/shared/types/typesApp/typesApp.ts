export type StatusType = "idle" | "loading" | "succeeded" | "failed";
export type messageInfo = {
  errorInfo?: null | string;
  succeededInfo?: null | string;
};
export type FilterType = "All" | "Active" | "Complited";
