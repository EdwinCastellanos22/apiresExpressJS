const paypal = require("@paypal/checkout-server-sdk");

function client() {

    return new paypal.core.PayPalHttpClient(
        new paypal.core.SandboxEnvironment(
            process.env.PAYPAL_CLIENT_ID,
            process.env.PAYPAL_CLIENT_SECRET
        )
    )

}

module.exports = { client, paypal };