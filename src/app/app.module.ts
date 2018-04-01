import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { ConferenceApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { LoginPage } from '../pages/login/login';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SignupPage } from '../pages/signup/signup';
import { TripdetailsProvider } from  '../providers/tripdetails/tripdetails';
import { JourneyPage } from '../pages/journey/journey';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { HomepagePage } from '../pages/homepage/homepage';
import { ProfilePage } from '../pages/profile/profile';
import { TripPage } from '../pages/trip/trip';
import { TripHistoryPage } from '../pages/trip-history/trip-history';
import { AlltripsPage } from "../pages/alltrips/alltrips";
import { MatchedTripsPage } from '../pages/matched-trips/matched-trips';
import { RatingPage} from "../pages/rating/rating";
import { PendingRequestsPage} from "../pages/pending-requests/pending-requests"
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Ionic2RatingModule } from 'ionic2-rating';
import { AgmCoreModule } from '@agm/core';
import { DatePipe } from '@angular/common'


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    LoginPage,
    PopoverPage,
    ScheduleFilterPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    RatingPage,
    HomepagePage,
    JourneyPage,
    ProfilePage,
    TripPage,
    TripHistoryPage,
    AlltripsPage,
    MatchedTripsPage,
    PendingRequestsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Ionic2RatingModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: TripPage, name: 'TripPage', segment: 'login' },


        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: ProfilePage, name: 'ProfilePage', segment: 'profile' },
        { component: TripPage, name: 'TripPage', segment: 'trip' },
        { component: TripHistoryPage, name: 'TripHistoryPage', segment: 'trip-history' },


        { component: HomepagePage, name: 'HomepagePage', segment: 'homepage' },
        { component: AlltripsPage, name: 'AlltripsPage', segment: 'alltrips' },
        { component: JourneyPage, name: 'JourneyPage', segment: 'journeyPage' },


        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: ProfilePage, name: 'ProfilePage', segment: 'profile' },
        { component: TripPage, name: 'TripPage', segment: 'trip' },
        { component: TripHistoryPage, name: 'TripHistoryPage', segment: 'trip-history' }

      ]
    }),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCnahpwY4LRTYlzEHnER3B_Y8NR1HzmrVE",
      libraries: ["places"]
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    LoginPage,
    PopoverPage,
    ScheduleFilterPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    RatingPage,
    ProfilePage,
    TripPage,
    TripHistoryPage,
    MatchedTripsPage,
    HomepagePage,
    JourneyPage,
    AlltripsPage,
    PendingRequestsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    AuthServiceProvider,
    DatePipe,
    TripdetailsProvider,
    Geolocation,
    NativeGeocoder


  ]
})
export class AppModule { }
