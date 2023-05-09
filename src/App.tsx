import React, { useState, useEffect, useContext, useMemo, createContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonNav,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Classes from './pages/Classes';
import Inbox from './pages/Inbox';
import Join from './pages/Join';
import Profile from './pages/Profile';
import ViewClass from './pages/ViewClass';
import ViewQuiz from './pages/ViewQuiz';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Bootstrap */
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

/* Default Styling */
import './pages/Default.css';

//React Icons
import { HiOutlinePaperAirplane } from 'react-icons/hi';
import { AiOutlineMail } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { IconContext } from 'react-icons/lib';
import TakeQuiz from './pages/TakeQuiz';

setupIonicReact();

interface UserContextType {
  userLogged: boolean,
  setUserLogged: (userLogged: boolean) => void
}

export const UserContext = createContext<UserContextType>({
  userLogged: false,
  setUserLogged: () => { }
});

const MyApp: React.FC = () => {
  const history = useHistory();
  const [userLogged, setUserLogged] = useState(false);
  const userId = localStorage.getItem('userId');

  return (
    <UserContext.Provider value={{ userLogged, setUserLogged }}>
      <IonApp style={{ backgroundColor: '#1E304D' }}>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/classes">
                <Classes />
              </Route>
              <Route exact path="/inbox">
                <Inbox />
              </Route>
              <Route exact path="/join">
                <Join />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/viewclass">
                <ViewClass />
              </Route>
              <Route exact path="/viewquiz">
                <ViewQuiz />
              </Route>
              <Route exact path="/takequiz">
                <TakeQuiz />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot='bottom' style={{ display: userLogged ? 'flex' : 'none'}}>
              <IonTabButton tab="classes" href="/classes" style={{ backgroundColor: '#141f31' }}>
                <li className='d-flex flex-column align-items-center py-2 flex-grow-1'>
                  <IconContext.Provider value={{ size: '2em' }}>
                    <HiOutlinePaperAirplane />
                  </IconContext.Provider>
                  <IonLabel className="bg-transparent" style={{ fontSize: '1.3em' }}>Classes</IonLabel>
                </li>
              </IonTabButton>
              <IonTabButton tab="inbox" href="/inbox" style={{ backgroundColor: '#141f31' }}>
                <li className='d-flex flex-column align-items-center py-2 flex-grow-1'>
                  <IconContext.Provider value={{ size: '2em' }}>
                    <AiOutlineMail />
                  </IconContext.Provider>
                  <IonLabel className="bg-transparent" style={{ fontSize: '1.3em' }}>Inbox</IonLabel>
                </li>
              </IonTabButton>
              <IonTabButton tab="join" href="/join" style={{ backgroundColor: '#141f31' }}>
                <li className='d-flex flex-column align-items-center py-2 flex-grow-1'>
                  <IconContext.Provider value={{ size: '2em' }}>
                    <BiSearchAlt />
                  </IconContext.Provider>
                  <IonLabel className="bg-transparent" style={{ fontSize: '1.3em' }}>Join</IonLabel >
                </li>
              </IonTabButton>
              <IonTabButton tab="profile" href="/profile" style={{ backgroundColor: '#141f31' }}>
                <li className='d-flex flex-column align-items-center py-2 flex-grow-1'>
                  <IconContext.Provider value={{ size: '2em' }}>
                    <CgProfile />
                  </IconContext.Provider>
                  <IonLabel className="bg-transparent" style={{ fontSize: '1.3em' }}>Profile</IonLabel>
                </li>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </UserContext.Provider>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <MyApp />
  </BrowserRouter>
);

export default App;
