const Koa = require('koa')
const route = require('koa-route')
const cors = require('koa2-cors')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const knex = require('knex')

const app = new Koa()
const mysql = knex({
  client: 'mysql', // 指明数据库类型，还可以是mysql，sqlite3等等
  connection: { // 指明连接参数
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hyoka'
  },
  debug: true, // 指明是否开启debug模式，默认为true表示开启
  pool: { // 指明数据库连接池的大小，默认为{min: 2, max: 10}
    min: 0,
    max: 7
  },
  acquireConnectionTimeout: 10000, // 指明连接计时器大小，默认为60000ms
  migrations: {
    tableName: 'migrations' // 数据库迁移，可选
  }
})

const hasTable = tableName => mysql.schema.hasTable(tableName)

const getCodeById = async (id) => {
  let has = await hasTable('test')
  if (has) {
    return mysql.select().table('test').where('id', id)
  }
}

const test = async (ctx, next) => {
  let id = ctx.query.id
  let res = {}
  try {
    if (id) {
      let ret = await getCodeById(id)
      if (ret.length) {
        res.data = ret
        res.status = 1
        res.msg = 'SUCCESS'
      } else {
        res.data = ret
        res.status = 0
        res.msg = 'FAIL: NO DATA'
      }
    } else {
      res.data = []
      res.status = 0
      res.msg = 'FAIL: NO ID'
    }
  } catch (error) {
    console.log('error: ', error)
    res.data = []
    res.status = 0
    res.msg = 'FAIL: unknown error'
  }
  ctx.response.body = res
}

const main = ctx => {
  ctx.set('Cache-Control', 'no-cache, must-revalidate')
  let cb = ctx.query['callback']
  let o = {
    res: 'hello'
  }
  let res = JSON.stringify(o)
  ctx.body = cb ? cb + '(' + res + ')' : res
}

app.use(cors())
app.use(logger())
app.use(koaBody())

app.use(route.post('/', main))
app.use(route.get('/test', test))

app.listen(3000, () => console.log('listen on 3000'))
