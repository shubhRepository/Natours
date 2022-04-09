/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';
export const signup = async (name, email, password, cnfpassword) => {
  try {
    // console.log(email, password);
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm: cnfpassword
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'signed up successfully');
      setTimeout(() => location.assign('/'), 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
