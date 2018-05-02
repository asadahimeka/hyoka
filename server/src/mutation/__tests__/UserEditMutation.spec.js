import { graphql } from 'graphql'
import { toGlobalId } from 'graphql-relay'
import { schema } from '../../schema'
import { setupTest, getContext } from '../../../test/helper'

import User from '../model/User'
import User from '../model/User'

beforeEach(async () => await setupTest())

it('should not allow anonymous user', async () => {
  // TODO: specify fields to create a new User
  const user = new User({
    name: 'Example value',
    nickname: 'Example value',
    password: 'Example value',
    email: 'Example value',
    role: 'Example value',
    active: 'Example value'
  })

  await user.save()

  const userId = toGlobalId('User', user._id)

  const query = `
    mutation M {
      UserEdit(input: {
        id: "${userId}"
        example: "Example Field to Update"
      }) {
        user {
          name
          nickname
          password
          email
          role
          active
        }
      }
    }
  `

  const rootValue = {}
  // No user should be passed to context since we are testing an anonymous session
  const context = getContext()

  const result = await graphql(schema, query, rootValue, context)

  expect(result).toMatchSnapshot()
})

it('should edit a record on database', async () => {
  const user = new User({
    name: 'user',
    email: 'user@example.com'
  })

  await user.save()

  // TODO: specify fields to create a new User
  const user = new User({
    name: 'Example value',
    nickname: 'Example value',
    password: 'Example value',
    email: 'Example value',
    role: 'Example value',
    active: 'Example value'
  })

  await user.save()

  const userId = toGlobalId('User', user._id)

  const query = `
    mutation M {
      UserEdit(input: {
        id: "${userId}"
        example: "Example Field to Update"
      }) {
        user {
          name
          nickname
          password
          email
          role
          active
        }
      }
    }
  `

  const rootValue = {}
  const context = getContext({ user })

  const result = await graphql(schema, query, rootValue, context)

  expect(result).toMatchSnapshot()
})
