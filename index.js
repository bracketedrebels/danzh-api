const express = require('express')
const PORT = process.env.PORT

express()
  .get('/', (_, res) => res.status(200).send())
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
