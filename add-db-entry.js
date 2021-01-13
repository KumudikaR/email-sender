const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    let name = event['Name']
    let email = event['Email']
    let feedback = event['Feedback']

    try {
        let data = await ddb.put({
            TableName: "feedback",
            Item: {
                Name: name,
                Email: email,
                Feedback: feedback
            }
        }).promise();
        console.log("Successfully Saved entry from email:", email);
        return { "message": "Successfully executed" };

    } catch (err) {
       console.log("Failed to save entry from email:", email, err);
       throw err;
    };

};