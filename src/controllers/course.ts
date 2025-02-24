import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";


const prisma = new PrismaClient()

async function createCourse(req:Request,res:Response):Promise<any> {
    const { courseName, courseDescription } = req.body;

    if (!courseName || !courseDescription) {
      return res.status(400).send({ message: "Course name and description are required." });
    }

    try {
        const course = await prisma.course.create({
            data: {
              courseName,
              courseDescription,
            },
          });
        return res.status(201).send(course);
      } catch (error:any) {
        return res.status(500).send({ message: error.message });
      }
}

async function fetchAllCourses(req:Request,res:Response):Promise<any> {
    try {
        const courses = await prisma.course.findMany()
        return res.status(201).send(courses);
      } catch (error:any) {
        return res.status(500).send({ message: error.message });
      }
}


export default {createCourse, fetchAllCourses}