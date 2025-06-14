const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const [cgRes, fxRes] = await Promise.all([
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'),
      fetch('https://api.exchangerate.host/latest?base=RUB&symbols=USD')
    ]);

    const cgData = await cgRes.json();
    const fxData = await fxRes.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      btc: cgData.bitcoin.usd,
      eth: cgData.ethereum.usd,
      rub: fxData.rates.USD
    });
  } catch (err) {
    console.error('Ошибка при получении курсов:', err);
    res.status(500).json({ error: 'Ошибка при получении данных' });
  }
};
