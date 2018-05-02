import { graphql } from 'graphql'
import { toGlobalId } from 'graphql-relay'
import { schema } from '../../schema'
import { setupTest, getContext } from '../../../test/helper'

import User from '../model/User'
import Teacher from '../model/Teacher'

beforeEach(async () => await setupTest())

it('should not allow anonymous user', async () => {
  // TODO: specify fields to create a new Teacher
  const teacher = new Teacher({
    name: 'Example value',
    tno: 'Example value',
    sex: 'Example value',
    birthday: 'Example value',
    department: 'Example value',
    comment: 'Example value'
  })

  await teacher.save()

  const teacherId = toGlobalId('Teacher', teacher._id)

  const query = `
    mutation M {
      TeacherEdit(input: {
        id: "${teacherId}"
        example: "Example Field to Update"
      }) {
        teacher {
          name
          tno
          sex
          birthday
          department
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

  // TODO: specify fields to create a new Teacher
  const teacher = new Teacher({
    name: 'Example value',
    tno: 'Example value',
    sex: 'Example value',
    birthday: 'Example value',
    department: 'Example value',
    comment: 'Example value'
  })

  await teacher.save()

  const teacherId = toGlobalId('Teacher', teacher._id)

  const query = `
    mutation M {
      TeacherEdit(input: {
        id: "${teacherId}"
        example: "Example Field to Update"
      }) {
        teacher {
          name
          tno
          sex
          birthday
          department
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
