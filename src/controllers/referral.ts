import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();


import nodemailer from 'nodemailer';
import { google } from 'googleapis';

async function checkReferral(referrerEmail: string, refereeEmail: string, courseId: string) {
  try {
    const existingReferral = await prisma.referral.findFirst({
      where: {
        referrerEmail: referrerEmail,
        refereeEmail: refereeEmail,
        courseId:courseId
      },
    });
    return existingReferral;
  } catch (error) {
    console.error('Error checking referral:', error);
    throw new Error('Error checking referral');
  }
}




async function createReferral(req:Request , res:Response):Promise<any> {
    const { referrerName, referrerEmail, refereeName, refereeEmail, courseId, courseName } = req.body;
    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !courseId || !courseName) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const existingReferral = await checkReferral(referrerEmail, refereeEmail, courseId);
        if (existingReferral) {
          return res.status(400).json({})
        }
    
        const referral = await prisma.referral.create({
          data: {
            refereeName,
            refereeEmail,
            referrerName,
            referrerEmail,
            courseId
          },
        });
  
        // Send email notification
        await sendReferralEmail(process.env.COMPANY_EMAIL || "", referrerName, refereeEmail, courseName);
  
        res.status(201).json(referral);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

async function sendReferralEmail(companyEmail: string, referrerName: string, refereeEmail: string, courseName: string):Promise<any>  {
        try {
          const oAuth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.GMAIL_REDIRECT_URI
          );
          oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN});
    
          const accessToken:any = await oAuth2Client.getAccessToken();
    
          const transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
              type: 'OAuth2',
              user: companyEmail,
              accessToken: accessToken.token,
              clientId: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET,
              refreshToken: process.env.REFRESH_TOKEN,
            },
          });
    
          const mailOptions = {
            from: companyEmail,
            to: refereeEmail,
            subject: `Referral for ${courseName}`,
            text: `Hello,\n${referrerName} has referred you to the course "${courseName}". You can enroll here: [Enrollment Link]\nBest regards,\nAccredian`,
          };
    
          await transporter.sendMail(mailOptions);
        } catch (error) {
          console.error('Error sending email:', error);
        }
      };


export default {createReferral}
