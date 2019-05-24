import React from "react";
import Header from "./components/header/header";
import Footer from "./components/Footer/Footer";
import RightLinks from "./components/header/rightlinks";
import LeftLinks from "./components/header/leftlinks";
import Posts from "./components/blog/posts";
import { Provider } from "react-redux";
import store from "./store/store";
import { loginUser } from "./actions/authActions";
import Logo from "./assets/img/logo.png";
import ErrorBoundry from "./components/ErrorBoundry/errorBoundry";
import "./App.css";

if (localStorage.getItem("currentUser") === null) {
  store.dispatch(loginUser("1"));
}
const Brand = <img src={Logo} alt="Niveus Solutions" width={120} />;
function App() {
  return (
    <Provider store={store}>
      <ErrorBoundry>
        <Header
          brand={Brand}
          color="white"
          rightLinks={<RightLinks />}
          leftLinks={<LeftLinks />}
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
        />
        <Posts />
        <Footer />
      </ErrorBoundry>
    </Provider>
  );
}

export default App;
