import { Router } from "express";
import course from "../controllers/course";




const courseRouter = Router();

courseRouter.post("/createCourse",course.createCourse);
courseRouter.get("/getAllCourses",course.fetchAllCourses)

export default courseRouter