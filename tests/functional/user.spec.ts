import Database from '@ioc:Adonis/Lucid/Database'
import { assert } from '@japa/preset-adonis'
import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'

test.group('user', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('it should create a user', async ({ client }) => {
    const user = await UserFactory.make()
    const response = await client.post('/user').json(user)
    response.assertStatus(201)
  })

  test('it should failed to create user', async ({ client, assert }) => {
    const users = await UserFactory.create()
    const response = await client.post('/user').json(users)

    // console.log(body)
    // response.assertBodyContains('email')
    // response.assertTextIncludes('BAD_REQUEST')
    response.assertStatus(409)
  })
})
