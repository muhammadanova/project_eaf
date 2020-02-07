const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
exports.sendMail = function (user) {
  console.log(user, "<<<<<<<<<<<<<<<<<")
  const msg = {
    to: user.email,
    from: "fadhilahrayafi@gmail.com",
    subject: 'Informing about your traveling plan from letspcker',
    html: `<h3>Hello ${user.username}!</h3> 
    <br>We are from letspacker want to inform you about your plan
    <br>Here is a detail about your plan:
    <ul>
      <li>
        title: ${plan.title}
      </li>
      <li>
        title: ${plan.province}
      </li>
      <li>
        title: ${plan.city}
      </li>
      <li>
        title: ${plan.date_plan}
      </li>
      <li>
        title: ${plan.itinerary}
      </li>
      <li>
        title: ${plan.transportation}
      </li>
    </ul>
    Thank you for using our aplication!`,
  };
  console.log("masuk")
  sgMail.send(msg);
} 




