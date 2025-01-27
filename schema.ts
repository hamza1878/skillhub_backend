import { Company } from "./models/company_model";
import { JobApplication } from "./models/job_application_model";
import { JobPosting } from "./models/JobPosting";
import {  Resume } from "./models/resume_model";
import { User } from "./models/user_model";
import { ListConfig } from "@keystone-6/core";


export const lists = {
  User: User,
  Company: Company,
  JobPosting: JobPosting,

  JobApplication: JobApplication,
  Resume: Resume,
 
} satisfies Record<string, ListConfig<any>>;
