import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, timestamp, relationship, select, image } from "@keystone-6/core/fields";
import { Company } from "./company_model"; 

export const JobPosting = list({
  access: allowAll,
  fields: {
    logo:image({ storage: 'files_storage' }), 
    companyName: text({ validation: { isRequired: true } }),
    jobTitle: text({ validation: { isRequired: true } }),
    description: text({ validation: { isRequired: true } }), 
    location: text({ validation: { isRequired: false } }), 
    company: relationship({ ref: "Company", many: false }),
    worktime: select({
        options: ["Full_time", "Part_time", "Contract", "Freelance"], 
        type: "enum",
      validation: { isRequired: true },
    }),
    salary: text({ validation: { isRequired: false } }), 
    postedAt: timestamp({
      defaultValue: { kind: "now" },
      validation: { isRequired: true },
    }), 
    expiresAt: timestamp({
      validation: { isRequired: false },
    }), 
    status: select({
      options: ["open", "closed", "paused"], 
      type: "enum",
      validation: { isRequired: true },
    }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
    updatedAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});
