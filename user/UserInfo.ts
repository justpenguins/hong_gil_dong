export interface UserInfo {
    stocks: Stock[],
    money: number
}

export interface Stock {
    name: string,
    amount: number
}