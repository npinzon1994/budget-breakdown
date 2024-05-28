export type Expense = {
    date: Date;
    amount: number;
    isPaid: boolean;
    merchant: string;
    onShowEdit: (id: number) => void;
}