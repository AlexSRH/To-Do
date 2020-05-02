const db = require('../../src/database')

module.exports = () => {
  return Promise.all(Object.keys(db.models).map(key => {
    return db.models[key].destroy({ truncate: { cascade: true }, force: true })
  }))
}
