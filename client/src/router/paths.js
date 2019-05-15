/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/dashboard',
    // Relative to /src/views
    view: 'Dashboard'
  },
  {
    path: '/home',
    name: 'Home',
    view: 'Home'
  },
  {
    path: '/schedule',
    name: 'Schedule',
    view: 'Schedule'
  },
  {
    path: '/jobnew',
    name: 'JobNew',
    view: 'JobNew'
  },
  {
    path: '/jobtype',
    name: 'JobType',
    view: 'JobType'
  },
  {
    path: '/jobdetail/:id',
    name: 'JobDetail',
    view: 'JobDetail'
  },
  {
    path: '/jobdetailmobile/:id',
    name: 'JobDetailMobile',
    view: 'JobDetailMobile'
  },
  {
    path: '/jobassigned',
    name: 'JobAssigned',
    view: 'JobAssigned'
  },
  {
    path: '/jobdone',
    name: 'JobDone',
    view: 'JobDone'
  },
  {
    path: '/vehicle',
    name: 'Vehicle',
    view: 'Vehicle'
  },
  {
    path: '/vehiclecreateedit/:mode/:Id',
    name: 'VehicleCreateEdit',
    view: 'VehicleCreateEdit'
  },
  {
    path: '/vehicleadd',
    name: 'VehicleAdd',
    view: 'VehicleAdd'
  }
  ,
  {
    path: '/vehicleedit/:id',
    name: 'VehicleEdit',
    view: 'VehicleEdit'
  },
  {
    path: '/vehicletype',
    name: 'VehicleType',
    view: 'VehicleType'
  },
  {
    path: '/driver',
    name: 'Driver',
    view: 'Driver'
  },
  {
    path: '/drivercreateedit/:mode/:Id',
    name: 'DriverCreateEdit',
    view: 'DriverCreateEdit'
  },

  {
    path: '/driveradd',
    name: 'DriverAdd',
    view: 'DriverAdd'
  },
  {
    path: '/driveredit/:Id',
    name: 'DriverEdit',
    view: 'DriverEdit'
  },
  {
    path: '/role',
    name: 'Role',
    view: 'Role'
  },
  {
    path: '/login',
    name: 'Login',
    view: 'Login'
  },
  {
    path: '/todaytrip',
    name: 'TodayTrip',
    view: 'TodayTrip'
  },
  {
    path: '/todaytripjobdetail',
    name: 'TodayTripJobDetail',
    view: 'TodayTripJobDetail'
  },
  {
    path: '/company',
    name: 'Company',
    view: 'Company'
  },
  {
    path: '/jobtype',
    name: 'Jobtype',
    view: 'Jobtype'
  },
  {
    path: '/่jobstatus',
    name: 'JobStatus',
    view: 'JobStatus'
  },
  {
    path: '/trip',
    name: 'Trip',
    view: 'Trip'
  },
  {
    path: '/่product',
    name: 'Product',
    view: 'Product'
  },
  {
    path: '/่unit',
    name: 'Unit',
    view: 'Unit'
  },
  {
    path: '/signature/:Id',
    name: 'Signature',
    view: 'Signature'
  },
  {
    path: '/mytripmobile/:Id',
    name: 'MyTripMobile',
    view: 'MyTripMobile'
  },
  {
    path: '/tripdetailmobile/:Id',
    name: 'TripDetailMobile',
    view: 'TripDetailMobile'
  }
  
]
