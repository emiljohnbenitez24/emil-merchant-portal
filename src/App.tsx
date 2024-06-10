import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"
import StorePage from "./pages/store/StorePage"
import { ConfigProvider } from "antd"
import "./App.scss"
import WelcomePage from "./pages/welcome/WelcomePage"
import ItemsPage from "./pages/items/ItemsPage"
import React from "react"
import CategoriesPage from "./pages/categories/CategoriesPage"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Navigate to="/welcome" replace={true} />}/>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/store" element={<StorePage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/items" element={<ItemsPage />} />
    </Route>
  )
)

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f4b205",
          fontFamily: "'Manrope', sans-serif",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}


export default App
