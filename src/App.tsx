import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.tsx";
import UserFeedPage from "./pages/UserFeedPage/UserFeedPage.tsx";
import PostPage from "./pages/PostPage/PostPage.tsx";
import WritePage from "./pages/WritePage/WritePage.tsx";
import SettingPage from "./pages/SettingPage/SettingPage.tsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";
import SuggestedPage from "./pages/SuggestedPage/SuggestedPage.tsx";
import ChatPage from "./pages/ChatPage/ChatPage.tsx";
import DiaryPage from "./pages/DiaryPage/DiaryPage.tsx";
import DemoApp from "./pages/DiaryPage/DiaryTestPage.tsx";
import { ReactQueryDevtools } from "react-query/devtools";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/userfeed"} element={<UserFeedPage />} />
          <Route path={"/post/:id"} element={<PostPage />} />
          <Route path={"/write"} element={<WritePage />} />
          <Route path={"/edit/:id"} element={<WritePage />} />
          <Route path={"/setting"} element={<SettingPage />} />
          <Route path={"/diary"} element={<DiaryPage />} />
          <Route path={"/"} element={<SuggestedPage />} />
          <Route path={"/chat"} element={<ChatPage />} />
          <Route path={"/test"} element={<DemoApp />} />
          <Route path={"*"} element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
    </>
  );
}

export default App;
