<template>
  <tr>
    <td>
      <span class="user-type">{{ user.student ? 'd' : 'e'}}</span>
    </td>
    <td class="sorting">
      <router-link :to="userLink(user.id)">{{ user.name }}</router-link>
    </td>
    <td>{{ userBirthdate }}</td>
    <td>
      <span class="user-contact"><b>Email: </b>{{ user.email }}<br></span>
      <span class="user-contact"><b>Telefonszám: </b>{{ user.phoneNumber }}</span>
    </td>
    <td style="position:relative;">
      <page-context-menu
        :title="`${user.lastname} ${user.firstname}`">
        <span class="card-title" slot="title">{{ user.name }}</span>
        <div class="collection pgm-list" slot="content">
          <h5 class="pgm-list-header">Munkahely hozzáadása</h5>
          <a
            class="collection-item pgm-list-item"
            v-for="project in projects"
            :key="project.id"
            @click.prevent="addUserToProject(project.id, user.id)">
            {{ project.name }}
          </a>
        </div>
      </page-context-menu>
      <span v-if="user.projects.length === 0">Nincs munkahelye</span>
      <span v-for="project in user.projects" :key="project.id">
        {{ project.name }}<br>
      </span>
    </td>
    <td>2017-11-05</td>
    <td>
      <i
        @click="editUser(user)"
        class="material-icons green-text edit-user-icon">
        edit
      </i>
      <i
        @click="removeUser(user.id)"
        class="material-icons red-text remove-user-icon"
        title="Munkavallaló törlése">
        remove_circle_outline
      </i>
    </td>
  </tr>
</template>
<script>
import moment from 'moment'
import PageContextMenu from './PageContextMenu'

export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    projects: {
      type: Array,
      required: true
    }
  },
  computed: {
    userBirthdate () {
      return moment(this.user.birthdate).format('LL')
    }
  },
  methods: {
    addUserToProject (projectId, userId) {
      const payload = {
        userId,
        projectId
      }
      this.$store.dispatch('addUserToProject', payload)
    },
    userLink (id) {
      return `munkavallalok/${id}`
    },
    editUser (user) {
      const payload = {
        component: 'employeeInfoForm',
        header: `${user.lastname} ${user.firstname} szerkesztése`,
        model: user,
        editing: true
      }
      this.$store.commit('openModal', payload)
    },
    removeUser (userId) {
      const payload = {
        component: 'confirmMessage',
        showFooter: true,
        size: 'small',
        action () {
          this.$store.dispatch('removeUser', userId)
        }
      }
      this.$store.commit('openModal', payload)
    }
  },
  components: {
    pageContextMenu: PageContextMenu
  }
}
</script>
<style>
  .user-contact {
    line-height: 1.8em;
  }
  span.user-type {
    color: white;
    background-color: #0098a6;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  tr.even.sorting {
    _background-color: #f9f9f9;
  }
  tr.odd.sorting {
    _background-color: #f1f1f1;
  }
  .remove-user-icon, .edit-user-icon {
    cursor: pointer;
  }
</style>
