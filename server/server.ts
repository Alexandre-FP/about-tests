import { app } from './app'
import { env } from './env'

app.listen(env.PORT_DEV, () => {
  console.log(`Server running on port ${env.PORT_DEV}`)
})
