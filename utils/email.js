const nodemailer = require('nodemailer');
const pug = require('pug');
const htt = require('html-to-text');
// new Email(user, url).sendWelcome();
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Shubham Maheshwari <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SG_USERNAME,
          pass: process.env.SG_PASS
        }
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async send(template, subject) {
    //send mail actually
    //1 render html based on template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });
    //2 define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htt.fromString(html)
    };
    //3 create transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome To NATOURS Group ! ! !');
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Your Password Reset Link is HERE');
  }
};

// const sendEmail = async options => {
//   await transporter.sendMail(mailOptions);
// };
