class Transaction {
  _id: string;
  associatedAccount_ID: string;
  type: string;
  date: Date;
  amount: number;
  merchant: string;
  onShowEdit: (id: number) => void;
  outsideAccount_ID?: string;

  constructor(
    _id: string,
    associatedAccount_ID: string,
    type: string,
    date: Date,
    amount: number,
    merchant: string,
    onShowEdit: (id: number) => void,
    outsideAccount_ID?: string,
  ) {
    this._id = _id;
    this.associatedAccount_ID = associatedAccount_ID;
    this.type = type;
    this.date = date;
    this.amount = amount;
    this.merchant = merchant;
    this.onShowEdit = onShowEdit;
    this.outsideAccount_ID = outsideAccount_ID;
  }
}

export default Transaction;
