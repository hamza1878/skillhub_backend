import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";

import {
  text,
  relationship,
  password,
  timestamp,
  select,
  image
} from "@keystone-6/core/fields";

export const User = list({
  access: allowAll,

  fields: {
    firstName: text({ validation: { isRequired: false } }),
    lastName: text({ validation: { isRequired: false } }),
    role: select({ options: ["USER", "COMPANY"], type: "enum" }),
    picture:  image({ storage: "files_storage" }),
    phone: text({ validation: { isRequired: false } }),
    linkedin: text({ validation: { isRequired: false } }),
    github: text({ validation: { isRequired: false } }),
    technologies: text({ validation: { isRequired: false } }), 
    jobTitle: text({ validation: { isRequired: false } }),
    description: text({ validation: { isRequired: false } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    password: password({ validation: { isRequired: false } }),
    status: select({
      options: [
       "active", "inactive"], type: "enum"
      
     
    }),


    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
    updatedAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});
