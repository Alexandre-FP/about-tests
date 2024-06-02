import request from 'supertest'
import { app } from '../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {})

  afterAll(async () => {})

  it('should be able to authenticate', async () => {
    await request(app).post('/api/created').send({
      email: 'xand@xand.com',
      password_hash: '250320',
    })

    const response = await request(app).post('/api/session').send({
      email: 'xand@xand.com',
      password_hash: '250320',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
