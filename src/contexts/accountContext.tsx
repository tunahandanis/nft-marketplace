import React, { createContext, useContext, useReducer } from "react";

import {
  AccountAction,
  AccountActionTypes,
  AccountState,
  initialState,
  reducer,
} from "../reducers/accountReducer";

const xrpl = require("xrpl");

type AccountContextType = [AccountState, React.Dispatch<AccountAction>];

export type Props = {
  children: React.ReactNode;
};

//@ts-ignore
const AccountContext = createContext<AccountContextType>(null);

const AccountContextProvider = (props: Props): JSX.Element => {
  const [accountState, accountDispatch] = useReducer(reducer, initialState);

  return (
    <AccountContext.Provider value={[accountState, accountDispatch]}>
      {props.children}
    </AccountContext.Provider>
  );
};

async function connectWallet(dispatch: React.Dispatch<AccountAction>) {
  try {
    const api = new xrpl.Client("wss://s.altnet.rippletest.net:51233");

    await api.connect();

    const wallet = xrpl.Wallet.generate();

    const payload = {
      classicAddress: wallet.classicAddress,
      secret: wallet.seed,
    };

    dispatch({ type: AccountActionTypes.SET_ACCOUNT, payload });

    api.disconnect();
  } catch (error) {
    console.log(error);
  }
}

const useAccountContext = () => useContext(AccountContext);

export { AccountContextProvider, connectWallet, useAccountContext };
