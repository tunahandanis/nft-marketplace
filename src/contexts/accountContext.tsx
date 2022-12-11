import React, { createContext, useContext, useReducer } from "react"

import { CheckOutlined, SmileOutlined } from "@ant-design/icons"

import { CopyToClipboard } from "react-copy-to-clipboard"

import { notification, message } from "antd"

// import { postData } from "utils/http"
import { createClient } from "@supabase/supabase-js"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

import {
  AccountAction,
  AccountActionTypes,
  AccountState,
  initialState,
  reducer,
} from "../reducers/accountReducer"

const xrpl = require("xrpl")

type AccountContextType = [AccountState, React.Dispatch<AccountAction>]

export type Props = {
  children: React.ReactNode
}

//@ts-ignore
const AccountContext = createContext<AccountContextType>(null)

const AccountContextProvider = (props: Props): JSX.Element => {
  const [accountState, accountDispatch] = useReducer(reducer, initialState)
  /* const supabase =  */ useSupabaseClient()
  return (
    <AccountContext.Provider value={[accountState, accountDispatch]}>
      {props.children}
    </AccountContext.Provider>
  )
}

async function connectWallet(
  dispatch: React.Dispatch<AccountAction>,
  importedSeed?: string
) {
  dispatch({ type: AccountActionTypes.SET_IS_ACCOUNT_LOADING, payload: true })

  let client
  let wallet
  try {
    client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await client.connect((value: any) => {
      console.log("Connected!", value)
    })
    if (importedSeed) {
      wallet = xrpl.Wallet.fromSeed(importedSeed)
      console.log(wallet)

      notification.open({
        message: `Welcome back `,
        placement: "bottomRight",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      })
    } else {
      wallet = (await client.fundWallet()).wallet
      console.log(wallet)
      await updateUserWallet(wallet)

      const btn = (
        <CopyToClipboard
          text={wallet.seed}
          onCopy={() => {
            message.open({
              type: "info",
              content: "Copied to clipboard",
            })
          }}
        >
          <span style={{ color: "#40a9ff", cursor: "pointer" }}>
            {wallet.seed}
          </span>
        </CopyToClipboard>
      )

      notification.open({
        message: `You generated a new XRP wallet`,
        description: "Save this private seed value to recover later:",
        btn,
        placement: "bottomRight",
        duration: 0,
        icon: <CheckOutlined style={{ color: "#108ee9" }} />,
      })
    }

    const { address, classicAddress, seed, privateKey, publicKey } = wallet

    dispatch({ type: AccountActionTypes.SET_WALLET, payload: wallet })
    dispatch({ type: AccountActionTypes.SET_CLIENT, payload: client })

    let response
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        response = await client.request({
          command: "account_info",
          account: address,
          ledger_index: "validated",
        })
        console.log(
          "\n\n----------------Get XRPL NFT Seller's Wallet Account Info----------------"
        )
        console.log(JSON.stringify(response, null, 2))

        const payload = {
          address: response.result.account_data.Account,
          balance: Number(response.result.account_data.Balance) / 1000000,
          classicAddress: classicAddress,
          secret: seed,
          privateKey: privateKey,
          publicKey: publicKey,
        }

        response = await client.request({
          command: "account_nfts",
          account: address,
          ledger_index: "validated",
        })

        const payloadWithNfts = {
          ...payload,
          nfts: response.result.account_nfts,
        }

        dispatch({
          type: AccountActionTypes.SET_ACCOUNT,
          payload: payloadWithNfts,
        })
        dispatch({
          type: AccountActionTypes.SET_IS_ACCOUNT_LOADING,
          payload: false,
        })

        break
      } catch (e) {
        console.error(e)
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    client.disconnect()
  } catch (error) {
    console.log(error)
  }
}

async function updateUserWallet(wallet: string) {
  const supabase = await createClient(
    "https://lqmvvslhcfindyifblyk.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxbXZ2c2xoY2ZpbmR5aWZibHlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk0MjY3ODUsImV4cCI6MTk4NTAwMjc4NX0.ElePLMRZGn4pkHac0ZQj7AfHnGXWGBLaQbs_uyJ9pW0"
  )
  const { /* data, */ error } = await supabase.from("collections").insert({
    //@ts-ignore
    wallet_address: wallet?.classicAddress,
    collections: {},
  })
  // retrieve the list of all wallets
  console.log("The data received from insert => ", error)
}

/* async function insertNFTForSale(cid: string) {

}

async function updateUserCollection(nft_token_id: string) {

}
 */

const updateNFTs = async (
  dispatch: React.Dispatch<AccountAction>,
  address: string
) => {
  let client
  client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
  await client.connect()

  const response = await client.request({
    command: "account_nfts",
    account: address,
    ledger_index: "validated",
  })

  dispatch({
    type: AccountActionTypes.UPDATE_NFTS,
    payload: {
      newNfts: response.result.account_nfts,
    },
  })

  await client.disconnect()
}

const updateBalance = async (
  dispatch: React.Dispatch<AccountAction>,
  address: string
) => {
  let client
  client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
  await client.connect()

  const response = await client.request({
    command: "account_info",
    account: address,
    ledger_index: "validated",
  })

  dispatch({
    type: AccountActionTypes.UPDATE_BALANCE,
    payload: {
      newBalance: Number(response.result.account_data.Balance) / 1000000,
    },
  })

  await client.disconnect()
}

const getSellOffers = async (tokenId: string) => {
  // setIsLoading(true);
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
  await client.connect()
  console.log(tokenId)
  let nftSellOffers
  nftSellOffers = await client.request({
    method: "nft_sell_offers",
    nft_id: tokenId,
  })

  return nftSellOffers.result.offers
}

const useAccountContext = () => useContext(AccountContext)

export {
  AccountContextProvider,
  connectWallet,
  useAccountContext,
  updateNFTs,
  updateBalance,
  getSellOffers,
  updateUserWallet,
}
