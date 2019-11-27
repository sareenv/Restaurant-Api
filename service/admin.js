'use strict'

const Koa = require('koa')

const menuRoutes = require('../routes/menu')
const adminLoginRoutes = require('../routes/adminLogin')
const staffWorkHistoryRoutes = require('../routes/loginHistory')
const app = new Koa()

const defaultPort = 9090
const port = process.env.PORT || defaultPort

app.use(menuRoutes.routes())
app.use(adminLoginRoutes.routes())
app.use(staffWorkHistoryRoutes.routes())

app.listen(port)
