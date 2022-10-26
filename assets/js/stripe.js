var PUBLISHABLE_KEY = 'pk_live_51L61UxAJhgsGRnFirgxNeL7GaISB0fXVkQtNwBXTAxbpLFqp8TqNuGZCZUn181AT1JND17UNdt21fUPHYgORGKI400R0ndzI7a';
// Replace with the domain you want your users to be redirected back to after payment
var DOMAIN = location.href.replace(/[^/]*$/, '');

var stripe = Stripe(PUBLISHABLE_KEY);

// Handle any errors from Checkout
var handleResult = function (result) {
  if (result.error) {
    var displayError = document.getElementById('error-message');
    displayError.textContent = result.error.message;
  }
};

document.querySelectorAll('button').forEach(function (button) {
  button.addEventListener('click', function (e) {
    var mode = e.target.dataset.checkoutMode;
    var priceId = e.target.dataset.priceId;
    var items = [{ price: priceId, quantity: 1 }];

    // Make the call to Stripe.js to redirect to the checkout page
    // with the sku or plan ID.
    stripe
      .redirectToCheckout({
        mode: mode,
        lineItems: items,
        successUrl:
          DOMAIN + 'success.html?session_id={CHECKOUT_SESSION_ID}',
        cancelUrl:
          DOMAIN + 'canceled.html?session_id={CHECKOUT_SESSION_ID}',
      })
      .then(handleResult);
  });
});