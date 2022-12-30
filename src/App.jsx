import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./component/Layout";
import RegisterForm from "./RegisterForm";
import Login from "./Login";
import MissingPage from "./component/MissingPage";
import Lounge from "./component/Lounge";
import Admin from "./component/Admin";
import Home from "./component/Home";
import Unauthorized from "./component/Unauthorized";
import LinkPage from "./component/LinkPage";
import Editor from "./component/Editor";
import AuthRequire from "./AuthRequire";
import FormStep from "./MultiStepForm/FormStep";
import FormContexProvider from "./MultiStepForm/FormContext";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<LinkPage />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="linkpage" index element={<LinkPage />} />
        <Route path="login" element={<Login />} />

        <Route
          path="form-step"
          element={
            <FormContexProvider>
              <FormStep />
            </FormContexProvider>
          }
        />

        {/* protected Page */}
        <Route element={<AuthRequire />}>
          <Route path="/" element={<Home />} />
          <Route path="lounge" element={<Lounge />} />
          <Route path="admin" element={<Admin />} />
          <Route path="editor" element={<Editor />} />
        </Route>

        <Route path="*" element={<MissingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
