import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import SignUp from "../pages/member/sign_up/SignUp";
import Main from "../pages/main/Main";
import SignIn from "../pages/member/sign_in/SignIn";
import Modify from "../pages/member/modify/Modify";
import PostLlist from "../pages/post/postlist/PostLlist";
import PostWrite from "../pages/post/postwrite/PostWrite";
import PostRead from "../pages/post/postread/PostRead";
import PostUpdate from "../pages/post/postupdate/PostUpdate";
import File from "../pages/file/File";

const router = createBrowserRouter([
  {
    path: "/",
    element : <Layout />,
    children : [
      {
        path: "",
        element: <Main />
      },
      {
        path: "/members",
        children : [
          {
            path : "sign-up",
            element : <SignUp />
          },
          {
            path : "sign-in",
            element : <SignIn />
          },
          {
            path : "modify",
            element : <Modify />
          }
        ]
      },
      {
        path: "posts",
        children:[
          {
            path: "list",
            element: <PostLlist />
          },
          {
            path: "write",
            element: <PostWrite />
          },
          {
            path: "read/:id",
            element: <PostRead />
          },
          {
            path: "update/:id",
            element: <PostUpdate />
          }

        ]
      },
      {
        path: "file",
        element: <File />
      }
    ]
  }
])

export default router;