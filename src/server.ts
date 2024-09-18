import express, { Application } from 'express';
import bookRouter from './routes/book.routes';
import userRouter from './routes/user.routes'
import authRouter from './routes/auth.routes'
import emailRouter from './routes/email.routes'
import { log } from 'console';

const app: Application = express()
const port: number = Number(process.env.PORT) | 3030;

app.use(express.json())

app.use('/api/', authRouter)
app.use('/api/', bookRouter)
app.use('/api/', userRouter)
app.use('/api', emailRouter)

app.listen(port, () => {
  log(`Server listening in http://localhost:${port}`)
})

export default app;