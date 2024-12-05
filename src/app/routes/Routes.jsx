import React from "react";
import { Route, Routes as RoutesContainer } from "react-router-dom";

import { ROLE_ADMIN, ROLE_USER } from "../constants/rolesConstant";
import * as URL from "../constants/urls/urlFrontEnd";
import AdminHomeView from "../views/AdminHomeView";
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import { PrivateRoute } from "./PrivateRoute";
import PasswordRenewalView from "../views/PasswordRenewalView";
import ForgotPasswordView from "../views/ForgotPasswordView";
import InscriptionView from "../views/InscriptionView";
import UserProfile from "../components/userProfile/userProfile";
import ActivationView from "../views/ActivationView";
import UserProfileView from "../views/UserProfileView";
import RoutesGestionView from "../views/RoutesGestionsView";
// import About from "../views/About";
import ModifyPassword from "../components/modifyPassword/ModifyPassword";
import ConfirmationView from "../views/ConfimationView";

import DetailsRoute from "../components/itinerary/DetailsRoute";
import HomepageResults from "../components/homepage/HomepageResults";

/**
 * Routes of the application
 * with public and private route
 *
 * @author Peter Mollet
 */
const Routes = () => {
    return (
        <RoutesContainer>
          
            <Route path={URL.URL_HOME} element={<HomeView />} />
          
            <Route
                path={URL.URL_ADMIN_HOME}
                element={
                    <PrivateRoute roles={[ROLE_ADMIN]}>
                        <AdminHomeView />
                    </PrivateRoute>
                }
            />
            
            <Route path={URL.URL_LOGIN} element={<LoginView />} />
            
            <Route
                path={URL.URL_PASSWORD_RENEWAL + "/:email/:key"}
                element={<PasswordRenewalView />}
            />
            
            <Route path={URL.URL_FORGOT} element={<ForgotPasswordView />} />
            
            <Route path={URL.URL_LOGIN} element={<LoginView />} />
            
            <Route path={URL.URL_REGISTER} element={<InscriptionView />} />
            
            <Route
                path={URL.URL_PROFILE}
                element={
                    <PrivateRoute roles={[ROLE_USER]}>
                        <UserProfileView />
                    </PrivateRoute>
                }
            />
           
            <Route
                path={URL.URL_ACTIVATION + "/:email/:key"}
                element={<ActivationView />}
            />
           
            <Route
                path={URL.URL_PROFILE}
                element={
                    <PrivateRoute roles={[ROLE_USER]}>
                        <UserProfile />
                    </PrivateRoute>
                }
            />
           
            <Route
                path={URL.URL_ACTIVATION + "/:email/:key"}
                element={<ActivationView />}
            />
           
            {/* <Route path={URL.URL_ABOUT} element={<About />} /> */}
           
            <Route
                path={URL.URL_DETAIL_ROUTE + "/:id"}
                element={<DetailsRoute />}
            />

            <Route
                path={URL.URL_TRAJETS}
                element={
                    <PrivateRoute roles={[ROLE_USER]}>
                        <RoutesGestionView />
                    </PrivateRoute>
                }
            />
            <Route path={URL.URL_ACTIVATION + '/:email/:key'} element={<ActivationView />} />

            <Route path="/confirmation" element={<ConfirmationView />} />

            <Route path="/modify" element={
                <PrivateRoute roles={[ROLE_USER]}>
                    <ModifyPassword />
                </PrivateRoute>} />


            <Route path={URL.URL_HOMEPAGE_RESULTS} element={<HomepageResults />} />
        </RoutesContainer>
    );
};

export default Routes;
