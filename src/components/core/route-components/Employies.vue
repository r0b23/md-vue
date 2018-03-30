<template>
  <div class="content-wrapper row">
    <!-- <h1>Employee route</h1>
    <ul>
      <li><h2>Átgondolni, hogy hol kellene tárolni a sort és filter változókat</h2></li>
      <li>Munkavállalók megjelenítése táblában</li>
      <li>Kijavítani gomb ugrálását navigációnál</li>
      <li>
        Rendezés befejezése <br>
        Eredeti sorrend megtartása, Csak egy oszlop rendezése
      </li>
      <li>User hozzáadása modalban</li>
      <li>Lapozás Tesztelése.</li>
    </ul> -->
    <div class="row" v-if="false">
      <mat-input
        v-model="amount"
        :inputWrapper="{s12: true}"
        :type="'number'"
        :label="'Új diákok száma:'"
        :name="'amount'"
        :hasError="errors.has('email')"/>
      <p class="center-align">
        <a class="waves-effect waves-light btn" @click="addFiftyUser">{{ amount }} diák hozzáadása</a>
        <a class="waves-effect waves-light btn" @click="addFiftyUser($event, false)">{{ amount }} Efo hozzáadása</a>
      </p>
    </div>
    <div class="row card-panel padding-0  relative-row">
      <nav class="nav-extended  blue lighten-1 ">
        <!-- Resetelni kellene a filtert és a rendezést, de az a táblán belül van tárolva.
        Talán feljebb kellene mozgatni a változókat, hogy elérjük. Vagy egy eventet emitelni, amire figyelünk
        a componensekben. Rendezés és szűrésre máshol nem lesz szükség(most úgy tűnik) az alkalmazásban
        Event busnak utána nézni, vagy a szűrőket, rendezőket áthelyezni store-ba és onnan lekérni azokat -->
        <material-tabs :tabs="tabs"/>
      </nav>
      <data-table/>
      <small-loader v-if="loading"/>
    </div>
    <fixed-action-button
      :icon="'add'"
      :title="'Új diák hozzáadása'"
      :action="openModal"/>
  </div>
</template>
<script>
import DataTable from '../../shared/tables/UserTable'
import FixedActionButton from '../../shared/buttons/FixedActionButton'
import MaterialTabs from '../../shared/MaterialTabs/MaterialTabs'
import SmallLoader from '../../shared/SmallLoader'
import MatInput from '../../shared/forms/MatInput'

export default {
  data () {
    const loadUsers = this.loadUsers
    const self = this
    return {
      amount: 10,
      tabs: [
        {
          title: 'Minden munkavállaló',
          target: '#all',
          disabled: false,
          ref: 'all',
          active: true,
          action (event) {
            if (!this.active && !self.loading) {
              loadUsers(event, '')
              return true
            }
            return false
          }
        },
        {
          title: 'Diák',
          target: '#diakok',
          disabled: false,
          ref: 'diakok',
          active: false,
          action (event) {
            if (!this.active && !self.loading) {
              loadUsers(event, 'students')
              return true
            }
            return false
          }
        },
        {
          title: 'Egyszerűsített Foglalkoztatott',
          target: '#efo',
          disabled: false,
          ref: 'efo',
          active: false,
          action (event) {
            if (!this.active && !self.loading) {
              loadUsers(event, 'efos')
              return true
            }
            return false
          }
        }
      ]
    }
  },
  computed: {
    users () {
      return this.$store.getters.users
    },
    loading () {
      return this.$store.getters.loading('userLoading')
    }
  },
  methods: {
    openModal () {
      const payload = {
        component: 'employeeInfoForm',
        header: 'Új munkavállaló mentése'
      }
      this.$store.commit('openModal', payload)
    },
    loadUsers (event, type) {
      const target = event.target
      // document.querySelectorAll('.tabs .tab a.active')[0].classList.remove('active')
      target.classList.add('active')
      this.$store.dispatch('fetchUsers', type)
    },
    addFiftyUser (event, student = true) {
      const user = {
        password: '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC',
        firstname: 'Károly',
        lastname: 'Toth',
        email: 'karesz@karesz.hu',
        phonenumber: '06304564567',
        birthdate: '1988-03-02',
        authority: 2,
        student
      }
      for (let i = 0; i < this.amount; i++) {
        this.$http.post('user/insert', user).then(response => response.json())
          .then(data => {
            console.log(data)
          })
      }
    }
  },
  created () {
    this.$store.dispatch('fetchUsers', '')
  },
  components: {
    dataTable: DataTable,
    fixedActionButton: FixedActionButton,
    materialTabs: MaterialTabs,
    smallLoader: SmallLoader,
    matInput: MatInput
  }
}
</script>
