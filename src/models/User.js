import Vue from 'vue'

export default function (userId) {
  const userUrl = `user/id/${userId}`
  const userProjectUrl = `user/getprojects/${userId}`
  const scheduleUrl = `user/getusersnextweekschedule/${userId}`
  function transformUser (user) {
    let userView1 = Object.assign({}, user, {
      name: `${user.lastname} ${user.firstname}`
    })
    const { firstname, lastname, ...userView } = userView1

    return userView
  }
  function getUser () {
    return Vue.http.get(userUrl).then(response => response.json())
  }
  function getUserProjects () {
    return Vue.http.get(userProjectUrl).then(response => response.json())
  }
  function getSchedule () {
    return Vue.http.get(scheduleUrl).then(response => response.json())
  }
  async function populateUser (userId) {
    const projects = await getUserProjects(userId)
    const user = await getUser(userId)
    const schedule = await getSchedule(userId)

    return { ...transformUser(user), projects, schedule }
  }
  // return Object.freeze(Object.create({ ...user }))

  return Object.freeze(Object.create({ populateUser }))
}

// const user = {
//   id: '5ab65041df9c2323349dd15c',
//   name: 'Kasza Róbert',
//   email: 'rbert.kasza@gmail.com',
//   phoneNumber: '06308121602',
//   birthdate: '1987-12-22',
//   enabled: true,
//   student: false,
//   projects: [
//     { id: '5ab64a65df9c2323349dd15a', name: 'Sulihost' }
//   ],
//   schedule: null
// }
