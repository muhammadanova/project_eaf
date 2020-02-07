const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
exports.sendMail = function (user, plan) {
  console.log(user, "<<<<<<<<<<<<<<<<<")
  const msg = {
    to: user.email,
    from: "anovanurfaqih@gmail.com",
    subject: 'Informing about your traveling plan from letspcker',
    html: `<h3>Hello ${user.email}!</h3> 
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




