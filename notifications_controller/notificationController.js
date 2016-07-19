console.log("Hello world");
var Horizon = require('@horizon/client/dist/horizon-dev');
var FCM = require('fcm-push-notif');
var horizon = new Horizon("localhost:8181");
var request = require('request');
var http = require('http');
var chats = horizon("chats");

var serverKey = 'AIzaSyDnaoK0AOYC8peJZn3HvDQc-zv6hL-Bukg';
var fcm = new FCM(serverKey);

chats.fetch().subscribe(function (items) {
    console.log(items);
    items.forEach(function (item) {
        console.log("Item: " + item);
    }, this);
}, function (error) {
    console.log(error);
});

pushNotification();

function pushNotification(notification) {

    var message = {
        'to': 'cfAK_z6WIBM:APA91bGRGiFrtRq_NCLzHCIRdKm7lJTN_QKFWQtTFBThpnNncuVnDvj2PCMOANaVRNG3brBof5eZjfYYO9h7A9fM__9mxrUeiNmcvypeWKfF9S1XekcM1OeU7HS8j9WMQTAkJEsWggbE',
        collapse_key: 'new message',
        notification: {
            title: "title of code notification",
            body: "Body of code notification"
        }
    };

    fcm.send(message)
        .then(function(response) {
            console.log("Successfully sent with response: " + response);
        })
        .catch(function(error) {
            console.log("Got error: " + eror);
        });
}