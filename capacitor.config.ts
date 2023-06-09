import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'tamaulipas.gob.aptra',
  appName: 'Aptra',
  webDir: 'www',
  bundledWebRuntime: false,
  // ios: {
  //   scheme: 'Aptra'
  // },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    CapacitorHttp: {
      enabled: true,
    },
    PrivacyScreen: {
      enable: true,
    },
  },
};

export default config;
