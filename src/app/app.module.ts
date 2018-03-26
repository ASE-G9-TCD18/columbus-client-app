import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';


import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { LoginPage } from '../pages/login/login';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { TripdetailsProvider } from  '../providers/tripdetails/tripdetails';
// import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { JourneyPage } from '../pages/journey/journey';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';

import { HomepagePage } from '../pages/homepage/homepage';
import { ProfilePage } from '../pages/profile/profile';
import { TripPage } from '../pages/trip/trip';
import { TripHistoryPage } from '../pages/trip-history/trip-history';
import { AlltripsPage } from "../pages/alltrips/alltrips";
import { JoinedtripsPage } from "../pages/joinedtrips/joinedtrips";



import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Ionic2RatingModule } from 'ionic2-rating';

import { AgmCoreModule } from '@agm/core';

import { DatePipe } from '@angular/common'



// import {GoogleMap} from "@ionic-native/google-maps";


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    LoginPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    // SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,


    HomepagePage,
    JourneyPage,

    ProfilePage,
    TripPage,
    TripHistoryPage,
    AlltripsPage,
    JoinedtripsPage


  ],
  imports: [
    BrowserModule,
    HttpModule,
    Ionic2RatingModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        // { component: SpeakerListPage, name: 'SpeakerList', segment: 'speakerList' },
        { component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:speakerId' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: TripPage, name: 'TripPage', segment: 'login' },


        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: ProfilePage, name: 'ProfilePage', segment: 'profile' },
        { component: TripPage, name: 'TripPage', segment: 'trip' },
        { component: TripHistoryPage, name: 'TripHistoryPage', segment: 'trip-history' },

        // { component: AccountPage, name: 'AccountPage', segment: 'account' },

        { component: HomepagePage, name: 'HomepagePage', segment: 'homepage' },
        { component: AlltripsPage, name: 'AlltripsPage', segment: 'alltrips' },
        { component: JoinedtripsPage, name: 'JoinedtripsPage', segment: 'joinedtrips' },
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
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    // SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,


    ProfilePage,
    TripPage,
    TripHistoryPage,
    JoinedtripsPage,

    HomepagePage,
    JourneyPage,
    AlltripsPage



  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    AuthServiceProvider,
    Geolocation,
    DatePipe,
    TripdetailsProvider


  ]
})
export class AppModule { }
