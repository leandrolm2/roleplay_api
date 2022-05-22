import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'

test('display welcome page', async ({ client }) => {
  const user = await UserFactory.make()
  const response = await client.post('/user').json(user)
  console.log(response)
  response.assertStatus(201)
  response.assertBodyContains({ hello: 'world' })
})
