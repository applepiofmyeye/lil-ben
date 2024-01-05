require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(express.static('public'))
app.use(cors({
    origin: 'http://localhost:3005'
}))

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const store_items = new Map([
    [1, { priceInCents: 2990, name: 'blue hoodie lil ben'}],
    [2, { priceInCents: 3090, name: 'gingerbread ben, gingy'}],
    [3, { priceInCents: 3490, name: 'santa ben, nick'}]
])

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = store_items.get(item.id)
                return {
                    price_data: {
                        currency: 'sgd',
                        product_data: {
                            name: storeItem.name,
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `${process.env.CLIENT_URL}/success.html`, // if client and server are separate, use CLIENT_URL here
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.listen(3000)

