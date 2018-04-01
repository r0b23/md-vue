<template>
  <div class="data-table-wrapper">
    <div class="data-table">
      <div class="table-contoller" >
        <div class="row">
          <mat-input
            v-model="filter"
            :inputWrapper="{ s3: true }"
            :type="'text'"
            :label="'Keresés...'"
            @keydown.native="resetPagination"
            :name="'filter'"/>
          <mat-select
            v-model="pagination.itemsPerPage"
            @input="resetPagination"
            :inputWrapper="{ s3: true, right: true }"
            :defaultValue="10"
            :options="itemPerPageOptions"
            :name="'itemPerPage'"
            :label="'Show'"/>
        </div>
        <h2 v-if="noEntries && !loading">Not found.</h2>
      </div>
      <table class="striped bordered highlight responsive-table" v-if="!noEntries || !loading">
        <thead>
          <tr>
            <th>#</th>
            <table-header
              :sortProp="'lastname'"
              :activeProp="activeProp"
              @orderChanged="setOrder($event, 'lastname', 'string')">
              Név
            </table-header>
            <table-header
              :sortProp="'birthdate'"
              :activeProp="activeProp"
              @orderChanged="setOrder($event, 'birthdate', 'date')">
              Születési dátum
            </table-header>
            <th>Elérhetőségek</th>
            <th>Munkahely</th>
            <table-header
              :sortProp="'orvosi'"
              :activeProp="activeProp">
              Orvosi
            </table-header>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <user-row
            :class="{ odd: (index + 1) % 2 !== 0, even: (index + 1) % 2 === 0 }"
            v-for="(user, index) in users"
            :key="user.id" :user="user"
            :projects="projects"/>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6">
              <div class="pagination-wrapper">
                <div class="entry-overview">
                  <p>Showing {{ sliceStart + 1 }} to {{ sliceEnd }} of {{ numberOfItems }} entries</p>
                </div>
                <mat-pagination
                  v-if="numberOfPages > 1"
                  :currentPage="pagination.currentPage"
                  :numberOfPages="numberOfPages"
                  @changeCurrentPage="setCurrentPage($event)"
                />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import UserRow from './UserRow'
import MatInput from '../forms/MatInput'
import MatSelect from '../forms/MaterialSelect'
import MatPagination from '../Pagination'
import TableHeader from './UserHeader'

export default {
  data () {
    return {
      projects: [],
      searchValue: '',
      deleted: true,
      filter: '',
      pagination: {
        currentPage: 1,
        itemsPerPage: 10
      },
      itemPerPageOptions: [
        { value: 10, displayValue: '10 bejegyzés' },
        { value: 25, displayValue: '25 bejegyzés' },
        { value: 50, displayValue: '50 bejegyzés' },
        { value: 100, displayValue: '100 bejegyzés' }
      ],
      sortFunction: null,
      activeProp: ''
    }
  },
  computed: {
    users () {
      if (this.sortFunction) {
        return this.filterData(this.$store.getters.users).sort(this.sortFunction).slice(this.sliceStart, this.sliceEnd)
      }
      return this.filterData(this.$store.getters.users).slice(this.sliceStart, this.sliceEnd)
    },
    numberOfItems () {
      return this.filterData(this.$store.getters.users).length
    },
    numberOfPages () {
      return Math.ceil(this.numberOfItems / this.pagination.itemsPerPage)
    },
    sliceStart () {
      return ((this.pagination.currentPage - 1) * this.pagination.itemsPerPage)
    },
    sliceEnd () {
      const end = this.pagination.currentPage * this.pagination.itemsPerPage
      if (end > this.numberOfItems) {
        return this.numberOfItems
      }
      return end
    },
    noEntries () {
      return this.users.length === 0
    },
    loading () {
      return this.$store.getters.loading('userLoading')
    }
  },
  methods: {
    filterData (users) {
      const filter = this.filter.toUpperCase()
      if (filter) {
        return users.filter(user => {
          const { id, projects, student, ...userValues } = user
          const searchableUser = Object.values(userValues).join('')
          return searchableUser.toUpperCase().indexOf(filter) !== -1
        })
      }
      return users
    },
    setCurrentPage (event) {
      if (event === 'next' || event === 'prev') {
        const nextPage = this.pagination.currentPage + (event === 'next' ? 1 : -1)
        if (nextPage < this.numberOfPages + 1 && nextPage > 0) {
          this.pagination.currentPage = nextPage
        }
      } else {
        this.pagination.currentPage = event
      }
    },
    resetPagination () {
      this.pagination.currentPage = 1
    },
    setOrder (event, prop, type) {
      if (event === null) {
        this.sortFunction = null
        this.activeProp = ''
        return null
      } else {
        this.activeProp = event.sortProp
        if (type === 'string') {
          this.sortFunction = function (a, b) {
            const A = a[prop].toUpperCase()
            const B = b[prop].toUpperCase()
            if (A < B) {
              return event.order === 'asc' ? -1 : 1
            } else if (A > B) {
              return event.order === 'asc' ? 1 : -1
            }
            return 0
          }
        } else if (type === 'date') {
          this.sortFunction = function (a, b) {
            const dateA = moment(a[prop])
            const dateB = moment(b[prop])
            if (dateA.isAfter(dateB)) {
              return event.order === 'desc' ? -1 : 1
            } else if (dateA.isBefore(dateB)) {
              return event.order === 'desc' ? 1 : -1
            }
            return 0
          }
        }
      }
    }
  },
  created () {
    this.$http.get('project/all/')
      .then(response => response.json())
      .then((data) => {
        this.projects = data
      })
  },
  components: {
    userRow: UserRow,
    matInput: MatInput,
    matSelect: MatSelect,
    matPagination: MatPagination,
    tableHeader: TableHeader
  }
}
</script>

<style>
  .data-table {
    padding: 15px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.06);
    background-color: white;
  }
  .noEntries {
    padding: 15px;
  }
  .data-table-wrapper .card-panel {
    padding: 15px;
    margin-bottom: 0;
  }
  h5.table-header {
    margin: 0;
    line-height: 100%;
  }
  td, th {
    padding: 10px 5px;
    font-size: 14px;
    line-height: 20px;
    position: relative;
  }
  th:first-child {
    padding-left: 15px;
  }
  .pagination-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .entry-overview {
    display: flex;
    align-items: center;
  }
</style>
