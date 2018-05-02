import { GraphQLObjectType } from 'graphql'

import Login from '../mutation/LoginMutation'
// import Register from '../mutation/RegisterMutation'
import ChangePassword from '../mutation/ChangePasswordMutation'
import StudentAdd from '../mutation/StudentAddMutation'
import CourseAdd from '../mutation/CourseAddMutation'
import EvaAdd from '../mutation/EvaAddMutation'
import KurasuAdd from '../mutation/KurasuAddMutation'
import TeacherAdd from '../mutation/TeacherAddMutation'
import StudentEdit from '../mutation/StudentEditMutation'
import CourseEdit from '../mutation/CourseEditMutation'
import EvaEdit from '../mutation/EvaEditMutation'
import KurasuEdit from '../mutation/KurasuEditMutation'
import TeacherEdit from '../mutation/TeacherEditMutation'
import UserEdit from '../mutation/UserEditMutation'
import RemarksAdd from '../mutation/RemarksAddMutation'
import deleteMutation from '../mutation/deleteMutation'

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    Login,
    // Register,
    ChangePassword,
    StudentAdd,
    CourseAdd,
    EvaAdd,
    KurasuAdd,
    TeacherAdd,
    StudentEdit,
    CourseEdit,
    EvaEdit,
    KurasuEdit,
    TeacherEdit,
    UserEdit,
    RemarksAdd,
    deleteMutation
  })
})
