const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendNotification = functions.https.onRequest((request, response) => {
    console.log(request.body,"title")
    const payload = {
        notification: {
            title: request.body.title,
            body: request.body.message,
        }
    }
    admin.messaging().sendToDevice(request.body.token, payload);

    response.send("sent");
});

