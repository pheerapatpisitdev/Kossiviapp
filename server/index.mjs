import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import omiseFactory from 'omise';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(express.json());

const secretKey = process.env.OMISE_SECRET_KEY;

if (!secretKey) {
  // eslint-disable-next-line no-console
  console.warn('OMISE_SECRET_KEY is not set. Payment API will not work correctly.');
}

const omise = secretKey
  ? omiseFactory({
      secretKey,
      omiseVersion: '2019-05-29',
    })
  : null;

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Create a one-off membership charge via Omise
app.post('/api/subscribe', async (req, res) => {
  try {
    if (!omise) {
      return res.status(500).json({ error: 'Omise is not configured on server' });
    }

    const { planCode, cardToken, email } = req.body ?? {};

    if (!planCode || !cardToken) {
      return res.status(400).json({ error: 'planCode and cardToken are required' });
    }

    const pricing = {
      monthly: 19900, // 199 THB in satang
      yearly: 199000, // 1,990 THB in satang
    };

    const amount = pricing[planCode];

    if (!amount) {
      return res.status(400).json({ error: 'Invalid planCode' });
    }

    const customer = await omise.customers.create({
      email,
      card: cardToken,
      description: `Membership ${planCode}`,
    });

    const charge = await omise.charges.create({
      amount,
      currency: 'thb',
      customer: customer.id,
      description: `Membership ${planCode}`,
    });

    if (!charge.paid) {
      return res
        .status(400)
        .json({ error: 'Payment not completed', chargeId: charge.id, chargeStatus: charge.status });
    }

    // TODO: update Supabase subscription status here using charge/customer data

    return res.json({
      ok: true,
      chargeId: charge.id,
      customerId: customer.id,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('subscribe-error', err);
    return res.status(500).json({ error: 'Unexpected error while processing subscription' });
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${port}`);
});

