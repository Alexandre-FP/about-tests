import request from 'supertest'
import { app } from '../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    // await app()
  })

  afterAll(async () => {
    // await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app).post('/api/created').send({
      email: 'xand@ale.com',
      password_hash: '250320',
    })

    expect(response.statusCode).toEqual(201)
  })
})
