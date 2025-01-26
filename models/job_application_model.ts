import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";

import {
  text,
  timestamp,
  integer,
  select,
  image,
  relationship,
} from "@keystone-6/core/fields";
import { Company } from "./company_model";

export const JobApplication = list({
  access: allowAll,

  fields: {
    user: relationship({ ref: "User", many: true }),
    resume: relationship({ ref: "Resume", many: true }),
    Company: relationship({ ref: "Company", many: true }),
    Nom: text({ validation: { isRequired: false } }),

    Poste: text({ validation: { isRequired: false } }),
    Date: timestamp({
      defaultValue: { kind: "now" },
    }),

    Statut: text({ validation: { isRequired: false } }),

    Download: text({ validation: { isRequired: false } }),

    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
    updatedAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});
