// Weird eslint bug on action types
/* eslint-disable no-unused-vars */
export type AccountState = {
  isLoading: boolean
  account: {
    address: string
    secret?: string
  } | null
}

const initialState: AccountState = {
  isLoading: false,
  account: null,
}

export enum AccountActionTypes {
  SET_ACCOUNT = "SET_ACCOUNT",
  SET_IS_ACCOUNT_LOADING = "SET_IS_ACCOUNT_LOADING",
}

export type AccountAction =
  | {
      type: AccountActionTypes.SET_ACCOUNT

      payload: {
        address: string
        secret?: string
      } | null
    }
  | { type: AccountActionTypes.SET_IS_ACCOUNT_LOADING; payload: boolean }

const reducer = (state: AccountState, action: AccountAction): AccountState => {
  switch (action.type) {
    case AccountActionTypes.SET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      }
    case AccountActionTypes.SET_IS_ACCOUNT_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return state
  }
}

export { initialState, reducer }
