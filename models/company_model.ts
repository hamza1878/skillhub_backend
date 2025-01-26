import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";

import {
  text,
  relationship,
  timestamp,
  integer,
  select,
  image,
  password,
} from "@keystone-6/core/fields";

export const Company = list({
  access: allowAll,

  fields: {
    user: relationship({ ref: "User", many: false }),
    name: text({ validation: { isRequired: false } }),
    logo: image({ storage: "files_storage" }),
    IndustryType: text({ validation: { isRequired: false } }),
    type: select({ options: ["EURL", "SARL", "SAS", "SASU"], type: "enum" }),
    jobDomain: text({ validation: { isRequired: false } }),
    registrationNumber: text({ validation: { isRequired: false } }),
    foundingDate: timestamp({
      validation: { isRequired: false },
    }),
    headquarters: text({ validation: { isRequired: false } }),
    legalStatus: text({ validation: { isRequired: false } }),
    capital: integer({ validation: { isRequired: false } }),
    revenue: integer({ validation: { isRequired: false } }),
    industry: text({ validation: { isRequired: false }, label: "Industry" }),
    businessModel: text({
      validation: { isRequired: false },
      label: "Business Model",
    }),
    mission: text({ validation: { isRequired: false }, label: "Mission" }),
    vision: text({ validation: { isRequired: false }, label: "Vision" }),

    phone: text({ validation: { isRequired: false } }),
    linkdein: text({ validation: { isRequired: false } }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
    updatedAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});
