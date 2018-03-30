import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource)
export default function () {
  const userActions = {
    getUsers: { method: 'GET', url: 'user/all/{/userType}' },
    getUser: { method: 'GET', url: 'user/id/{/userId}' },
    getUserProjects: { method: 'GET', url: 'user/getprojects/{/userId}' },
    getUserSchedule: { method: 'GET', url: 'user/getusersnextweekschedule{/userId}' },
    saveUser: { method: 'POST', url: 'user/insert' },
    deleteUser: { method: 'DELETE', url: 'user/remove/{/userId}' },
    updateUser: { method: 'POST', url: 'user/update' },
    addUserToProject: { method: 'POST', url: 'user/addtoprojectasworker/{/userId}{/projectId}' }
  }

  const resource = Vue.resource('', {}, userActions)

  function userView (user) {
    return Object.assign({}, user, {
      name: `${user.lastname} ${user.firstname}`
    })
  }

  async function populateUser (userId) {
    // Találj valami fix megoldást ehhez, valószínű több helyen is kell majd ezt használni
    const user = await resource.getUser({ userId }).then(response => response.json())
    const projects = await resource.getUserProjects({ userId }).then(response => response.json())
    // const schedule = await resource.getUserSchedule({ userId }).then(response => response.json())

    return { ...userView(user), projects }
  }
  async function populateUsers (users) {
    return Promise.all(
      users.map(async user => {
        const userId = user.id
        const projects = await resource.getUserProjects({ userId }).then(response => response.json())
        // const schedule = await resource.getUserSchedule({ userId }).then(response => response.json())
        return { ...userView(user), projects }
      })
    )
  }
  return Object.freeze(Object.create({
    ...resource,
    populateUser,
    populateUsers,
    userView
  }))
}
