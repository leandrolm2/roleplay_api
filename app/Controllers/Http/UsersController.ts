import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const userPayload = request.only(['email', 'username', 'password', 'avatar'])
    const isEmail = await User.findBy('email', userPayload.email)
    if (isEmail) return response.status(409).send('email already been used')
    const user = await User.create(userPayload)
    return response.created({ user })
  }
}
