## Please follow these steps to run the application 

1. npm install 
2. ionic serve
3. ionic platform add android/ios
4. ionic build android/ios --prod

- Note: To control the animation in the app(if it exists) their will be one of this two ways:

1. There's a checkbox in the setting to on/off the animations in the app.

2. There is a file named "app-config.ts" in the app folder that helps you control the animation by changing  from true to false and vice versa

```javascript
export const APP_CONFIG = {
   ALLOW_ANIMATION:true
};
```

___

## Missing features

- Facebook login
- Favorite
- Categories
- Post an ad
- Registration
- Hide Login button when logged out
- Hide Log out button when logged in
- Only logged in users should be able to post an ad
- Add app icon and remove spninner
- Profile
- My ads
- Reset Password