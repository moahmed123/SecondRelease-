package com.expandcart.eshopeing;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.swmansion.reanimated.ReanimatedPackage;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import io.github.traviskn.rnuuidgenerator.RNUUIDGeneratorPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import io.invertase.firebase.storage.RNFirebaseStoragePackage;// M-alaa
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // M-alaa
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;// M-alaa


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeLocalizationPackage(),
            new ReactNativeRestartPackage(),
            new RNFirebasePackage(),
            new ReanimatedPackage(),
            new ExtraDimensionsPackage(),
            new RNUUIDGeneratorPackage(),
            new SplashScreenReactPackage(),
            new RNGestureHandlerPackage(),

            new RNFirebaseStoragePackage(), // M-alaa
            new RNFirebaseFirestorePackage(),// M-alaa
            // new RNFirebaseNotificationsPackage()// M-alaa
            new RNFirebaseAuthPackage()// M-alaa            

      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
