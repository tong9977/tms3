/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'

// Store functionality
import modules from './modules'

import feathersVuex from 'feathers-vuex'
import feathersClient from '../plugins/feathers-client'
const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: 'Id' })

Vue.use(Vuex)
Vue.use(FeathersVuex)

// Create a new store
const store = new Vuex.Store({
    modules,
    plugins:[
        auth({ userService: 'user',entityIdField:'Id' }),
        service('role',{modelName:'Role',idField: 'Id'}),
        service('user',{modelName:'User',idField: 'Id'}), 
        service('vehicle',{modelName:'Vehicle',idField: 'Id'}),
        service('vehicletype',{modelName:'VehicleType',idField: 'Id'}),
        service('job',{modelName:'Job',idField: 'Id'}),
        service('jobtype',{modelName:'JobType' ,idField:'Id'}),
        service('jobstatus',{modelName:'JobStatus' ,idField:'Id'}),
        service('jobitem',{idField:'Id'}),
        service('trips',{idField:'TripId'}),
        service('tripcommand',{idField:'Id'}),
        service('usertrip',{idField:'UserId'}),
        service('usertripcommand',{idField:'Id'}),
        service('jobtrip',{idField:'JobId'}),
        service('jobtripcommand',{idField:'Id'}),
        service('product',{idField:'Id'}),
        service('unit',{idField:'Id'}),
        service('upload',{idField:'Id'}),
        service('blob')
    ]
})

export default store
