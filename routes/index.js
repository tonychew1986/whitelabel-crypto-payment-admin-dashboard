var express = require('express');
var request = require('request');
var axios = require ('axios');
var uniqid = require('uniqid');

var bitcoin = require('bitcoinjs-lib')
var bitcore = require('bitcore-lib');
var EthereumBip44 = require('ethereum-bip44');

var router = express.Router();

var apiUrl;

if(process.env['API_URI']){
  apiUrl = process.env['API_URI'];
}else{
  apiUrl = "http://0.0.0.0:9000";
}

router.get('/', (req, res) => {
  res.render('application', { title: 'Crypto Pay | Admin Dashboard' });
});

router.post('/registration', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var url = apiUrl+'/api/users';

  var options = {
      url: url,
      form: {
        'access_token': "XWwLTNkhAvBUgkBFZbd1NTBeOBkYcDSz",
        'userId': uniqid('u'),
        'email': email,
        'password': password
      }
  };

  console.log('url: '+url);
  function callback(error, response, body) {
    console.log('response.statusCode: '+response.statusCode);
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      var data = JSON.parse(body);
      console.log('data: '+data);
      res.send({
        "message": "success"
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.post(options, callback);
});

router.post('/addAdmin', (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var userId = uniqid('u');

  var url = apiUrl+'/api/users';

  var options = {
      url: url,
      form: {
        'access_token': "XWwLTNkhAvBUgkBFZbd1NTBeOBkYcDSz",
        'userId': userId,
        'name': name,
        'email': email,
        'password': password,
        'role': "admin"
      }
  };

  console.log('url: '+url);
  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      console.log('body: '+body);
      var data = JSON.parse(body);
      console.log('data: '+data);
      res.send({
        "message": "success",
        "userId": userId
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.post(options, callback);
});

router.post('/checkNetwork', (req, res) => {
  res.send({
    "message": "success",
    "network": process.env['ENV']
  });
});


router.post('/addMerchantUser', (req, res) => {
  var accessToken = req.body.accessToken;
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var userId = uniqid('u');

  var url = apiUrl+'/api/users';

  var options = {
      url: url,
      form: {
        'access_token': accessToken,
        'userId': userId,
        'name': name,
        'email': email,
        'password': password,
        'role': "merchant"
      }
  };

  console.log('url: '+url);
  function callback(error, response, body) {
    console.log('response.statusCode: '+response.statusCode);
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      var data = JSON.parse(body);
      console.log('data: '+data);
      res.send({
        "message": "success",
        "userId": userId
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.post(options, callback);
});

router.post('/deleteUser', (req, res) => {
  var userId = req.body.userId;
  var accessToken = req.body.accessToken;

  var url = apiUrl+'/api/users/'+userId;

  var options = {
      url: url,
      form: {
        'access_token': accessToken
      }
  };

  console.log('url: '+url);
  function callback(error, response, body) {
    console.log('response.statusCode: '+response.statusCode);
    if (!error && (response.statusCode == 200 || response.statusCode == 201 || response.statusCode == 204)) {
      res.send({
        "message": "success"
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.del(options, callback);
});


router.post('/generateAddress', (req, res) => {
  var accountId = req.body.accountId;
  var accessToken = req.body.accessToken;

  var url = apiUrl+'/api/statistics/?access_token='+accessToken;

  var options = {
      url: url
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201 || response.statusCode == 204)) {
      var data = JSON.parse(body);
      res.send({
        "message": "success",
        'statisticId': data.rows[0].id,
        'walletGenerationNumber': ((data.rows[0].walletGenerationNumber) + 1),
        'masterPublicKeyBTC': (data.rows[0].masterPublicKeyBTC),
        'masterPublicKeyLTC': (data.rows[0].masterPublicKeyLTC),
        'masterPublicKeyETH': (data.rows[0].masterPublicKeyETH),
        'masterPublicKeyTestnetBTC': (data.rows[0].masterPublicKeyTestnetBTC),
        'masterPublicKeyTestnetLTC': (data.rows[0].masterPublicKeyTestnetLTC),
        'masterPublicKeyTestnetETH': (data.rows[0].masterPublicKeyTestnetETH)
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.get(options, callback);

});

router.post('/updateStatistic', (req, res) => {
  var statisticId = req.body.statisticId;
  var accessToken = req.body.accessToken;
  var walletGenerationNumber = req.body.walletGenerationNumber;

  var url = apiUrl+'/api/statistics/'+statisticId+'/wallet';

  var options = {
      url: url,
      form: {
        'access_token': accessToken,
        'walletGenerationNumber': walletGenerationNumber
      }
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201 || response.statusCode == 204)) {
      res.send({
        "message": "success"
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.put(options, callback);
});

router.post('/generateHDWallet', (req, res) => {
  var accountId = req.body.accountId;
  var accessToken = req.body.accessToken;
  var walletGenerationNumber = req.body.walletGenerationNumber;
  var masterPublicKeyBTC = req.body.masterPublicKeyBTC;
  var masterPublicKeyLTC = req.body.masterPublicKeyLTC;
  var masterPublicKeyETH = req.body.masterPublicKeyETH;
  var masterPublicKeyTestnetBTC = req.body.masterPublicKeyTestnetBTC;
  var masterPublicKeyTestnetLTC = req.body.masterPublicKeyTestnetLTC;
  var masterPublicKeyTestnetETH = req.body.masterPublicKeyTestnetETH;
  var network = req.body.network;

  var url = apiUrl+'/api/merchants/'+accountId+'/address';

  // var keyETH = bitcore.HDPrivateKey();
  //
  // var derivedPubKey = keyETH.derive("m/44'/60'/0'/0").hdPublicKey;
  // create the hd wallet
  //var xprETH = "";
  //var wallet = EthereumBip44.fromPrivateSeed(xprETH);
  // create the hd wallet
  //console.log(keyETH);
  //console.log(derivedPubKey.toString());

  var xpubBTC = "xpub661MyMwAqRbcFBVFhNfMVZWqLysss2sLJgBuxiZv4G6GkiXhcoDeKjyvGEXG9Y1M6XVXsBUwMZ4biK7WtxV9CkECs4FA2DPUUjRK7zcdpHE";
  //var xpubLTC = "xpub661MyMwAqRbcG8L7SMTjp5bxRkoqZdnQnq6P7z5Fqa5tWugHAzq1E195f4r9uHQF1YC4aFtpPR4oXxbcTJCN9HwWuwog2kwTBFcD1udUEaW";
  var xpubETH = "xpub6EUnBQtoiivYNShiKC8QTRNw3LoKNDe2HCUjwhBvSkYuAMpX5RHpuJvAXwATz9VTPuWQyv6PkA2H9UyhFBhnbe98sj9Fd3EFWJ7jNAtLcbg";
  var xpubLTC = "Ltub2XzbaihwhMvqLKzFzog62fFSi6sgWtR5MoigsmqaSeHxP3awWVc5dr86TDQgMY1AhGAyLZjEKGWmNpxEiibYfRkRPzHYy32bSBCWoKc81pQ";
  //var xpubLTC = "Ltub2Vstj8HVCDyGBNNVsxLrgAevbER7gw9Cnumn9zKAUTt6GFYjS21BNJvb3bhosVc2hHSGSaB6eSDWnhj92Yx2HmN1EzXNxFrhi14sXzQEshf";

  var xpubBTCdevelopment = "tpubD6NzVbkrYhZ4X1vPMoyoEFiU2oq6Wyi5VzBmrDoLSGrJiEeVkjt6W8E1Tjb6vayFeUm39bg77AdmbKYtiGTP2aYqBTbz5ifJ9tPEiypaRan";

  var xpubLTCdevelopment = "tpubD6NzVbkrYhZ4WkjKJXHwXctv4tirFGdZtDYE5Q4MGSPLiDZ2RKPExT5LmYBpoBkGF3rMTjL9teHao5rG2cFzaGXUCnqpUVFT2wd7wzYL3Gr";

  var xpubETHdevelopment = "xpub6EUnBQtoiivYNShiKC8QTRNw3LoKNDe2HCUjwhBvSkYuAMpX5RHpuJvAXwATz9VTPuWQyv6PkA2H9UyhFBhnbe98sj9Fd3EFWJ7jNAtLcbg";

  var litecoin = bitcoin.networks.litecoin;
  var litecoinX = Object.assign({}, bitcoin.networks.litecoin, {
    bip32: bitcoin.networks.bitcoin.bip32
  })

  // litecoin testnet address prefix
  // let litecoin ={
  //   messagePrefix: '\x19Litecoin Signed Message:\n',
  //   bip32: {
  //     public: 0x019da462,
  //     private: 0x019d9cfe
  //   },
  //   pubKeyHash: 0x30,    // change to 0x6f
  //   scriptHash: 0x32,
  //   wif: 0xb0
  // }

  var hdNodeBTC;
  var hdNodeLTC;
  var hdNodeTestnetBTC;
  var hdNodeTestnetLTC;
  var wallet;

  if(process.env['ENV'] == "staging"){
    console.log("staging");
    hdNodeBTC = bitcoin.HDNode.fromBase58(masterPublicKeyBTC, bitcoin.networks.testnet);
    hdNodeLTC = bitcoin.HDNode.fromBase58(masterPublicKeyLTC, bitcoin.networks.testnet);
    hdNodeTestnetBTC = bitcoin.HDNode.fromBase58(masterPublicKeyTestnetBTC, bitcoin.networks.testnet);
    hdNodeTestnetLTC = bitcoin.HDNode.fromBase58(masterPublicKeyTestnetLTC, bitcoin.networks.testnet);
    wallet = EthereumBip44.fromPublicSeed(masterPublicKeyETH.toString());
  }else if(process.env['ENV'] == "production"){
    console.log("production");
    hdNodeBTC = bitcoin.HDNode.fromBase58(masterPublicKeyBTC);
    hdNodeLTC = bitcoin.HDNode.fromBase58(masterPublicKeyLTC, [litecoin, litecoinX]);
    hdNodeTestnetBTC = bitcoin.HDNode.fromBase58(masterPublicKeyTestnetBTC, bitcoin.networks.testnet);
    hdNodeTestnetLTC = bitcoin.HDNode.fromBase58(masterPublicKeyTestnetLTC, bitcoin.networks.testnet);
    wallet = EthereumBip44.fromPublicSeed(masterPublicKeyETH.toString());
  }else{
    console.log("development");
    hdNodeBTC = bitcoin.HDNode.fromBase58(xpubBTCdevelopment, bitcoin.networks.testnet);
    hdNodeLTC = bitcoin.HDNode.fromBase58(xpubLTCdevelopment, bitcoin.networks.testnet);
    hdNodeTestnetBTC = bitcoin.HDNode.fromBase58(xpubBTCdevelopment, bitcoin.networks.testnet);
    hdNodeTestnetLTC = bitcoin.HDNode.fromBase58(xpubLTCdevelopment, bitcoin.networks.testnet);
    wallet = EthereumBip44.fromPublicSeed(xpubETHdevelopment.toString());
  }

  console.log("wallet: "+wallet);
  //console.log('private key:', wallet.getPrivateKey(walletGenerationNumber).toString('hex'))
  // let hdNodeBTC = bitcoin.HDNode.fromBase58(masterPublicKeyBTC);
  // let hdNodeLTC = bitcoin.HDNode.fromBase58(masterPublicKeyLTC, [litecoin, litecoinX]);
  // let hdNodeBTC = bitcoin.HDNode.fromBase58(xpubBTCtestnet, bitcoin.networks.testnet);
  // let hdNodeLTC = bitcoin.HDNode.fromBase58(xpubLTCtestnet, bitcoin.networks.testnet);
  //let hdNodeETH = new EthereumBip44(xpubETH); //EthereumBip44.fromPublicSeed(xpubETH.toString());

  var generatedAddressBTC = (hdNodeBTC.derive(0).derive(walletGenerationNumber).getAddress());
  var generatedAddressLTC = (hdNodeLTC.derive(0).derive(walletGenerationNumber).getAddress());
  var generatedAddressETH = wallet.getAddress(walletGenerationNumber);

  console.log("---------");

  var generatedAddressTestnetBTC = (hdNodeTestnetBTC.derive(0).derive(walletGenerationNumber).getAddress());
  var generatedAddressTestnetLTC = (hdNodeTestnetLTC.derive(0).derive(walletGenerationNumber).getAddress());
  var generatedAddressTestnetETH = wallet.getAddress(walletGenerationNumber);
  //var generatedAddressETH = (hdNodeETH.getAddress(walletGenerationNumber));

  console.log(generatedAddressBTC);
  console.log(generatedAddressLTC);
  console.log(generatedAddressETH);
  console.log(generatedAddressTestnetBTC);
  console.log(generatedAddressTestnetLTC);
  console.log(generatedAddressTestnetETH);

  var options = {
      url: url,
      form: {
        'access_token': accessToken,
        'addressBTC': generatedAddressBTC,
        'addressLTC': generatedAddressLTC,
        'addressETH': generatedAddressETH,
        'addressTestnetBTC': generatedAddressTestnetBTC,
        'addressTestnetLTC': generatedAddressTestnetLTC,
        'addressTestnetETH': generatedAddressTestnetETH,
        'walletSet': 0,
        'walletKeyNum': walletGenerationNumber
      }
  };

  function callback(error, response, body) {
    console.log("response.statusCode: "+response.statusCode);
    if (!error && (response.statusCode == 200 || response.statusCode == 201 || response.statusCode == 204)) {
      console.log("generatedAddressBTC: "+generatedAddressBTC);
      res.send({
        "message": "success",
        'addressBTC': generatedAddressBTC,
        'addressLTC': generatedAddressLTC,
        'addressETH': generatedAddressETH,
        'addressTestnetBTC': generatedAddressTestnetBTC,
        'addressTestnetLTC': generatedAddressTestnetLTC,
        'addressTestnetETH': generatedAddressTestnetETH,
        'walletSet': 0,
        'walletKeyNum': walletGenerationNumber
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.put(options, callback);
});

router.post('/deleteMerchantAccount', (req, res) => {
  var accountId = req.body.accountId;
  var accessToken = req.body.accessToken;

  var url = apiUrl+'/api/merchants/'+accountId;

  var options = {
      url: url,
      form: {
        'access_token': accessToken
      }
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201 || response.statusCode == 204)) {
      res.send({
        "message": "success"
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.del(options, callback);
});

router.post('/deleteFinancialAccount', (req, res) => {
  var accessToken = req.body.accessToken;
  var accountId = req.body.accountId;

  var url = apiUrl+'/api/financials/'+accountId;

  var options = {
      url: url,
      form: {
        'access_token': accessToken
      }
  };

  function callback(error, response, body) {
    console.log('response.statusCode: '+response.statusCode);
    if (!error && (response.statusCode == 200 || response.statusCode == 201 || response.statusCode == 204)) {
      res.send({
        "message": "success"
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.del(options, callback);
});

router.post('/addMerchantFinancialAccount', (req, res) => {
  var accessToken = req.body.accessToken;
  var merchantId = req.body.merchantId;
  var merchantName = req.body.merchantName;

  var url = apiUrl+'/api/financials';

  var options = {
      url: url,
      form: {
        'access_token': accessToken,
        'accountId': merchantId,
        'accountName': merchantName,
        'accountType': "merchant",
        'balanceBTC': 0,
        'balanceETH': 0,
        'balanceLTC': 0,
        'balanceUSD': 0,
        'balanceSGD': 0,
        'balanceTestnetBTC': 0,
        'balanceTestnetETH': 0,
        'balanceTestnetLTC': 0,
        'balanceTestnetUSD': 0,
        'balanceTestnetSGD': 0
      }
  };

  console.log('url: '+url);
  function callback(error, response, body) {
    console.log('response.statusCode: '+response.statusCode);
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      var data = JSON.parse(body);
      console.log('data: '+data);
      res.send({
        "message": "success",
        "merchantId": merchantId,
        "merchantName": merchantName
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.post(options, callback);
});

router.post('/addConsumerFinancialAccount', (req, res) => {
  var accessToken = req.body.accessToken;
  var userId = req.body.userId;
  var userName = req.body.userName;

  var url = apiUrl+'/api/financials';

  var options = {
      url: url,
      form: {
        'access_token': accessToken,
        'accountId': userId,
        'accountName': userName,
        'accountType': "consumer",
        'balanceBTC': 0,
        'balanceETH': 0,
        'balanceLTC': 0,
        'balanceUSD': 0,
        'balanceSGD': 0
      }
  };

  console.log('url: '+url);
  function callback(error, response, body) {
    console.log('response.statusCode: '+response.statusCode);
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      var data = JSON.parse(body);
      console.log('data: '+data);
      res.send({
        "message": "success",
        "userId": userId,
        "userName": userName
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.post(options, callback);
});

router.post('/addMerchantAccount', (req, res) => {
  var accessToken = req.body.accessToken;
  var name = req.body.name;
  var owner = req.body.owner;
  var address = req.body.address;
  var mobile = req.body.mobile;
  var country = req.body.country;
  var accountTier = req.body.accountTier;
  var accountStatus = req.body.accountStatus;
  var merchantId = uniqid('m');

  var url = apiUrl+'/api/merchants?access_token='+accessToken;

  var options = {
      url: url,
      form: {
        'access_token': accessToken,
        'merchantId': merchantId,
        'name': name,
        'owner': owner,
        'address': address,
        'mobile': mobile,
        'country': country,
        'accountTier': accountTier,
        'accountStatus': accountStatus
      }
  };

  console.log('url: '+url);
  function callback(error, response, body) {
    console.log('response.statusCode: '+response.statusCode);
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      var data = JSON.parse(body);
      console.log('data: '+data);
      res.send({
        "message": "success",
        "merchantId": merchantId
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.post(options, callback);
});


router.post('/getMerchantAccountDetail', (req, res) => {
  var accountId = req.body.accountId;
  var accessToken = req.body.accessToken;

  var url = apiUrl+"/api/merchants/"+accountId+"?access_token="+accessToken;

  var options = {
      url: url
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      console.log(body);
      var data = JSON.parse(body);
      res.send({
        "message": "success",
        "currentAccount": data,
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.get(options, callback);
});

router.post('/updateMerchantAccount', (req, res) => {
  var accessToken = req.body.accessToken;
  var accountId = req.body.accountId;
  var name = req.body.name;
  var ownerId = req.body.ownerId;
  var ownerName = req.body.ownerName;
  var address = req.body.address;
  var mobile = req.body.mobile;

  var url = apiUrl+'/api/merchants/'+ accountId +'?access_token='+accessToken;

  var options = {
      url: url,
      form: {
        "name": name,
        "ownerId": ownerId,
        "ownerName": ownerName,
        "address": address,
        "mobile": mobile
      }
  };

  console.log(url)

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      console.log(body);
      var data = JSON.parse(body);
      res.send({
        "message": "success"
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.put(options, callback);
});


router.post('/login', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var url = apiUrl+'/api/auth';
  var auth = "Basic " + new Buffer(email + ":" + password).toString("base64");

  var options = {
      url: url,
      headers: {
        'Authorization': auth,
      }
  };

  function callback(error, response, body) {
    console.log('response.statusCode: '+response.statusCode);
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      var data = JSON.parse(body);
      console.log('data.token: '+data.token);
      console.log('data.user.id: '+data.user.id);
      if(data.user.role == "admin" ){
        res.send({
          "message": "success",
          "accessToken": data.token,
          "userId": data.user.id,
          "emailAddress": data.user.email,
          "role": data.user.role
        });
      }else{
        res.send({
          "message": "insufficient rights"
        });
      }
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.post(options, callback);
});


router.post('/changeUserRole', (req, res) => {
  var accessToken = req.body.accessToken;
  var userId = req.body.userId;
  var name = req.body.name;
  var role = req.body.role;

  var url = apiUrl+'/api/users/'+ userId +'?access_token='+accessToken;

  var options = {
      url: url,
      form: {
        "name": name,
        "role": role
      }
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      console.log(body);
      var data = JSON.parse(body);
      res.send({
        "message": "success"
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.put(options, callback);
});

router.post('/updatePassword', (req, res) => {
  var oldPassword = req.body.oldPassword;
  var newPassword = req.body.newPassword;
  var emailAddress = req.body.emailAddress;
  var userId = req.body.userId;

  var url = apiUrl+"/api/users/"+userId+"/password";
  var auth = "Basic " + new Buffer(emailAddress + ":" + oldPassword).toString("base64");

  var options = {
      url: url,
      headers: {
        'Authorization': auth,
      },
      form: {
        "password": newPassword
      }
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      console.log(body);
      var data = JSON.parse(body);
      res.send({
        "message": "success"
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.put(options, callback);
});




router.post('/getUserList', (req, res) => {
  var role = req.body.role;
  var accessToken = req.body.accessToken;

  var url = apiUrl+"/api/users/role?access_token="+accessToken+"&q="+role;

  var options = {
      url: url
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      console.log(body);
      var data = JSON.parse(body);
      res.send({
        "message": "success",
        "userListLength": data.count,
        "userList": data.rows,
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.get(options, callback);
});

router.post('/getMerchantAccountList', (req, res) => {
  var role = req.body.role;
  var accessToken = req.body.accessToken;

  var url = apiUrl+"/api/merchants?access_token="+accessToken;

  var options = {
      url: url
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      console.log(body);
      var data = JSON.parse(body);
      res.send({
        "message": "success",
        "merchantAccountListLength": data.count,
        "merchantAccountList": data.rows,
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.get(options, callback);
});


router.post('/getInvoiceList', (req, res) => {
  var accessToken = req.body.accessToken;

  var url = apiUrl+"/api/invoices/?access_token="+accessToken;

  var options = {
      url: url
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      console.log(body);
      var data = JSON.parse(body);
      res.send({
        "message": "success",
        "invoiceListLength": data.count,
        "invoiceList": data.rows,
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.get(options, callback);
});

router.post('/getSettlementList', (req, res) => {
  var accessToken = req.body.accessToken;

  var url = apiUrl+"/api/settlements/?access_token="+accessToken;

  var options = {
      url: url
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      console.log(body);
      var data = JSON.parse(body);
      res.send({
        "message": "success",
        "settlementListLength": data.count,
        "settlementList": data.rows,
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.get(options, callback);
});

router.post('/getFinancialsList', (req, res) => {
  var accountType = req.body.accountType;
  var accessToken = req.body.accessToken;

  var url = apiUrl+"/api/financials/type?access_token="+accessToken+"&q="+accountType;

  var options = {
      url: url
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      console.log(body);
      var data = JSON.parse(body);
      res.send({
        "message": "success",
        "financialListLength": data.count,
        "financialList": data.rows,
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.get(options, callback);
});


router.post('/getTransactionList', (req, res) => {
  var accessToken = req.body.accessToken;
  var transactionStatus = req.body.transactionStatus;

  var url = apiUrl+"/api/transactions/status?access_token="+accessToken+"&q="+transactionStatus;

  var options = {
      url: url
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      console.log(body);
      var data = JSON.parse(body);
      res.send({
        "message": "success",
        "transactionListLength": data.count,
        "transactionList": data.rows,
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.get(options, callback);
});


router.post('/deleteSettlement', (req, res) => {
  var transactionId = req.body.transactionId;
  var accessToken = req.body.accessToken;

  var url = apiUrl+'/api/settlements/'+transactionId;

  var options = {
      url: url,
      form: {
        'access_token': accessToken
      }
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201 || response.statusCode == 204)) {
      res.send({
        "message": "success"
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.del(options, callback);
});


router.post('/deleteInvoice', (req, res) => {
  var transactionId = req.body.transactionId;
  var accessToken = req.body.accessToken;

  var url = apiUrl+'/api/invoices/'+transactionId;

  var options = {
      url: url,
      form: {
        'access_token': accessToken
      }
  };

  console.log('url: '+url);
  function callback(error, response, body) {
    console.log('response.statusCode: '+response.statusCode);
    if (!error && (response.statusCode == 200 || response.statusCode == 201 || response.statusCode == 204)) {
      res.send({
        "message": "success"
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.del(options, callback);
});

router.post('/deleteTransaction', (req, res) => {
  var transactionId = req.body.transactionId;
  var accessToken = req.body.accessToken;

  var url = apiUrl+'/api/transactions/'+transactionId;

  var options = {
      url: url,
      form: {
        'access_token': accessToken
      }
  };

  console.log('url: '+url);
  function callback(error, response, body) {
    console.log('response.statusCode: '+response.statusCode);
    if (!error && (response.statusCode == 200 || response.statusCode == 201 || response.statusCode == 204)) {
      res.send({
        "message": "success"
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.del(options, callback);
});


router.post('/checkTransaction', (req, res) => {
  var amount = req.body.amount;
  var address = req.body.address;
  var timestamp = req.body.timestamp;

  amount = amount * (100000000);
  console.log("amount: "+amount);

  let url;
  if(process.env['ENV'] == "PROD"){
    url = 'https://chain.so/api/v2/get_tx_received/BTC/'+address;
  }else{
    url = 'https://chain.so/api/v2/get_tx_received/BTCTEST/'+address;
  }

  axios({
    method:'get',
    url: url
  }).then((response) => {
    var loopLength;
    if(response.data.data.txs.length < 3){
      loopLength = response.data.data.length;
    }else{
      loopLength = 3;
    }

    var transactionEntries = [];
    transactionEntries.push(response.data.data.txs[(response.data.data.txs.length - 1)]);
    transactionEntries.push(response.data.data.txs[(response.data.data.txs.length - 2)]);
    transactionEntries.push(response.data.data.txs[(response.data.data.txs.length - 3)]);

    for(var i=0; i < loopLength; i++){
      // var responseTime = ((transactionEntries[i].time)).toString().substring(0, 10);
       var responseValue = parseFloat((transactionEntries[i].value * (100000000)).toString().substring(0, 8));
      // timestamp = (moment(timestamp).valueOf()).toString().substring(0, 10);
      // console.log("timestamp: "+ (responseTime - timestamp));
      // console.log("timestamp: "+ timestamp);
      // console.log("response.data.result[i].timeStamp: "+ responseTime);
      // console.log("value: "+ responseValue);

      //if(responseTime - timestamp > 0){
        if(transactionEntries[i].confirmations > 6){
          if(Math.round(amount) == Math.round(responseValue)){
             res.send({
               message: "success",
               transactionHash: transactionEntries[i].txid
             });
          }
        }
      //}
    }
  }).catch(function (error) {
    console.log(error);
  });
});

router.post('/getTransactionSender', (req, res) => {
  var transactionHash = req.body.transactionHash;
  var address = req.body.address;

  let url;
  if(process.env['ENV'] == "PROD"){
    url = 'https://chain.so/api/v2/get_tx/BTC/'+transactionHash;
  }else{
    url = 'https://chain.so/api/v2/get_tx/BTCTEST/'+transactionHash;
  }

  axios({
    method:'get',
    url: url
  }).then((response) => {
    var addressSenderArray = [];
    for(var i=0; i < response.data.data.outputs.length; i++){
      if(response.data.data.outputs[i].address !== address){
        addressSenderArray.push(response.data.data.outputs[i].address);
      }
    }

   res.send({
     message: "success",
     addressSender: addressSenderArray
   });
  }).catch(function (error) {
    console.log(error);
  });
});


router.post('/updateTransaction', (req, res) => {
  // get transaction records
  // then use those values to update
  var accessToken = req.body.accessToken;
  var transactionId = req.body.transactionId;
  var transactionHash = req.body.transactionHash;
  var addressSender = req.body.addressSender;

  var url = apiUrl+'/api/transactions/'+ transactionId +'/details?access_token='+accessToken;

  var options = {
      url: url,
      form: {
        "transactionStatus": "approved",
        "transactionHash": transactionHash,
        "addressSender": addressSender
      }
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      console.log(body);
      var data = JSON.parse(body);
      res.send({
        "message": "success"
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.put(options, callback);
});


router.post('/getTransaction/:id', (req, res) => {
  var id = req.params.id;
  var accessToken = req.body.accessToken;

  var url = apiUrl+"/api/transactions/"+ id +"?access_token="+accessToken;

  var options = {
      url: url
  };

  function callback(error, response, body) {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      console.log(body);
      var data = JSON.parse(body);
      res.send({
        "message": "success",
        "returnedData": data
      });
    }else{
      res.send({
        "message": "fail"
      });
    }
  }

  request.get(options, callback);
});

module.exports = router;
