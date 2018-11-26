import axios from "axios";
import _ from 'lodash';

// export const setPage = () => {
//   return function (dispatch) {
//     axios.post("/addresses").then((response) => {
//         dispatch({type: "SET_CURRENT_PAGE", currentPage: response.data.addresses})
//       })
//       .catch((err) => {
//
//       })
//   }
// }


export const logout = () => {
  return function (dispatch) {
    // axios.post("/addresses").then((response) => {
    //     dispatch({type: "LOGIN"})
    //   })
    //   .catch((err) => {
    //
    //   })
    dispatch({type: "LOGOUT"})
  }
}

export const login = (email, password) => {
  return function (dispatch) {
    axios.post("/login",{
        "email": email,
        "password": password
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({type: "LOGIN",
            accessToken: response.data.accessToken,
            userId: response.data.userId,
            emailAddress: response.data.emailAddress
          })
        }else if(response.data.message == "insufficient rights"){
          dispatch({type: "LOGIN_INSUFFICIENT_RIGHTS"})
        }else{

        }
      })
      .catch((err) => {

      })
  }
}

export const checkNetwork = () => {
  return function (dispatch) {
    axios.post("/checkNetwork").then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "NETWORK_DETECTED",
            network: response.data.network
          })
        }
      })
      .catch((err) => {

      })
  }
}

export const registration = (email, password) => {
  return function (dispatch) {
    axios.post("/registration",{
        "email": email,
        "password": password
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({type: "REGISTRATION"})
        }
      })
      .catch((err) => {

      })
  }
}

export const addAdmin = (name, email, password) => {
  return function (dispatch) {
    axios.post("/addAdmin",{
        "name": name,
        "email": email,
        "password": password
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "ADD_USER",
            "name": name
          })
          dispatch(addConsumerFinancialAccount(response.data.userId));
        }
      })
      .catch((err) => {

      })
  }
}

export const addMerchantUser = (name, email, password) => {
  return function (dispatch, getState) {
    axios.post("/addMerchantUser",{
        "accessToken": getState().app.accessToken,
        "name": name,
        "email": email,
        "password": password
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({type: "ADD_ADMIN"})
          dispatch(addConsumerFinancialAccount(response.data.userId));
        }
      })
      .catch((err) => {

      })
  }
}

export const addConsumerFinancialAccount = (userId) => {
  return function (dispatch, getState) {
    axios.post("/addConsumerFinancialAccount",{
        "userId": userId,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({type: "ADD_CONSUMER_FINANCIAL_ACCOUNT"})
        }
      })
      .catch((err) => {

      })
  }
}

export const deleteUser = (userId) => {
  return function (dispatch, getState) {
    axios.post("/deleteUser",{
        "userId": userId,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "DELETED_USER",
            userId: userId
          })
        }
      })
      .catch((err) => {

      })
  }
}

export const generateAddress = (accountId) => {
  return function (dispatch, getState) {
    //console.log(getState().app.merchantAccountList.walletKeyNum)
    var accountWalletKeyNum = _.result(_.find(getState().app.merchantAccountList, function(obj) {
        return obj.merchantId === accountId;
    }), 'walletKeyNum');
    console.log(accountWalletKeyNum);

    dispatch({
      type: "GENERATE_ADDRESS"
    })
    axios.post("/generateAddress",{
        "accountId": accountId,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          if(accountWalletKeyNum && accountWalletKeyNum >= 0){
           dispatch(generateHDWallet(accountId, accountWalletKeyNum, response.data.masterPublicKeyBTC, response.data.masterPublicKeyLTC, response.data.masterPublicKeyETH, response.data.masterPublicKeyTestnetBTC, response.data.masterPublicKeyTestnetLTC, response.data.masterPublicKeyTestnetETH));
          }else{
           dispatch(generateHDWallet(accountId, response.data.walletGenerationNumber, response.data.masterPublicKeyBTC, response.data.masterPublicKeyLTC, response.data.masterPublicKeyETH, response.data.masterPublicKeyTestnetBTC, response.data.masterPublicKeyTestnetLTC, response.data.masterPublicKeyTestnetETH));
           dispatch(updateStatistic(response.data.statisticId, response.data.walletGenerationNumber));
          }
        }
      })
      .catch((err) => {

      })
  }
}

export const generateHDWallet = (accountId, walletGenerationNumber, masterPublicKeyBTC, masterPublicKeyLTC, masterPublicKeyETH, masterPublicKeyTestnetBTC, masterPublicKeyTestnetLTC, masterPublicKeyTestnetETH) => {
  return function (dispatch, getState) {
     dispatch({
       type: "GENERATE_HD_WALLET",
       walletGenerationNumber, masterPublicKeyBTC, masterPublicKeyLTC, masterPublicKeyETH, masterPublicKeyTestnetBTC, masterPublicKeyTestnetLTC, masterPublicKeyTestnetETH
     })
    axios.post("/generateHDWallet",{
        "accountId": accountId,
        "walletGenerationNumber": walletGenerationNumber,
        "masterPublicKeyBTC": masterPublicKeyBTC,
        "masterPublicKeyLTC": masterPublicKeyLTC,
        "masterPublicKeyETH": masterPublicKeyETH,
        "masterPublicKeyTestnetBTC": masterPublicKeyTestnetBTC,
        "masterPublicKeyTestnetLTC": masterPublicKeyTestnetLTC,
        "masterPublicKeyTestnetETH": masterPublicKeyTestnetETH,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "UPDATE_MERCHANT_CRYPTO_ADDRESS",
            accountId: accountId,
            addressBTC: response.data.addressBTC,
            addressLTC: response.data.addressLTC,
            addressETH: response.data.addressETH,
            addressTestnetBTC: response.data.addressTestnetBTC,
            addressTestnetLTC: response.data.addressTestnetLTC,
            addressTestnetETH: response.data.addressTestnetETH,
            walletSet: response.data.walletSet,
            walletKeyNum: response.data.walletKeyNum
          })
        }
      })
      .catch((err) => {

      })
  }
}

export const updateStatistic = (statisticId, walletGenerationNumber) => {
  return function (dispatch, getState) {
     dispatch({
       type: "UPDATE_STATISTIC",
       statisticId, walletGenerationNumber
     })
    axios.post("/updateStatistic",{
        "statisticId": statisticId,
        "walletGenerationNumber": walletGenerationNumber,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
        }
      })
      .catch((err) => {

      })
  }
}

export const deleteMerchantAccount = (accountId) => {
  return function (dispatch, getState) {
    axios.post("/deleteMerchantAccount",{
        "accountId": accountId,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "DELETED_MERCHANT_ACCOUNT",
            accountId: accountId
          })
        }
      })
      .catch((err) => {

      })
  }
}



export const deleteFinancialAccount = (accountId) => {
  return function (dispatch, getState) {
    axios.post("/deleteFinancialAccount",{
        "accountId": accountId,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "DELETED_FINANCIAL_ACCOUNT",
            accountId: accountId
          })
        }
      })
      .catch((err) => {

      })
  }
}

export const editMerchantAccount = (accountId) => {
  return function (dispatch, getState) {
    axios.post("/editMerchantAccount",{
        "accountId": accountId,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "EDIT_MERCHANT_ACCOUNT",
            accountId: accountId
          })
        }
      })
      .catch((err) => {

      })
  }
}

export const getMerchantAccountDetail = (accountId) => {
  return function (dispatch, getState) {
    axios.post("/getMerchantAccountDetail",{
        "accountId": accountId,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "GET_MERCHANT_ACCOUNT_DETAIL",
            currentAccount: response.data.currentAccount
          })
        }
      })
      .catch((err) => {

      })
  }
}

export const resetFormStatus = () => {
  return function (dispatch, getState) {
    dispatch({
      type: "RESET_FORM_STATUS"
    })
  }
}

export const updateMerchantAccount = (name, ownerId, ownerName, address, mobile, accountId) => {
  return function (dispatch, getState) {
    axios.post("/updateMerchantAccount",{
        "name": name,
        "ownerId": ownerId,
        "ownerName": ownerName,
        "address": address,
        "mobile": mobile,
        "accountId": accountId,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "UPDATE_MERCHANT_ACCOUNT",
            currentAccount: response.data.currentAccount,
            accountId: accountId,
            ownerId: ownerId,
            ownerName: ownerName
          })
        }
      })
      .catch((err) => {

      })
  }
}


export const changeUserRole = (userId, name, role) => {
  return function (dispatch, getState) {
    axios.post("/changeUserRole",{
        "userId": userId,
        "name": name,
        "role": role,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "CHANGED_USER_ROLE",
            userId: userId
          })
        }
      })
      .catch((err) => {

      })
  }
}


export const addMerchantAccount = (name, owner, address, mobile) => {
  return function (dispatch, getState) {
    axios.post("/addMerchantAccount",{
        "name": name,
        "owner": owner,
        "address": address,
        "mobile": mobile,
        "country": "Singapore",
        "accountTier": "basic",
        "accountStatus": "approved",
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({type: "ADD_MERCHANT_ACCOUNT"})
          dispatch(addMerchantFinancialAccount(response.data.merchantId, name));
        }
      })
      .catch((err) => {

      })
  }
}

export const addMerchantFinancialAccount = (merchantId, merchantName) => {
  return function (dispatch, getState) {
    axios.post("/addMerchantFinancialAccount",{
        "merchantId": merchantId,
        "merchantName": merchantName,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({type: "ADD_MERCHANT_FINANCIAL_ACCOUNT"})
        }
      })
      .catch((err) => {

      })
  }
}


export const updatePassword = (oldPassword, newPassword) => {
  return function (dispatch, getState) {
    axios.post("/updatePassword",{
        "oldPassword": oldPassword,
        "emailAddress": getState().app.emailAddress,
        "userId": getState().app.userId,
        "newPassword": newPassword
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({type: "UPDATED_PASSWORD"})
        }else{
          dispatch({type: "UPDATED_PASSWORD_FAIL"})
        }
      })
      .catch((err) => {

      })
  }
}


export const getUserList = (role) => {
  return function (dispatch, getState) {
    axios.post("/getUserList",{
        "role": role,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          var userListForDropdown = [];

          for(var i=0; i<response.data.userListLength; i++){
            userListForDropdown.push({
              value: response.data.userList[i].userId,
              label: response.data.userList[i].name
            });
          }
          dispatch({type: "GET_USER_LIST",
            userListLength: response.data.userListLength,
            userList: response.data.userList,
            userListForDropdown: userListForDropdown
          })
        }else{
          dispatch({type: "GET_USER_LIST_FAIL"})
        }
      })
      .catch((err) => {

      })
  }
}


export const getMerchantAccountList = (role) => {
  return function (dispatch, getState) {
    axios.post("/getMerchantAccountList",{
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({type: "GET_MERCHANT_ACCOUNT_LIST",
            merchantAccountListLength: response.data.merchantAccountListLength,
            merchantAccountList: response.data.merchantAccountList
          })
        }else{
          dispatch({type: "GET_USER_LIST_FAIL"})
        }
      })
      .catch((err) => {

      })
  }
}

export const getTransactionList = (transactionStatus) => {
  return function (dispatch, getState) {
    dispatch({type: "LOADING"})

    axios.post("/getTransactionList",{
        "transactionStatus": transactionStatus,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({type: "GET_TRANSACTION_LIST",
            transactionListLength: response.data.transactionListLength,
            transactionList: response.data.transactionList
          })
        }else{
        }
      })
      .catch((err) => {

      })
  }
}


export const getFinancialsList = (accountType) => {
  return function (dispatch, getState) {
    dispatch({type: "LOADING"})

    axios.post("/getFinancialsList",{
        "accountType": accountType,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          if(accountType == "merchant"){
            dispatch({type: "GET_FINANCIAL_MERCHANT_LIST",
              financialMerchantListLength: response.data.financialListLength,
              financialMerchantList: response.data.financialList
            })
          }else if(accountType == "consumer"){
            dispatch({type: "GET_FINANCIAL_CONSUMER_LIST",
              financialConsumerListLength: response.data.financialListLength,
              financialConsumerList: response.data.financialList
            })
          }
        }else{
        }
      })
      .catch((err) => {

      })
  }
}

export const getInvoiceList = () => {
  return function (dispatch, getState) {
    dispatch({type: "LOADING"})

    axios.post("/getInvoiceList",{
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({type: "GET_INVOICE_LIST",
            invoiceListLength: response.data.invoiceListLength,
            invoiceList: response.data.invoiceList
          })
        }else{
        }
      })
      .catch((err) => {

      })
  }
}


export const getSettlementList = () => {
  return function (dispatch, getState) {
    dispatch({type: "LOADING"})

    axios.post("/getSettlementList",{
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({type: "GET_SETTLEMENT_LIST",
            settlementListLength: response.data.settlementListLength,
            settlementList: response.data.settlementList
          })
        }else{
        }
      })
      .catch((err) => {

      })
  }
}


export const deleteSettlement = (transactionId) => {
  return function (dispatch, getState) {
    axios.post("/deleteSettlement",{
        "transactionId": transactionId,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "DELETED_SETTLEMENT",
            transactionId: transactionId
          })
        }
      })
      .catch((err) => {

      })
  }
}

export const deleteTransaction = (transactionId) => {
  return function (dispatch, getState) {
    axios.post("/deleteTransaction",{
        "transactionId": transactionId,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "DELETED_TRANSACTION",
            transactionId: transactionId
          })
        }
      })
      .catch((err) => {

      })
  }
}

export const deleteInvoice = (transactionId) => {
  return function (dispatch, getState) {
    axios.post("/deleteInvoice",{
        "transactionId": transactionId,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "DELETED_INVOICE",
            transactionId: transactionId
          })
        }
      })
      .catch((err) => {

      })
  }
}


export const checkTransaction = (transactionId) => {
  return function (dispatch, getState) {
    // check blockchain
    // after checking and if valid then update DB
    dispatch({
      type: "CHECK_TRANSACTION"
    })

    var amount;
    var address;
    var timestamp;

    for(var i=0; i < getState().app.transactionList.length; i++){
      if(transactionId == getState().app.transactionList[i].id){
        amount = getState().app.transactionList[i].cryptocurrencyPaid;
        address = getState().app.transactionList[i].addressReceiver;
        timestamp = getState().app.transactionList[i].createdAt;
      }
    }
    //dispatch(updateTransaction(transactionId, "transactionHash", "addressSender"))
    axios.post("/checkTransaction",{
        "amount": amount,
        "address": address,
        "timestamp": timestamp
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch(getTransactionSender(transactionId, response.data.transactionHash, address))
        }
      })
      .catch((err) => {

      })
  }
}

export const getTransactionSender = (transactionId, transactionHash, address) => {
  return function (dispatch, getState) {
    // check blockchain
    // after checking and if valid then update DB
    axios.post("/getTransactionSender",{
        "transactionHash": transactionHash,
        "address": address
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch(updateTransaction(transactionId, transactionHash, response.data.addressSender))
        }
      })
      .catch((err) => {

      })

  }
}

export const updateTransaction = (transactionId, transactionHash, addressSender) => {
  return function (dispatch, getState) {
    // check blockchain
    // after checking and if valid then update DB
    axios.post("/updateTransaction",{
        "transactionId": transactionId,
        "transactionHash": transactionHash,
        "addressSender": addressSender,
        "accessToken": getState().app.accessToken
      }).then((response) => {
        if(response.data.message == "success"){
          dispatch({
            type: "UPDATED_TRANSACTION",
            transactionId: transactionId,
            transactionHash: transactionHash,
            addressSender: addressSender
          })
        }
      })
      .catch((err) => {

      })

  }
}
