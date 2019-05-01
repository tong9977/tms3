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
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/table-list',
    name: 'Table List',
    view: 'TableList'
  },
  {
    path: '/typography',
    view: 'Typography'
  },
  {
    path: '/icons',
    view: 'Icons'
  },
  {
    path: '/maps',
    view: 'Maps'
  },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    view: 'Upgrade'
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
  }          
]
