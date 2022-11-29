export type AccountState = {
  account: {
    classicAddress: string;
    secret: string;
  } | null;
};

const initialState: AccountState = {
  account: null,
};

export enum AccountActionTypes {
  // Weird eslint bug
  // eslint-disable-next-line no-unused-vars
  SET_ACCOUNT = "SET_ACCOUNT",
}

export type AccountAction = {
  type: AccountActionTypes.SET_ACCOUNT;
  payload: {
    classicAddress: string;
    secret: string;
  } | null;
};

const reducer = (state: AccountState, action: AccountAction): AccountState => {
  switch (action.type) {
    case AccountActionTypes.SET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      };
    default:
      return state;
  }
};

export { initialState, reducer };
