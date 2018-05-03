import http from './http'

const post = data => http.post('http://localhost:5000/graphql', data)

const api = {
  isLogin() {
    return post({
      query: `
        {
          me{
            role
          }
        }`
    })
  },
  me() {
    return post({
      query: `
        {
          me{
            id,
            name,
            email,
            role,
            nickname
          }
        }`
    })
  },
  login(name, pwd, role) {
    return post({
      query: `
      mutation {
        Login(input: {name: "${name}", password: "${pwd}"}) {
          token,
          error
        }
      }`
    })
  },
  editUser(user) {
    return post({
      query: `
      mutation {
        UserEdit(input: {id: "${user.id}", nickname: "${user.nickname}", email: "${user.email}"}) {
          user {
            id,
            nickname,
            email
          }
          error
        }
      }`
    })
  },
  chgPwd(opw, pw) {
    return post({
      query: `
      mutation {
        ChangePassword(input: {oldPassword: "${opw}", password: "${pw}"}) {
          me {
            id
          }
          error
        }
      }`
    })
  },
  getEvaIndex() {
    return post({
      query: `
      {
        evas {
          edges {
            node {
              id,
              evno,
              name
            }
          }
          count
        }
      }`
    })
  },
  addEvaIndex(evno, name) {
    return post({
      query: `
      mutation {
        EvaAdd(input: {evno: "${evno}", name: "${name}"}) {
          error,
          evaEdge {
            node {
              id,
              name,
              evno
            }
          }
        }
      }`
    })
  },
  editEvaIndex(id, no, name) {
    return post({
      query: `
      mutation {
        EvaEdit(input: {id: "${id}", evno: "${no}", name: "${name}"}) {
          error,
          eva {
            id,
            evno,
            name
          }
        }
      }`
    })
  },
  del(id, who) {
    return post({
      query: `
      mutation {
        deleteMutation(input: {id: "${id}", who: "${who}"}) {
          error
        }
      }`
    })
  },
  getRemarks() {
    return post({
      query: `
      {
        remarkss {
          edges {
            node {
              id,
              cno,
              sno,
              cname,
              sname,
              evas,
              remark
            }
          }
        }
      }`
    })
  },
  getClassinfo() {
    return post({
      query: `
      {
        kurasus {
          edges {
            node {
              id,
              kno,
              name,
              courses
            }
          }
          count
        }
      }`
    })
  },
  getCourses() {
    return post({
      query: `
      {
        courses {
          edges {
            node {
              id,
              cno,
              name,
              teacher
            }
          }
          count
        }
      }`
    })
  },
  getStudents() {
    return post({
      query: `
      {
        students {
          edges {
            node {
              id,
              sno,
              name,
              sex,
              birthday,
              kurasu,
              department,
              major,
              hadEva
            }
          }
          count
        }
      }`
    })
  },
  getTeachers() {
    return post({
      query: `
      {
        teachers {
          edges {
            node {
              id,
              tno,
              name,
              sex,
              birthday,
              department
            }
          }
          count
        }
      }`
    })
  },
  addClassinfo(no, name, courses) {
    return post({
      query: `
      mutation {
        KurasuAdd(input: {kno: "${no}", name: "${name}",courses: "${courses}"}) {
          error,
          kurasuEdge {
            node {
              id,
              kno,
              name,
              courses
            }
          }
        }
      }`
    })
  },
  addCourse(no, name, teacher) {
    return post({
      query: `
      mutation {
        CourseAdd(input: {cno: "${no}", name: "${name}",teacher: "${teacher}", isEva:false}) {
          error,
          courseEdge {
            node {
              id,
              cno,
              name,
              teacher
            }
          }
        }
      }`
    })
  },
  addStudent(s) {
    return post({
      query: `
      mutation {
        StudentAdd(input: {
          sno: "${s.sno}", 
          name: "${s.name}",
          sex: "${s.sex}",
          kurasu: "${s.kurasu}",
          department: "${s.department}",
          major: "${s.major}"
        }) {
          error,
          studentEdge {
            node {
              id,
              sno,
              name,
              sex,
              birthday,
              kurasu,
              department,
              major,
              hadEva
            }
          }
        }
      }`
    })
  },
  addTeacher(t) {
    return post({
      query: `
      mutation {
        TeacherAdd(input: {
          tno: "${t.tno}",
          name: "${t.name}",
          sex: "${t.sex}",
          department: "${t.department}"
        }) {
          error,
          teacherEdge {
            node {
              id,
              tno,
              name,
              sex,
              department
            }
          }
        }
      }`
    })
  },
  editClassinfo(id, c) {
    return post({
      query: `
      mutation {
        KurasuEdit(input: {id: "${id}",kno: "${c.kno}", name: "${c.name}",courses: "${c.courses}"}) {
          error,
          kurasu {
            id,
            kno,
            name,
            courses
          }
        }
      }`
    })
  },
  editCourse(id, c) {
    return post({
      query: `
      mutation {
        CourseEdit(input: {
          id: "${id}",
          cno: "${c.cno}", 
          name: "${c.name}",
          teacher: "${c.teacher}"
        }) {
          error,
          course {
            id,
            cno,
            name,
            teacher
          }
        }
      }`
    })
  },
  editStudent(id, s) {
    return post({
      query: `
      mutation {
        StudentEdit(input: {
          id: "${id}",
          sno: "${s.sno}", 
          name: "${s.name}",
          sex: "${s.sex}",
          kurasu: "${s.kurasu}",
          department: "${s.department}",
          major: "${s.major}"
        }) {
          error,
          student {
            id,
            sno,
            name,
            sex,
            kurasu,
            department,
            major
          }
        }
      }`
    })
  },
  editTeacher(id, c) {
    return post({
      query: `
      mutation {
        TeacherEdit(input: {
          id: "${id}",
          tno: "${c.tno}", 
          name: "${c.name}",
          department: "${c.department}",
          sex: "${c.sex}"
        }) {
          error,
          teacher {
            id,
            tno,
            name,
            sex,
            department
          }
        }
      }`
    })
  }
}

export default api
