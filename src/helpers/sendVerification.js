import Nexmo from 'nexmo';
import { updateUser } from '../queries';

export default async phoneNumber => {
  const nexmo = new Nexmo({
    apiKey: '694a8c0f',
    apiSecret: 'S4KL6cFvYQAXcdk4'
  });
  const text = Math.ceil(Math.random() * 10000);
  nexmo.message.sendSms(
    'Nexmo',
    phoneNumber,
    text,
    {
      type: 'unicode'
    },
    async (err, responseData) => {
      if (err) {
        return err;
      } else {
        if (responseData.messages[0]['status'] === '0') {
          const here = await updateUser(text, phoneNumber);
          return responseData;
        } else {
          return 'Oops something went wrong';
        }
      }
    }
  );
};
