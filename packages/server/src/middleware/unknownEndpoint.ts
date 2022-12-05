import { Handler } from 'express'

export const unknownEndpoint: Handler = (_req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}
