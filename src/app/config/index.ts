import * as dotenv from "dotenv"

if (!process.env.NODE_ENV) {
  dotenv.config()
}

const dev = "development"

export default {
  Environment: process.env.NODE_ENV || dev,
  server: {
    Root: process.env.SERVER_ROOT || "",
    Host: process.env.SERVER_HOST || "localhost",
    Port: process.env.PORT || 8081,
    Origins:
      process.env.ORIGINS || "http://localhost:3000,http://localhost:3001,http://localhost:3002",
  },
  projectId: process.env.PROJECT_ID,
  serviceName: process.env.K_SERVICE,
  params: {
    envs: {
      Dev: dev,
      Test: "testing",
      Release: "release",
      Production: "production",
    },
    defaultApplicationError: {
      Code: "500",
      Message: "SOMETHING_WENT_WRONG",
    },
    DefaultLang: "en",
  },
}
