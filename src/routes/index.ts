import express from "express";
import { userRoutes } from "./users.route";
import { authRoutes } from "./auth.route";
import { companyRoutes } from "./companies.route";
import { categoriesRoutes } from "./categories.route";


export const routes = (app: express.Express) => {
    app.use(express.json());
    app.use(authRoutes);
    app.use(userRoutes);
    app.use(companyRoutes);
    app.use(categoriesRoutes);
}