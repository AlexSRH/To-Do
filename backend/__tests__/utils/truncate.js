const sequelize = require('../../src/database')

const models = Object.values(sequelize.models)

const truncate = async model => {
  await model.destroy({ truncate: true, force: true })
}

module.exports = async () => {
  await models.map(model => { truncate(model) })
}
