<template>
  <div class="row">
    <!-- A user infonak csinálni kellene egy componenst -->
    <card-reavel :icon="'perm_identity'" :cardClass="{s12: true}">
      <span class="circle z-depth-2 usertype" slot="usertype" v-if="user">
        {{ user.student ? 'DIÁK' : 'EFO'}}
      </span>
      <div class="row" slot="info" v-if="user">
        <div class="col s12 m3 offset-m2">
          <h4 class="card-title grey-text text-darken-4">{{ user.name}}</h4>
          <p class="medium-small grey-text">
            <template v-if="user.projects.length !== 0">
              <span v-for="project in user.projects" :key="project.id">{{ project.name }} </span>
            </template>
            <template v-else>
              <span>Nincs munkahelye.</span>
            </template>
          </p>
        </div>
        <div class="col s12 m2 center-align">
          <h4 class="card-title grey-text text-darken-4">80 óra</h4>
          <p class="medium-small grey-text">Ledolgozott Órák Száma</p>
        </div>
        <div class="col s12 m2 center-align">
          <h4 class="card-title grey-text text-darken-4">10 nap</h4>
          <p class="medium-small grey-text">Ledolgozott Napok Száma</p>
        </div>
        <div class="col s12 m2 center-align">
          <h4 class="card-title grey-text text-darken-4">1,253,000 Ft</h4>
          <p class="medium-small grey-text">Várható Fizetés</p>
        </div>
      </div>
      <div class="row" slot="reveal" v-if="user">
        <p class="card-title grey-text text-darken-4">{{ user.name}}</p>
        <p>
          <i class="material-icons cyan-text text-darken-2">perm_phone_msg</i>
          {{user.phoneNumber}}
        </p>
        <p>
          <i class="material-icons cyan-text text-darken-2">email</i>
          {{user.email}}
        </p>
        <p>
          <i class="material-icons cyan-text text-darken-2">cake</i>
          {{ userBirthdate }}
        </p>
      </div>
    </card-reavel>
    <div class="col s6">
      <calendar-view :title="'Ráérés'"/>
    </div>
    <div class="col s6">
      <pre >
        {{ user }}
      </pre>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import CardReavel from '../../shared/MaterialCardReaveal'
import UserResource from '../../../resources/UserResource'
import CalendarView from '../../shared/calendar/Calendar'

export default {
  data () {
    return {
      user: null
    }
  },
  computed: {
    userBirthdate () {
      return moment(this.user.birthdate).format('LL')
    }
  },
  created () {
    const userId = this.$route.params.id
    const userResource = UserResource()
    userResource.populateUser(userId).then(user => {
      this.user = user
    })
  },
  components: {
    cardReavel: CardReavel,
    calendarView: CalendarView
  }
}
</script>
<style>

</style>
