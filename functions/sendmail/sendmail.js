const client = require('@sendgrid/mail');
const SENDGRID_API_KEY = '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'
const {
  SENDGRID_TO_EMAIL,
  SENDGRID_FROM_EMAIL,
} = process.env;

exports.handler = async function (event, context, callback) {
  const { message, senderEmail, senderName } = JSON.parse(event.body);
  client.setApiKey(SENDGRID_API_KEY);

  const data = {
    to: 'mudassirnawazjavaid@gmail.com',
    from: 'em9152.dioscorides.org',
    subject: `New message from ${senderName} (${senderEmail})`,
    html: message,
  };

  try {
    await client.send(data);
    return {
      statusCode: 200,
      body: 'Message sent',
    };
  } catch (err) {
    return {
      statusCode: err.code,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};