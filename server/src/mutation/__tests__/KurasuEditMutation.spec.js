import { graphql } from 'graphql'
import { toGlobalId } from 'graphql-relay'
import { schema } from '../../schema'
import { setupTest, getContext } from '../../../test/helper'

import User from '../model/User'
import Kurasu from '../model/Kurasu'

beforeEach(async () => await setupTest())

it('should not allow anonymous user', async () => {
  // TODO: specify fields to create a new Kurasu
  const kurasu = new Kurasu({
    name: 'Example value',
    kno: 'Example value',
    courses: 'Example value',
    comment: 'Example value'
  })

  await kurasu.save()

  const kurasuId = toGlobalId('Kurasu', kurasu._id)

  const query = `
    mutation M {
      KurasuEdit(input: {
        id: "${kurasuId}"
        example: "Example Field to Update"
      }) {
        kurasu {
          name
          kno
          courses
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

  // TODO: specify fields to create a new Kurasu
  const kurasu = new Kurasu({
    name: 'Example value',
    kno: 'Example value',
    courses: 'Example value',
    comment: 'Example value'
  })

  await kurasu.save()

  const kurasuId = toGlobalId('Kurasu', kurasu._id)

  const query = `
    mutation M {
      KurasuEdit(input: {
        id: "${kurasuId}"
        example: "Example Field to Update"
      }) {
        kurasu {
          name
          kno
          courses
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
