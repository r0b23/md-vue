import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource)

const userActions = {
  getUsers: { method: 'GET', url: 'user/all/{/userType}' },
  getUser: { method: 'GET', url: 'user/id/{/userId}' },
  getUserProjects: { method: 'GET', url: 'user/getprojects/{/userId}' },
  getUserSchedule: { method: 'GET', url: 'user/getusersnextweekschedule{/userId}' },
  saveUser: { method: 'POST', url: 'user/insert' },
  deleteUser: { method: 'DELETE', url: 'user/remove/{/userId}' }
}

function userView (user) {
  let userView1 = Object.assign({}, user, {
    name: `${user.lastname} ${user.firstname}`
  })
  const { firstname, lastname, ...userView } = userView1

  return userView
}
function userRequestBody (user) {
  const userName = user.name.split(' ')
  const requestBody = Object.assign({}, user, {
    firstname: userName[0],
    lastname: userName[1]
  })
  const { name, ...reqUser } = requestBody
  return reqUser
}

async function populateUser (userId) {
  // Találj valami fix megoldást ehhez, valószínű több helyen is kell majd ezt használni
  const projects = await resource.getUserProjects({ userId }).then(response => response.json())
  const user = await resource.getUser({ userId }).then(response => response.json())
  const schedule = await resource.getUserSchedule({ userId }).then(response => response.json())

  return { ...userView(user), projects, schedule }
}

const resource = Vue.resource('', {}, userActions)

export default {
  ...resource,
  populateUser,
  userView,
  userRequestBody
}
