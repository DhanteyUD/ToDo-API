import request from "supertest";
import app from '../src/app'
import { deleteFile } from './helper'

beforeEach(async () => {
  deleteFile()
})

// process.env.NODE_ENV = 'test'


describe('GET API TESTS', () => {
  test('gets no todo if database.json file does not exist', async () => {
    const res = await request(app).get('/api/todos')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([])
  })

  test('gets todos if there are todos in database.json file', async () => {
    const sampleTodo = { title: 'test', content: 'my very first todo' }

    await request(app).post('/api/todos').send(sampleTodo)
    const res = await request(app).get('/api/todos')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([sampleTodo])
  })
})

describe('POST API TESTS', () => {
  test('it creates todos', async () => {
    const sampleTodo = { title: 'test', content: 'my very first todo' }

    const res = await request(app).post('/api/todos').send(sampleTodo)
    expect(res.statusCode).toBe(201)
    expect(res.body).toEqual({ message: 'Todo Created Successfully' })
  })
})