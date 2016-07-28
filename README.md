# Android
1. uncomment `compile "com.google.firebase:firebase-messaging:9.2.0"` in node-modules/nativescript-plugin-firebase/platforms/android/include.gradle
2. open platforms/android/build.gradle and add `classpath "com.google.gms:google-services:3.0.0"` to the dependencies
3. in the same build.gradle, add `apply plugin: "com.google.gms.google-services"` to the bottom of the file
4. add the google-services.json file to platforms/android/

# iOS
1. uncomment `pod 'Firebase/Messaging'` in node-modules/nativescript-plugin-firebase/platforms/ios/Podfile
2. add the GoogleService-Info.plist to app/App_Resources/iOS
3. tns platform remove ios
4. tns run ios