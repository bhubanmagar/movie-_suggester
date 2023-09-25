import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom";
import Index from "../pages/Index";
import ViewPages from "../pages/ViewPages";
import Addmovie from "../pages/Addmovie";
import Login from "../pages/Login";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/view_movie/:id" component={ViewPages} />
        <Route path="/add" component={Addmovie} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
