
Please follow this steps to run the application 

1- npm install 
2- ionic serve
3- ionic platform add android/ios
4- ionic build android/ios --prod

note:To control the animation in the app(if there's) their will be one of this two ways:
1)There's a checkbox in the setting to on/off the animations in the app.

 -----------------------------OR-------------

2)There is a file named "app-config.ts" in the app folder
that helps you control the animation by changing  from true to false and vice versa

export const APP_CONFIG = {
   ALLOW_ANIMATION:true
};