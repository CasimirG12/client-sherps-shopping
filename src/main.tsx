import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./css/index.css";
import GlobalProvider from "./context/globalContext.tsx";
import Root from "./routes/Root.tsx";
import Login from "./routes/Authentication/Login.tsx";
import Home from "./routes/Authenticated/Home.tsx";
import AuthProvider from "./context/authContext.tsx";
import Recipes from "./routes/Authenticated/Recipes.tsx";
import ShoppingLists from "./routes/Authenticated/ShoppingLists.tsx";
import LoggedInLayout from "./routes/Authenticated/LoggedInLayout.tsx";
import ShoppingListDetail from "./routes/Authenticated/ShoppingListDetail.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GlobalProvider>
          <Routes>
            <Route path="/" element={<Root />}></Route>
            <Route path="login" element={<Login />} />
            <Route element={<LoggedInLayout />}>
              <Route path="home" element={<Home />} />
              <Route path="recipes" element={<Recipes />} />
              <Route path="shopping-lists" element={<ShoppingLists />}>
                <Route path=":id" element={<ShoppingListDetail />} />
              </Route>
            </Route>
          </Routes>
        </GlobalProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
