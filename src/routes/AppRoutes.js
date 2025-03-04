import {
    Switch,
    Route
} from "react-router-dom";
import Login from './../components/auth/Login';
import Register from './../components/auth/Register';
import UsersPage from './../components/user/Users';
import PrivateRoutes from "./PrivateRoutes";
import ProjectsPage from "../components/projects/ProjectComponent";
import RolesUser from "../components/roles/RolesUser";

const AppRoutes = () => {
    return (
        <>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>

                <PrivateRoutes path="/users" component={UsersPage} />
                <PrivateRoutes path="/projects" component={ProjectsPage} />
                <PrivateRoutes path="/roles" component={RolesUser} />

                <Route path="/" exact>Home</Route>
                <Route path="*">404 Not Found</Route>
            </Switch>

        </>
    )
}

export default AppRoutes;