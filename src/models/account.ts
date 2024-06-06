class Account {
  _id: string;
  associatedUser_ID: string;
  accountSlug: string;
  type: string;
  nickName: string;
  bank: string;
  accountNumber: string;
  routingNumber: string;
  balance: string;

  constructor(
    _id: string,
    associatedUser_ID: string,
    accountSlug: string,
    type: string,
    nickName: string,
    bank: string,
    accountNumber: string,
    routingNumber: string,
    balance: string
  ) {
    this._id = _id;
    this.associatedUser_ID = associatedUser_ID;
    this.accountSlug = accountSlug;
    this.type = type;
    this.nickName = nickName;
    this.bank = bank;
    this.accountNumber = accountNumber;
    this.routingNumber = routingNumber;
    this.balance = balance;
  }
}

export default Account;
