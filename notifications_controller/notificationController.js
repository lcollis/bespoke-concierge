console.log("Hello world");
var Horizon = require('@horizon/client/dist/horizon-dev');
var FCM = require('fcm-push-notif');
var horizon = new Horizon("localhost:8181");
var request = require('request');
var http = require('http');
var chats = horizon("chats");
var userPushID = horizon("userPushID");

var pushIDArray;

var serverKey = 'AIzaSyDnaoK0AOYC8peJZn3HvDQc-zv6hL-Bukg';
var fcm = new FCM(serverKey);

var ADMIN_ID = ""; //id of the admin group


//keep updated list of userID to push notification IDs
userPushID.watch().subscribe(function(newPushIDArray) {
    pushIDArray = newPushIDArray;
    console.log("Push ID array: " + JSON.stringify(newPushIDArray));
}, function(error) {
    console.log(error);
});

//watch for new chats and send notifications accordingly
chats.watch({ rawChanges: true }).subscribe(function (changes) {
    if (changes.type === "change") {
        var messages = changes.new_val.messages.sort(function (a, b) { return b.timeStamp.getTime() - a.timeStamp.getTime(); });
        var guestID = changes.new_val.id;
        var senderID = messages[0].sender;
        var messageText = messages[0].text;

        //send front desk message notification to guest
        if(senderID !== guestID) {
            var guestPushID = pushIDArray.find(function(guest) {
              return guest.id === guestID;
            }).pushToken;
            console.log("Guest pushID: " + guestPushID);
            pushNewMessageNotification(guestPushID, messageText);
        }

        //send guest message notification to front desk
        //TODO setup admin topic notifications for this
        // if(senderID === guestID) {
        //     pushNewMessageNotification(ADMIN_ID, messageText);
        // }
    }
}, function (error) {
    console.log(error);
});

function pushNewMessageNotification(pushUserID, messageText) {

    var message = {
        'to': pushUserID,
        collapse_key: 'new message',
        notification: {
            title: "New Message From the Front Desk",
            body: messageText
        }
    };

    fcm.send(message)
        .then(function (response) {
            console.log("Successfully sent with response: " + response);
        })
        .catch(function (error) {
            console.log("Got error: " + eror);
        });
}