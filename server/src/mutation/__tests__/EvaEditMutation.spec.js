import { graphql } from 'graphql'
import { toGlobalId } from 'graphql-relay'
import { schema } from '../../schema'
import { setupTest, getContext } from '../../../test/helper'

import User from '../model/User'
import Eva from '../model/Eva'

beforeEach(async () => await setupTest())

it('should not allow anonymous user', async () => {
  // TODO: specify fields to create a new Eva
  const eva = new Eva({
    name: 'Example value',
    evno: 'Example value',
    comment: 'Example value'
  })

  await eva.save()

  const evaId = toGlobalId('Eva', eva._id)

  const query = `
    mutation M {
      EvaEdit(input: {
        id: "${evaId}"
        example: "Example Field to Update"
      }) {
        eva {
          name
          evno
          comment
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

  // TODO: specify fields to create a new Eva
  const eva = new Eva({
    name: 'Example value',
    evno: 'Example value',
    comment: 'Example value'
  })

  await eva.save()

  const evaId = toGlobalId('Eva', eva._id)

  const query = `
    mutation M {
      EvaEdit(input: {
        id: "${evaId}"
        example: "Example Field to Update"
      }) {
        eva {
          name
          evno
          comment
        }
      }
    }
  `

  const rootValue = {}
  const context = getContext({ user })

  const result = await graphql(schema, query, rootValue, context)

  expect(result).toMatchSnapshot()
})
