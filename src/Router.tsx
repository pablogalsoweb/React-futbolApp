import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Header } from "./sections/header";
import { Home } from "./pages/home/home";

import { Partido } from "./pages/partido/partido"; 
 
const rutas = createBrowserRouter([
    {
        path:"/",
        element: <Header />,
        children: [
                    {
                        path: "/",
                        element: <Home />
                    },
                    {
                        path: "/partido",
                        element: <Partido />
                    } 
                ]
    }
]);

export function RouterApp(){
    return <RouterProvider router = {rutas}></RouterProvider>
}