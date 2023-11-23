import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async checkoutPage() {
    console.log('value of body is');
    const stripe = require('stripe')('pk_test_51OFGqHSHwrFWfvIREDEsUgHfhz2xdZVo9DO7yKKxtEkLGlFg96EUa814mCi82KeMquq2bhd4U0HTqeyRFEYO7Mth00ZqFtsBNM');
    // console.log('value of stripe at line 13 is', stripe);

    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2023-10-16' }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'eur',
      customer: customer.id,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: 'pk_test_51OFGqHSHwrFWfvIREDEsUgHfhz2xdZVo9DO7yKKxtEkLGlFg96EUa814mCi82KeMquq2bhd4U0HTqeyRFEYO7Mth00ZqFtsBNM'
    };
  }
}
