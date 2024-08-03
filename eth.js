const { ethers } = require("ethers");
const url = "wss://eth-mainnet.g.alchemy.com/v2/yRp2PzWrUWtESeJKOQU_dyYudFJdLegy ";

const init = function () {
  const customWsProvider = new ethers.WebSocketProvider(url);

  customWsProvider.on("pending", (tx) => {
    customWsProvider.getTransaction(tx)
      .then(function (transaction) {
        console.log(transaction);
      })
      .catch(error => {
        console.error(`Error fetching transaction: ${error}`);
      });
  });

  customWsProvider.on('error', (error) => {
    console.error(`Unable to connect to the WebSocket provider: ${error}, retrying in 3s...`);
    setTimeout(init, 3000);
  });

  customWsProvider.on('close', (code) => {
    console.warn(`Connection lost with code ${code}! Attempting reconnect in 3s...`);
    setTimeout(init, 3000);
  });
};

init();