/* 
1) Replace 'Source' email address with your Amazon SES-verified sender email address in the same AWS account and Region.
2) Click Deploy button on the Toolbar.
3) Once the deployment is successful, copy the API endpoint URL from the output parameter section of Deployment Summary 
view or via the Deployment tab of Project → Show Info.
4) Using an HTTP client, make a POST request to the above API endpoint URL.
(Refer https://www.slappforge.com/blog/email-triggers-when-a-new-record-is-created-in-dynamodb for more details)
*/
const AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = async (event) => {

    let tabledetails = event.Records[0].dynamodb;
    console.log(tabledetails);

    let name = tabledetails.NewImage.Name.S;
    let email = [tabledetails.NewImage.Email.S];
    let messagebody = 'Hi' + ' ' + name + '! Thank you for your feedback'

    try {
        let data = await ses.sendEmail({
            Source: "sender@example.com",
            Destination: {
                ToAddresses: email
            },
            Message: {
                Subject: {
                    Data: "Thank you for your feedback!"
                },
                Body: {
                    Text: {
                        Data: messagebody
                    }
                }
            }
        }).promise();
        console.log("Sent email to", email);
        return { "message": "Successfully executed" };

    } catch (err) {
        console.log("Email sending failed", err);
        throw err;
    };

};