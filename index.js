const { createWalletFromMnemonic, signTx } = require('@tendermint/sig');
const Arweave = require('arweave');

const axios = require('axios');

const arweave = Arweave.init({
  host: 'arweave.net',// Hostname or IP address for a Arweave host
  port: 443,          // Port
  protocol: 'https',  // Network protocol http or https
  timeout: 20000,     // Network request timeouts in milliseconds
  logging: false,     // Enable network request logging
});

process.env.NODE_ENDPOINT = "https://node.atomscan.com";
process.env.MNEMONIC = "Cosmos is what I think as great network ever haha thank you!"
process.env.CHAIN_ID = "cosmoshub-4"
process.env.TO_ADDRESS = "cosmos1qzn296fjuez3m0v397fm5dqtqchxqy0pfxpxkl"
process.env.ARWEAVE_WALLET = `{ "kty": "RSA", "n": "uJ3B2hKwVF1G8d3HV8pYYcI_rcbQtKpyMsN7pVGOOU3YqjZwBQxt9POK4_SypHiD0ypA3UTlW22jMPwQrbksuc03ztZPpIqz_OB4Eogv2gvQ5iLASznmelZ_DdQxj9n2htLkvvBN6m5X0Qfs318wE6-xuIJJ0VMmuejsc4bWlVg4gB-AbEzIRBq0rbFifjfQzc8lAJi96mTamCekGuhvavXc-I1EDh7O7PaBLu5sCNWIxR0JIEJRMbGZfVhFysGm1aeKWOc2_zVcXuDNCPsavUozeB3_QGRxnDWL8dD0rq-E93TqVQXBcmL_w_xqJHrlYRhFL-Oph3k2qNy2n8GJy4cAZh4JZhWQ008c2OpDfgLkiXYo3mPg8_ZTbOOQWnK4GnWjLy-8i2OWDplqCgs5k4Hrxjdtnig4EMZdKkZvQwmchNUGSREh6ZSqG_QCleIvVCTiDL2CVJleXHxh8tn-4IH7GWrmDanBXLILy6L9xzGXF7WS8oWMa-zpGtwiTVS4_YGctB13XOKXgTRkqfuLKfXRP047euvFRo_zut8Kk8oJDHgXxrK3gY1a-GYreR5biuMZPkBfyWOI2N-h06uLVAmXqi991Pc3HlzvJOtTmxdenl4vxsyGkwoMCOv4tCdJaB4fNfOKBio9vPy7wDfU8PDjCcU9Z-vv02tJ4h5LsMU", "e": "AQAB", "d": "Fk96TdBUXt2m5TPYE1Pwul-vMmEEd9DhXCEjoCbq-SHfPTK29uU5pJCKCGJZ9GZcB_jjPdpFnXbycckEevoV3Z5fUC-2EDxy4-x8lkC_B6rF5AnvEyg8IiyxzgoGs0uz7zctTaXcxKfxFOHQTm5CcR6aa6HTKejSlUUAzjVNWV7_9PvZmTzuNszDaPo23OoB4d1Wq2vKB7mIcTrZKidMz7BGtALeZpZyi1B-7B0EEU086hVINQ3OoiLEWdGBHa-paciFf5jxnIXmU9D29k7iPF3rOmjln_KDiE0wTFjkOPgdKYqHhx7a8efk4NpwOVhgwAse0VrB8g1D_cQujb_l1u4rU7OrQTlvif5xIfM3wS_mLChUTqelaDdUWRjmRL1igZtAjCus8_Ap7ofe1DKwFpiPXKeyRtJMieGhpogu6TDSfiBX1RtDOxz7rROJjSP8pPGrJK7-FlQYRutNxfocVdzEZIf-ZK5B1f2Q0e3gr7apxBXOa8U0PM2p6t8bHrqJs0hLXEeWuoBL2vPstezYl9Y3-1XullgoWnxW1uz7KSfNBD5OH7ZzZ7PZYRKU0k3T6lS2Ah4yzE-6OQOo41XQgAN5fVGuBHTWrpMizqic_m3PDGU-6BEYhRzas7o-qE3DkhEZAtqJ8aUOohXIBqEP5lZP21OOEy7eh1z4QyjCDgE", "p": "5Tjkfj8MQwOd2S90rswDXZlm0rbpaB5QaVpwZ5ySL9TNjIqQPB4v8q5mVkuc-wpy8ogGSZr0sFReVla_cBylVELgf0JIR3ZsOyzn5ep7ED1ZLvioI2Y9QzUbr3JYxPbjZfXbJB6QgbM5mO6M4BLC3WhdpgSznVHiPm_Je84CZZ8x5xbnyU8otrQ_wuk1krZQkxlScbMcNslrm5dsqbHbCfcyYF2oQeZXPWeS9THBVxa7WVoEFhuq8hCEPO5CixZxdWKiV_-jDvz8pUJLR-haPao-pkmhKnae6oQnTaZLg1gxp0mOpIXVV8afsRFKJw9jU_MQp4bKM3UAo_g713uiGQ", "q": "zi7hVVn3aIG4Xs_maz__1B5E0fm_VBC8evuO7sju7lrMuXJebWBPH0K4wOB-FLM5GtVb4v8vyPoPEgtTPyH1Hnm9lbPLa0ZvYQb2iXvloYgwSKgGJix3-iZPrsnOlC5CoidVqn-1ou5zy9XkTGay5TONFKV3rcm6wFuQLfhOXw34iHcrZJv7kpl0Iht1pvCgBJlco1K0VuaQ2OhafzwUMaXkEfYsxgyzINpptZGbw_b4ogsH3QxxG-ztyW2FyntrgD9ZMaGudAVFFcF6oHTaGepY2zfybtfl_F59IJJ0pqlU05FCWG3RLXqA946mYsp8WHh0F7h3jHcAb2lvbGXRjQ", "dp": "aqqT4Y-zRAgNz0A_GwxC0K6O46VMbjAVGUGFpyF8AZgUYr8kKWWeyF6RrryW-1c8cFIOIvhhvyAzmhfaE_CwmspYL8AHZIHeEZdu_lWkGMWDl9EMZRSxk3HGRVl_p4CABzVmWaODeWeOePUhRzBTz7Y-RgBQGPg-wPFCIEOYZ_OxxCirick1V_f-59OgI3qFej5BWDmR-oi2c3v-i-UA2d1XavKKVsg6do-ZGlKh9sXUPtsdpbAQV36KGtSA0LqL56UTiMGj_liJtNlpsLeWLrXnW3hN8DWs89K1e3PUFfXXfVJEd5jz01nRfBNgn1aQ0UL90AdwVouu1Z6xMjANGQ", "dq": "lEh4_GZYnct1apLAl2-OsOIYAp9IL9BdjWEv2aGe3MNmqxSKvsTeApB8yRJq-r4umpLJo8Z9emAEyKhmdWgZnpJVe72z1XHxlmlok1YMvxBwEUDuMzQWEUzOT9mJfV6Lw4zgel-gpQ4zL2yj5SKTFG3vz-J04QLNEZyIY9dJnekxTgvOpGveEP_V2tW-1pIFs2kMi9VmJ31ovObWdt0hdNdm4FgYuVLW3RDXp6KR0Ozkwb2HKT3Sdw_9r7jZ2NbMaI6muiAalAxaNBxS8eU4Gh1FTFu_OmKBX_Ags3VA-b-cZw_4FBreroOFDwWDulb_-KygaZLcP6QyJu5AGUhc3Q", "qi": "tn9ivfoXPpg5x_a8NGLIBTfBTKmwOmws-sH8TZQNiDtGJ8EVwX_0xPWtyq4MEF4AzKQHd3wKWLKe79L6zV-GpZ3ro5xQGBo-FzDIoRNCXdeVu_0pd35TPeZ0h5WIPKoo8qYn_3moCERIobJa34bMXvp5lj5dfYOkdqJiaq3Tgu_04i22_3IJkQh7GitsHotiZ4vA-3io5oS1-50cCdmHQ3Wna_C0viErHQgPNF46QwafCOllZrbB4KCVSkRkfaaYs_9IX0gqoIWWq4YzJfzXj-urRL9ePvj34na7mAB7GL9WPoAhGOMEoW2URnSsiM6tLkvgK6p99dH-xNDPC8GMpA" }`;

const wallet = createWalletFromMnemonic(process.env.MNEMONIC); // BIP39 mnemonic string

process.env.ADDRESS = wallet.address;

const accountBalance = async (address) => {
  const response = await axios.get(process.env.NODE_ENDPOINT + '/cosmos/bank/v1beta1/balances/' + address)
  console.log(response.data.balances);
}

const getMetadata = async (address) => {
  const response = await axios.get(process.env.NODE_ENDPOINT + '/cosmos/auth/v1beta1/accounts/' + address)
  const { account_number, sequence } = response.data.account;
  const chain_id = process.env.CHAIN_ID;
  return {
    account_number,
    chain_id,
    sequence
  }
}

const cosmosTxn = async (msg) => {
  const signMeta = await getMetadata(process.env.ADDRESS);
  const tx = {
    fee: {
      amount: [{ amount: '1', denom: 'uatom' }],
      gas: '85000'
    },
    memo: msg,
    msg: [{
      type: 'cosmos-sdk/MsgSend',
      value: {
        from_address: process.env.ADDRESS,
        to_address: process.env.TO_ADDRESS,
        amount: [{ amount: '1', denom: 'uatom' }]
      }
    }]
  };
  const stdTx = signTx(tx, signMeta, wallet);
  const body = {
    tx: stdTx,
    mode: "sync"
  }
  console.log(body);
  const response = await axios
    .post(
      process.env.NODE_ENDPOINT + '/txs',
      body
    )
  console.log(response.data);
}

// await cosmosTxn('Welcom Riccardo T. Just for test msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg 100kb msg ');
// accountBalance(process.env.ADDRESS);

const genArweaveWallet = async () => {
  return await arweave.wallets.generate();
}

const getArweaveBalanceFromAddress = async (address) => {
  const balance = await arweave.wallets.getBalance(address);
  let ar = arweave.ar.winstonToAr(balance);
  return ar;
  // console.log(balance);
  //125213858712

  // console.log(ar);
  //0.125213858712
}

const getArweaveBalanceFromWallet = async (wallet) => {
  return await getArweaveBalanceFromAddress(await arweave.wallets.jwkToAddress(wallet))
}
// ;

// console.log(await genArweaveWallet())
// console.log(await arweave.wallets.jwkToAddress(JSON.parse(process.env.ARWEAVE_WALLET)));
// console.log(await getArweaveBalanceFromWallet(JSON.parse(process.env.ARWEAVE_WALLET)));
// arweave.network.getInfo().then(console.log);
// console.log(Buffer.from('Some data', 'utf8'));