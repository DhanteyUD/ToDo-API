import { HttpError } from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import logger from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

import indexRouter from './routes/todo.router'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', indexRouter)

// catch 404 and forward to error handler
// app.use(function (_req, _res, next) {
//   next(createError(404))
// })

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
