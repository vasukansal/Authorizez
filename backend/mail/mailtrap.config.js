import {MailtrapClient} from 'mailtrap';
import dotenv from "dotenv";
dotenv.config();

// const TOKEN = process.env.MAILTRAP_TOKEN;    //mailtrap api key or token

export const mailTrapClient = new MailtrapClient({             //Earlier this variable was named as client
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "mailtrap@demomailtrap.com", //Jisse mail recieve hoga
  name: "Vasu",  //This means the name of the email which is shown as the thumbail
};


// const recipients = [
//   {
//     email: "vasu12b8075@gmail.com",          This waws the by default code for the recipent which is the owner but we need the dyncmiac mechanism for every user who signsup thaths why we are commenting it out for now 
//   }
// ];

// client
//   .send({                  //We will not have this function here it is the config file
//     from: sender,
//     to: recipients,   
//     subject: "Auth Project Mail recieved", 
//     html: "You are not banned for testing another email :)",  //body of the email & earlier, in place of html, it was text only, but html enables to send more beautiful and complex html emails
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);