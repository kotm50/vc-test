import React, { useEffect } from "react";
import Heading from "./Component/Heading";
import MainPage from "./Component/MainPage";
import Upload from "./Component/Post/Upload";
import PostArea from "./Component/Post/PostArea";
import Edit from "./Component/Post/Edit";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, clearUser } from "./Reducer/userSlice";
import firebase from "./firebase";
import Login from "./Component/User/Login";
import Register from "./Component/User/Register";
import ApplyMain from "./Component/Apply/ApplyMain";
import ApplyInput from "./Component/Apply/ApplyInput";
import ApplyArea from "./Component/Apply/ApplyArea";
import SecondaryAll from "./Component/Secondary/SecondaryAll";
import Secondary from "./Component/Secondary/Secondary";
import CompanyDetail from "./Component/Secondary/CompanyDetail";
import SecondaryStart from "./Component/Secondary/SecondaryStart";
import Capture from "./Component/Secondary/Capture";
import AdUpload from "./Component/Company/AdUpload";
import Legacy from "./Component/Legacy/LegacyData";

import { Container } from "react-bootstrap";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
    });
  }, [dispatch]);

  return (
    <>
      <Heading />
      <Container>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/post/:postNum" element={<PostArea />} />
          <Route path="/edit/:postNum" element={<Edit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Register />} />
          <Route path="/applyinput" element={<ApplyInput />} />
          <Route path="/apply" element={<ApplyMain />} />
          <Route path="/applylist/:applyNum" element={<ApplyArea />} />
          <Route path="/applies/:com_code" element={<CompanyDetail />} />
          <Route path="/start/:com_code" element={<SecondaryStart />} />
          <Route path="/secondaryall" element={<SecondaryAll />} />
          <Route path="/secondary/:manager_id" element={<Secondary />} />
          <Route path="/legacy" element={<Legacy />} />
          <Route path="/ad" element={<AdUpload />} />
          <Route path="/capture" element={<Capture />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
