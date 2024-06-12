class Account {
  _id: string;
  associatedUser_ID: string;
  accountSlug: string;
  type: string;
  nickName: string;
  accountNumber: string;
  balance: string;
  icon: string;
  creditLimit?: number;
  billingDate?: string;
  dueDate?: string;

  constructor(
    _id: string,
    associatedUser_ID: string,
    accountSlug: string,
    type: string,
    nickName: string,
    accountNumber: string,
    balance: string,
    icon: string,
    creditLimit?: number,
    billingDate?: string,
    dueDate?: string
  ) {
    this._id = _id;
    this.associatedUser_ID = associatedUser_ID;
    this.accountSlug = accountSlug;
    this.type = type;
    this.nickName = nickName;
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.icon = icon;
    this.creditLimit = creditLimit;
    this.billingDate = billingDate;
    this.dueDate = dueDate;
  }
}

export default Account;
