import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom";
import Index from "../pages/Index";
import ViewPages from "../pages/ViewPages";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/view_movie/:id" component={ViewPages} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
