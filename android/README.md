# E-Ration Card App - React Native for Android Studio

This is a React Native version of the E-Ration Card application that can be built and run in Android Studio.

## Prerequisites

1. **Node.js** (v16 or higher)
2. **Android Studio** with Android SDK
3. **Java Development Kit (JDK)** 11 or higher
4. **React Native CLI**: `npm install -g react-native-cli`

## Setup Instructions

### 1. Install Dependencies
```bash
cd android
npm install
```

### 2. Android Setup
1. Open Android Studio
2. Open the `android` folder as an Android project
3. Make sure you have the following installed in SDK Manager:
   - Android SDK Platform 33
   - Android SDK Build-Tools 33.0.0
   - Android Emulator (if you want to use emulator)

### 3. Configure Environment Variables
Add these to your `~/.bashrc` or `~/.zshrc`:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 4. Run the Application

#### Option A: Using React Native CLI
```bash
# Start Metro bundler
npm start

# In another terminal, run on Android
npm run android
```

#### Option B: Using Android Studio
1. Open the `android` folder in Android Studio
2. Wait for Gradle sync to complete
3. Click the "Run" button or press Shift+F10

## Project Structure

```
android/
├── android/                 # Native Android code
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   └── java/com/erationcardapp/
│   │   └── build.gradle
│   └── build.gradle
├── src/                     # React Native source code
│   ├── components/          # Reusable components
│   ├── contexts/           # React contexts (Auth, Language)
│   ├── screens/            # Screen components
│   └── data/               # Mock data
├── App.tsx                 # Main app component
└── package.json           # Dependencies and scripts
```

## Features

- **Multi-language Support**: English, Marathi, Hindi
- **Authentication**: Aadhaar-based OTP login
- **Dashboard**: Overview of ration card details
- **Ration Card View**: Digital ration card display
- **Applications**: Track application status
- **Notifications**: System notifications
- **Profile Management**: Edit personal and family information
- **Native Android UI**: Material Design components

## Building APK

### Debug APK
```bash
cd android
./gradlew assembleDebug
```
The APK will be generated at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK
```bash
cd android
./gradlew assembleRelease
```

## Demo Credentials

Use these Aadhaar numbers for testing:
- `123456789012` (Rajesh Kumar)
- `234567890123` (Priya Sharma)
- `345678901234` (Amit Singh)
- `456789012345` (Sunita Devi)

Enter any 6-digit OTP to complete login.

## Troubleshooting

1. **Metro bundler issues**: Run `npm start --reset-cache`
2. **Gradle sync failed**: Check Android SDK installation
3. **App crashes**: Check React Native logs with `npx react-native log-android`
4. **Build errors**: Clean and rebuild with `./gradlew clean`

## Customization

- **App Icon**: Replace files in `android/app/src/main/res/mipmap-*/`
- **App Name**: Edit `android/app/src/main/res/values/strings.xml`
- **Package Name**: Change in `android/app/build.gradle` and `AndroidManifest.xml`
- **Colors/Themes**: Modify `android/app/src/main/res/values/styles.xml`

## Production Deployment

1. Generate a signed APK using Android Studio
2. Upload to Google Play Store
3. Configure proper keystore for release builds
4. Update version codes in `build.gradle`

This React Native version provides a native Android experience while maintaining all the functionality of the original web application.