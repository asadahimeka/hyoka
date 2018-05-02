import { graphql } from 'graphql'
import { schema } from '../../schema'
import { setupTest, getContext } from '../../../test/helper'

import User from '../model/User'
import Eva from '../model/Eva'

beforeEach(async () => await setupTest())

it('should not allow anonymous user', async () => {
  const query = `
    mutation M {
      EvaAdd(input: {
        name: "Example value"
        evno: "Example value"
        comment: "Example value"
      }) {
        evaEdge {
          node {
            name
            evno
            comment
          }
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

it('should create a record on database', async () => {
  const user = new User({
    name: 'user',
    email: 'user@example.com'
  })

  await user.save()

  const query = `
    mutation M {
      EvaAdd(input: {
        name: "Example value"
        evno: "Example value"
        comment: "Example value"
      }) {
        evaEdge {
          node {
            name
            evno
            comment
          }
        }
      }
    }
  `

  const rootValue = {}
  const context = getContext({ user })

  const result = await graphql(schema, query, rootValue, context)

  expect(result).toMatchSnapshot()
})
