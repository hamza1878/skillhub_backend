import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, timestamp, relationship ,json} from "@keystone-6/core/fields";

export const Resume = list({
  access: allowAll,
  fields: {
    user: relationship({ ref: "User", many: true }),
    firstName: text({ validation: { isRequired: false } }),
    lastName: text({ validation: { isRequired: false } }),
    email: text({ validation: { isRequired: false } }),
    phone: text({ validation: { isRequired: false } }),
    profilePicture: text({ validation: { isRequired: false } }),
    linkedin: text({ validation: { isRequired: false } }),
    github: text({ validation: { isRequired: false } }),
    professionalSummary:text({ validation: { isRequired: false } }),

    education: json({ }),
    experiences:  json({ }),
   projects:   json({ }),
      certifications:   json({ }),
    skills: json({ }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
    updatedAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});