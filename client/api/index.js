const post = (data = {}) => {
  wx.showLoading()
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://localhost:5000/graphql',
      method: 'POST',
      data,
      header: {
        'Content-Type': 'application/json',
        'Authorization': wx.getStorageSync('jt') || ''
      },
      success: (res) => {
        console.log('res: ', res.data)
        resolve(res.data)
        wx.hideLoading()
      },
      fail: (res) => {
        reject(res.data)
        wx.hideLoading()
      },
      complete: (res) => {
        reject(res.data)
        wx.hideLoading()
      }
    })
  })
}

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
  stuNo(no) {
    return post({
      query: `
        {
          studentno(no: "${no}"){
            id,
            name,
            sno,
            kurasu,
            hadEva
          }
        }`
    })
  },
  kuso(kno) {
    return post({
      query: `
      {
        kuso(kno: "${kno}") {
          id
          cno
          name
          teacher,
          teacherno,
          teacherdprt
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
  teacNo(no) {
    return post({
      query: `
        {
          teacherno(no: "${no}"){
            id,
            name,
            tno,
            department
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
          error,
          role
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
  addRemark(r) {
    return post({
      query: `
      mutation {
        RemarksAdd(input: {
          cno: "${r.cno}",
          sno: "${r.sno}",
          remark: ${r.remark},
          evas: "${r.evas}",
          comment: "${r.commment}"
        }) {
          error,
          remarksEdge {
            node {
              id
            }
          }
        }
      }`
    })
  },
  getRemarks(tname) {
    return post({
      query: `
      {
        viewremark(teacher: "${tname}") {
          id,
          cno,
          sname,
          cname,
          evas,
          remark,
          sno
        }
      }`
    })
  }
}

export default api
