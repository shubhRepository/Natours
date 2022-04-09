/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51KmXQUSCySrp1H5guIqM7gmhkH0NTPCkgsIGZhVm2oDTmWZwx20hfKq1VhzMY7BKFWL144LhOQKHsh6eshrgzwNC00f4CejrRa'
);
export const bookTour = async tourId => {
  try {
    const res = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    stripe.redirectToCheckout({
      sessionId: res.data.session.id
    });
  } catch (err) {
    // console.log(err);
    showAlert('error', err);
  }
};
