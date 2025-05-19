import LayoutAdmin from "../layout/LayoutAdmin";
import LayoutDefault from "../layout/LayoutDefault";
import LoginAdmin from "../Pages/Admin/LoginAdmin";
import Register from "../Pages/Client/Auth/Register";
import Login from "../Pages/Client/Auth/Login";
import ErrorPage from "../Pages/Client/ErrorPage404";
import Home from "../Pages/Client/Home";
import Method from "../Pages/Client/Method";
import Privacy from "../Pages/Client/Privacy";
import Quotes from "../Pages/Client/Quotes";
import Terms from "../Pages/Client/Terms";
import ForgotPassword from "../Pages/Client/Auth/ForgotPassword";
import Setting from "../Pages/Client/Setting";
import Note from "../Pages/Client/Features/Note";
import FlashcardPage from "../Pages/Client/Features/Flashcard/FlashcardPage";
import CreateTopicAndFlashcards from "../Pages/Client/Features/Flashcard/CreateTopicAndFlashcards";
import TopicDetail from "../Pages/Client/Features/Flashcard/TopicDetails";
import { Navigate } from "react-router-dom";
import TopicLibrary from "../Pages/Client/Features/Flashcard/TopicLibrary";
import TopicHome from "../Pages/Client/Features/Flashcard/TopicHome";
import EditTopic from "../Pages/Client/Features/Flashcard/EditTopic";
import ReviewFlashcards from "../Pages/Client/Features/Flashcard/ReviewFlashcards";
import Courses from "../Pages/Client/Courses/Courses";
import CourseDetail from "../Pages/Client/Courses/CourseDetail";
import CourseResult from "../Pages/Client/Courses/CourseResult";
import CourseVoca from "../Pages/Client/Courses/CourseVoca";
import CourseEx from "../Pages/Client/Courses/CourseEx";
import CourseReview from "../Pages/Client/Courses/CourseReview";
import CourseHistory from "../Pages/Client/Courses/CourseHistory";
import Game from "../Pages/Client/Features/Game/Game";
import MemoryMatch from "../Pages/Client/Features/Game/MemoryMatch";
import CourseGrammar from "../Pages/Client/Courses/CourseGrammar";
import CourseSentence from "../Pages/Client/Courses/CourseSentence";
import Progress from "../Pages/Client/Progress";

export const routers = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "progress",
        element: <Progress />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "password-forgot",
        element: <ForgotPassword />,
      },
      {
        path: "courses",
        element: <Courses/>,
      },
      {
        path: "courses/:courseId",
        element: <CourseDetail/>,
        children: [
          {
            path: "chapter/:chapterId/lesson/:lessonId/vocabulary",
            element: <CourseVoca />
          },
          {
            path: "chapter/:chapterId/lesson/:lessonId/grammar",
            element: <CourseGrammar />
          },
          {
            path: "chapter/:chapterId/lesson/:lessonId/sentence",
            element: <CourseSentence />
          },
          {
            path: "chapter/:chapterId/lesson/:lessonId/exercise",
            element: <CourseEx />
          },
          {
            path: "chapter/:chapterId/lesson/:lessonId/review",
            element: <CourseReview />
          },
          {
            path: "chapter/:chapterId/lesson/:lessonId/history",
            element: <CourseHistory />
          },
        ]
      },
      {
        path: "courses/:courseId/chapter/:chapterId/lesson/:lessonId/result",
        element: <CourseResult/>
      },
      {
        path: "game",
        element: <Game />,
      },
      {
        path: "game/memory",
        element: <MemoryMatch />,
      },
      
      {
        path: "method",
        element: <Method />,
      },
      {
        path: "quotes",
        element: <Quotes />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "note",
        element: <Note />,
      },
      {
        path: "flashcard",
        element: <FlashcardPage />,
        children: [
          { index: true, element: <Navigate to="home" /> },
          { path: "library", element: <TopicLibrary /> },
          { path: "home", element: <TopicHome /> },
          { path: "create", element: <CreateTopicAndFlashcards /> },
          { path: "library/topic/:id", element: <TopicDetail /> },
          { path: "home/topic/:id", element: <TopicDetail /> },
          { path: "update/:id", element: <EditTopic /> }, 
          { path: "review/:id", element: <ReviewFlashcards /> }, 
        ],
      },

      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,

  },
  {
    path: "/admin/login",
    element: <LoginAdmin />,
  },
  {
    path: "/admin/*", // Chuyển hướng về login nếu chưa đăng nhập
    element: <LoginAdmin />,
  },
];
