import { graphql } from 'graphql'
import { toGlobalId } from 'graphql-relay'
import { schema } from '../../schema'
import { setupTest, getContext } from '../../../test/helper'

import User from '../model/User'
import Course from '../model/Course'

beforeEach(async () => await setupTest())

it('should not allow anonymous user', async () => {
  // TODO: specify fields to create a new Course
  const course = new Course({
    name: 'Example value',
    cno: 'Example value',
    teacher: 'Example value',
    isEva: 'Example value',
    comment: 'Example value'
  })

  await course.save()

  const courseId = toGlobalId('Course', course._id)

  const query = `
    mutation M {
      CourseEdit(input: {
        id: "${courseId}"
        example: "Example Field to Update"
      }) {
        course {
          name
          cno
          teacher
          isEva
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

  // TODO: specify fields to create a new Course
  const course = new Course({
    name: 'Example value',
    cno: 'Example value',
    teacher: 'Example value',
    isEva: 'Example value',
    comment: 'Example value'
  })

  await course.save()

  const courseId = toGlobalId('Course', course._id)

  const query = `
    mutation M {
      CourseEdit(input: {
        id: "${courseId}"
        example: "Example Field to Update"
      }) {
        course {
          name
          cno
          teacher
          isEva
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
