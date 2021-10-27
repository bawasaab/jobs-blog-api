importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyCnt75fJxj5QGSCgESdXA6Frf4OGHLJnOU",
    authDomain: "jobsnplacements-android-fcm.firebaseapp.com",
    projectId: "jobsnplacements-android-fcm",
    storageBucket: "jobsnplacements-android-fcm.appspot.com",
    messagingSenderId: "1058558568445",
    appId: "1:1058558568445:web:6f9016ea440b49a918db94",
    measurementId: "G-YZZGM6NSK9"
};

firebase.initializeApp(firebaseConfig);
const messaging=firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    const notification=JSON.parse(payload);
    const notificationOption={
        body:notification.body,
        icon:notification.icon
    };
    return self.registration.showNotification(payload.notification.title,notificationOption);
});