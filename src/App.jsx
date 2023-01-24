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
import PersistUser from "./component/PersistUser";

const ROLES_LIST = {
  Admin: 5000,
  Editor: 3000,
  User: 1000,
};

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
        <Route element={<PersistUser />}>
          <Route element={<AuthRequire allowedRoles={[ROLES_LIST.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route
            element={
              <AuthRequire
                allowedRoles={[ROLES_LIST.Editor, ROLES_LIST.Admin]}
              />
            }
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>
          <Route element={<AuthRequire allowedRoles={[ROLES_LIST.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route element={<AuthRequire allowedRoles={[ROLES_LIST.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
        </Route>
        <Route path="*" element={<MissingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
