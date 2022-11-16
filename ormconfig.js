module.exports = [
  {
    "name": "mongo_prod",
    "type": "mongodb",
    "url": process.env.CONFIG_MONGO_REMOTE_HOST,
    "ssl": true,
    "useUnifiedTopology": true,
    "authSource": "admin",
    "entities": [
      // "./src/modules/**/infra/typeorm/schemas/*{.ts,.js}",
      "./dist/modules/**/infra/typeorm/schemas/*{.ts,.js}"
    ]
  }
]