import { config } from "@keystone-6/core";

import { lists } from "./schema";

import { withAuth, session } from "./auth";

export default withAuth(
  config({
    graphql: {
      cors: { origin: ["*", "http://localhost:4200", "localhost"] },
      apolloConfig: {
        introspection: true,

      },
      
    },
    server: {
      cors: { origin: ["*", "http://localhost:4200", "localhost"] },
    },
    storage: {
      files_storage: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `http://localhost:3000/images${path}`,
        serverRoute: {
          path: "/images",
        },

        storagePath: "public/images",
      },
    },
    db: {
      provider: "sqlite",
      url: "file:./keystone.db",
    },
    lists,


    session,
  })
);
