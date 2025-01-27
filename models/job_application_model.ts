import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";

import {
  text,
  timestamp,
  integer,
  select,
  image,
  relationship,
  file,
} from "@keystone-6/core/fields";
import { Company } from "./company_model";
import { graphql } from "@keystone-6/core";

import { S3StorageAdapter } from "keystone-storage-adapter-s3";


export const JobApplication = list({
  access: allowAll,
  fields: {
    email: text({
      validation: { isRequired: true },
    }),
    
    resume: file({ storage: 'files_storage' }),
    firstName: text({ validation: { isRequired: true }, label: "Applicant Name" }),
    lastName: text({ validation: { isRequired: true }, label: "Applicant lastName" }),
    phoneNumber: text({ validation: { isRequired: true }, label: "Applicant phoneNumber" }),
    description: text({ validation: { isRequired: true }, label: "Applicant description" }),
    linkedin: text({ validation: { isRequired: true }, label: "Applicant linkedin" }),
    github: text({ validation: { isRequired: true }, label: "Applicant linkedin" }),
    jobPosting: relationship({
      ref: "JobPosting",
      many: false,
     
      label: "Applied Job",
    }),
    applicationDate: timestamp({
      defaultValue: { kind: "now" },
      label: "Application Date",
    }),
    status: select({
      options: [
        { label: "Pending", value: "pending" },
        { label: "Accepted", value: "accepted" },
        { label: "Rejected", value: "rejected" },
      ],
      defaultValue: "pending",
      validation: { isRequired: true },
      label: "Application Status",
    }),
  },
  hooks: {
    afterOperation: async ({ operation, item }) => {
      if (operation === "create") {
        console.log(`New application submitted by ${item.applicantName}`);
      }
    },
  },
});

export const extendGraphQLSchema = graphql.extend(base => ({
  mutation: {
    applyForJob: graphql.field({
      type: graphql.Boolean,
      args: {
        firstName: graphql.arg({ type: graphql.String }),
        lastName: graphql.arg({ type: graphql.String }),
        phoneNumber:graphql.arg({ type: graphql.String }),
        description:graphql.arg({ type: graphql.String }),
        linkedin:graphql.arg({ type: graphql.String }),
        github:graphql.arg({ type: graphql.String }),
        applicantName: graphql.arg({ type: graphql.String }),
        email: graphql.arg({ type: graphql.String }),
        resume: graphql.arg({ type: graphql.Upload }),  
        jobPostingId: graphql.arg({ type: graphql.ID }),
      },
      resolve: async (root, { firstName,lastName,phoneNumber, linkedin,email,github, resume, jobPostingId }, context) => {
        if (!firstName || !email || !resume || !jobPostingId) {
          throw new Error("All fields are required!");
        }

        const existingApplication = await context.db.JobApplication.findOne({
          where: { email, jobPosting: { id: jobPostingId } },
        });

        if (existingApplication) {
          throw new Error("You have already applied for this job.");
        }
        const fileData = resume ? await (await resume).createReadStream() : null;

        await context.db.JobApplication.createOne({
          data: {
            firstName,
            lastName,
            phoneNumber,
            email,
            fileData,
            linkedin,
            github, 
            jobPosting: { connect: { id: jobPostingId } },
            applicationDate: new Date(),
            status: "pending",
          },
        });

        return true;
      },
    }),
  },
}));
