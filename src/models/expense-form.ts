export type ExpenseFormProps = {
  id?: string;
  mode?: string;
  title: string;
  onClose: () => void;
  onDelete?: () => void;
};
