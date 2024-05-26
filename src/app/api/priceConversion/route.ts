import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const amount = searchParams.get('amount');

  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/tools/price-conversion', {
      params: {
        amount: amount,
        symbol: 'ETH',
        convert: 'USD'
      },
      headers: {
        'X-CMC_PRO_API_KEY': '1491e39e-825c-44af-88f2-64f856d533e2',
      },
    });

    const ethToUsd = {
      symbol: response.data.data.symbol,
      amount: response.data.data.amount,
      price: response.data.data.quote.USD.price,
      last_updated: response.data.data.quote.USD.last_updated,
    };

    return NextResponse.json(ethToUsd);
  } catch (ex) {

    // error
    console.log(ex);
    return NextResponse.json({ error: 'An errror has occured!' });

  }

}