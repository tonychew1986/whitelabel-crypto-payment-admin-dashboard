
import moment from 'moment';

export default(state = {
    currentPage: "home",
    network: "",
    formStatus: "",
    loginStatus: false,
    loading: false,
    loginAdminRightsError: false,
    merchantId: "",
    accessToken: "",
    userId: "",
    emailAddress: "",
    passwordUpdateError: false,
    passwordUpdateSucess: false,
    userListLength: 0,
    userList: [],
    userListForDropdown: [],
    merchantAccountListLength: 0,
    merchantAccountList: [],
    transactionListLength: 0,
    transactionList: [],
    settlementListLength: 0,
    settlementList: [],
    invoiceListLength: 0,
    invoiceList: [],
    invoiceCountDay: 0,
    invoiceCountWeek: 0,
    invoiceCountMonth: 0,
    invoiceVolumeDay: 0,
    invoiceVolumeWeek: 0,
    invoiceVolumeMonth: 0,
    financialMerchantListLength: 0,
    financialMerchantList: [],
    financialConsumerListLength: 0,
    financialConsumerList: [],
    currentAccount: []
}, payload) => {
    switch (payload.type) {
        case 'LOADING':
            return {
                ...state,
                loading: true
            }
        case 'NETWORK_DETECTED':
            return {
                ...state,
                network: payload.network
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: payload.page
            }
        case 'REGISTRATION':
            return {
                ...state,
                loginStatus: true,
                accessToken: "222"
            }
        case 'LOGIN':
            return {
                ...state,
                loginStatus: true,
                accessToken: payload.accessToken,
                userId: payload.userId,
                emailAddress: payload.emailAddress,
                loginAdminRightsError: false
            }
        case 'LOGIN_INSUFFICIENT_RIGHTS':
            return {
                ...state,
                loginAdminRightsError: true
            }
        case 'LOGOUT':
            return {
                ...state,
                loginStatus: false,
                accessToken: "",
                userId: "",
                loginAdminRightsError: false
            }
        case 'UPDATED_PASSWORD_FAIL':
            return {
                ...state,
                passwordUpdateError: true,
                passwordUpdateSucess: false
            }
        case 'UPDATED_PASSWORD':
            return {
                ...state,
                passwordUpdateError: false,
                passwordUpdateSucess: true
            }
        case 'GET_USER_LIST':
            return {
                ...state,
                userListLength: payload.userListLength,
                userList: payload.userList,
                userListForDropdown: payload.userListForDropdown
            }
        case 'GET_MERCHANT_ACCOUNT_LIST':
            return {
                ...state,
                merchantAccountListLength: payload.merchantAccountListLength,
                merchantAccountList: payload.merchantAccountList
            }
        // case 'ADD_USER':
        //     return {
        //         ...state,
        //         userListLength: state.userListLength - 1,
        //         userList: state.userList.filter(userList => userList.userId !== payload.userId),
        //         userListForDropdown: state.userListForDropdown.filter(userListForDropdown => userListForDropdown.value !== payload.userId)
        //     }
        case 'DELETED_USER':
            return {
                ...state,
                userListLength: state.userListLength - 1,
                userList: state.userList.filter(userList => userList.userId !== payload.userId),
                userListForDropdown: state.userListForDropdown.filter(userListForDropdown => userListForDropdown.value !== payload.userId)
            }
        case 'CHANGED_USER_ROLE':
            return {
                ...state,
                userListLength: state.userListLength - 1,
                userList: state.userList.filter(userList => userList.id !== payload.userId),
                userListForDropdown: state.userListForDropdown.filter(userListForDropdown => userListForDropdown.value !== payload.userId)
            }
        case 'DELETED_MERCHANT_ACCOUNT':
            return {
                ...state,
                merchantAccountListLength: state.merchantAccountListLength - 1,
                merchantAccountList: state.merchantAccountList.filter(merchantAccountList => merchantAccountList.merchantId !== payload.accountId)
            }
        case 'UPDATE_MERCHANT_ACCOUNT':
            let merchantAccountListUpdate = state.merchantAccountList.map(item => {
              if(item.merchantId === payload.accountId){
                return {
                   ...item,
                   ownerId: payload.ownerId,
                   ownerName: payload.ownerName
                }
              }
              return item
            })

            return {
                ...state,
                formStatus: "complete",
                merchantAccountList: merchantAccountListUpdate
            }
        case 'UPDATE_MERCHANT_CRYPTO_ADDRESS':
            let merchantAccountListUpdate2 = state.merchantAccountList.map(item => {
              if(item.merchantId === payload.accountId){
                return {
                   ...item,
                   addressBTC: payload.addressBTC,
                   addressLTC: payload.addressLTC,
                   addressETH: payload.addressETH,
                   addressTestnetBTC: payload.addressTestnetBTC,
                   addressTestnetLTC: payload.addressTestnetLTC,
                   addressTestnetETH: payload.addressTestnetETH,
                   walletSet: payload.walletSet,
                   walletKeyNum: payload.walletKeyNum
                }
              }
              return item
            })

            return {
                ...state,
                merchantAccountList: merchantAccountListUpdate2
            }
        case 'RESET_FORM_STATUS':
            return {
                ...state,
                formStatus: ""
            }

        case 'GET_TRANSACTION_LIST':
            return {
                ...state,
                loading: false,
                transactionListLength: payload.transactionListLength,
                transactionList: payload.transactionList
            }
        case 'GET_SETTLEMENT_LIST':
            return {
                ...state,
                loading: false,
                settlementListLength: payload.settlementListLength,
                settlementList: payload.settlementList
            }
        case 'GET_INVOICE_LIST':
            var currentEpoch = moment().valueOf();
            var invoiceCountDay = 0;
            var invoiceCountWeek = 0;
            var invoiceCountMonth = 0;
            var invoiceVolumeDay = 0;
            var invoiceVolumeWeek = 0;
            var invoiceVolumeMonth = 0;

            var millisecDay = 86400000;
            var millisecWeek = 86400000 * 7;
            var millisecMonth = 86400000 * 30;


            for(var i=0; i < (payload.invoiceList.length); i++){
              var date = payload.invoiceList[i].createdAt;
              var amount = parseFloat(payload.invoiceList[i].amount);
              var createdEpoch = moment(date).valueOf();

              if((createdEpoch + (millisecDay)) > currentEpoch){
                invoiceCountDay++;
                invoiceVolumeDay+=amount;
              }
              if((createdEpoch + (millisecWeek)) > currentEpoch){
                invoiceCountWeek++;
                invoiceVolumeWeek+=amount;
              }
              if((createdEpoch + (millisecMonth)) > currentEpoch){
                invoiceCountMonth++;
                invoiceVolumeMonth+=amount;
              }
            }

            return {
                ...state,
                loading: false,
                invoiceListLength: payload.invoiceListLength,
                invoiceList: payload.invoiceList,
                invoiceCountDay: invoiceCountDay,
                invoiceCountWeek: invoiceCountWeek,
                invoiceCountMonth: invoiceCountMonth,
                invoiceVolumeDay: invoiceVolumeDay,
                invoiceVolumeWeek: invoiceVolumeWeek,
                invoiceVolumeMonth: invoiceVolumeMonth
            }
        case 'GET_FINANCIAL_MERCHANT_LIST':
            return {
                ...state,
                loading: false,
                financialMerchantListLength: payload.financialMerchantListLength,
                financialMerchantList: payload.financialMerchantList
            }
        case 'GET_FINANCIAL_CONSUMER_LIST':
            return {
                ...state,
                loading: false,
                financialConsumerListLength: payload.financialConsumerListLength,
                financialConsumerList: payload.financialConsumerList
            }

        case 'DELETED_SETTLEMENT':
            console.log('DELETED_SETTLEMENT: '+payload.transactionId);
            return {
                ...state,
                settlementListLength: state.settlementListLength - 1,
                settlementList: state.settlementList.filter(settlementList => settlementList.transactionId !== payload.transactionId)
            }
        case 'DELETED_TRANSACTION':
            return {
                ...state,
                transactionListLength: state.transactionListLength - 1,
                transactionList: state.transactionList.filter(transactionList => transactionList.transactionId !== payload.transactionId)
            }
        case 'DELETED_INVOICE':
            return {
                ...state,
                invoiceListLength: state.invoiceListLength - 1,
                invoiceList: state.invoiceList.filter(invoiceList => invoiceList.invoiceId !== payload.transactionId)
            }

        case 'UPDATED_TRANSACTION':
            let updatedTransactionList = state.transactionList.map((item, i) => {
              if(item.id === payload.transactionId){
                return {
                    ...item,
                    addressSender: payload.addressSender,
                    transactionHash: payload.transactionHash,
                    transactionStatus: "approved"
                }
              }
              return item
            })
            return {
                ...state,
                transactionList: updatedTransactionList
            }

        case 'GET_MERCHANT_ACCOUNT_DETAIL':
            return {
                ...state,
                currentAccount: payload.currentAccount
            }

        default:
            return state;
    }
};
