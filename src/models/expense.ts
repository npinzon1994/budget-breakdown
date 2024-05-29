export type Expense = {
    id: string;
    date: Date;
    amount: number;
    isPaid: boolean;
    merchant: string;
    // onShowEdit: (id: number) => void;
}