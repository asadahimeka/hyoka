import { graphql } from 'graphql'
import { toGlobalId } from 'graphql-relay'
import { schema } from '../../schema'
import { setupTest, getContext } from '../../../test/helper'

import User from '../model/User'
import Remarks from '../model/Remarks'

beforeEach(async () => await setupTest())

it('should not allow anonymous user', async () => {
  // TODO: specify fields to create a new Remarks
  const remarks = new Remarks({
    cno: 'Example value',
    sno: 'Example value',
    evas: 'Example value',
    remark: 'Example value',
    comment: 'Example value'
  })

  await remarks.save()

  const remarksId = toGlobalId('Remarks', remarks._id)

  const query = `
    mutation M {
      RemarksEdit(input: {
        id: "${remarksId}"
        example: "Example Field to Update"
      }) {
        remarks {
          cno
          sno
          evas
          remark
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

  // TODO: specify fields to create a new Remarks
  const remarks = new Remarks({
    cno: 'Example value',
    sno: 'Example value',
    evas: 'Example value',
    remark: 'Example value',
    comment: 'Example value'
  })

  await remarks.save()

  const remarksId = toGlobalId('Remarks', remarks._id)

  const query = `
    mutation M {
      RemarksEdit(input: {
        id: "${remarksId}"
        example: "Example Field to Update"
      }) {
        remarks {
          cno
          sno
          evas
          remark
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
