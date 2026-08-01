require('dotenv').config()

const { DataSource } = require('typeorm')
const Class = require('../entities/class')
const Subject = require('../entities/subject')
const Student = require('../entities/student')
const Grade = require('../entities/grade')

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5433),
  username: process.env.DB_USERNAME || 'student',
  password: process.env.DB_PASSWORD || 'student666',
  database: process.env.DB_DATABASE || 'school',
  synchronize: false,
  entities: [Class, Subject, Student, Grade],
  migrations: ['db/migrations/*.js'],
})

module.exports = { dataSource }
