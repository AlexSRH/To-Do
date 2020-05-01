require('dotenv/config')

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
