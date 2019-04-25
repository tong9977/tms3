export default {
  drivers: [
    {
      DriverId: 1,
      FirstName: 'รัชกฤช',
      LastName: 'มัญยานนท์',
      StaffId:'59001',
      ImageUrl: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      UserName: 'd001'
    },
    {
      DriverId: 2,
      FirstName: 'วรัณธร',
      LastName: 'วัญยานนท์',
      StaffId:'59002',
      ImageUrl: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      UserName: 'd002'
    },
  ],
  vehicles: [
    {
      VehicleId: 1,
      LicensePlate: 'กด 187',
      Type: 'บรรทุก 6 ล้อ',
      Limit: 600,
      LimitCC: 6100000,
      Enable: true
    },
    {
      VehicleId: 2,
      LicensePlate: 'กษ 288',
      Type: 'บรรทุก 6 ล้อ',
      Limit: 600,
      LimitCC: 6240000,
      Enable: true
    },
    {
      VehicleId: 3,
      LicensePlate: 'บก 234',
      Type: 'กระบะ',
      Limit: 800,
      LimitCC: 350000,
      Enable: false
    },
  ],
  jobnews: [
    {
      JobId: 1,
      CustomerId: 1,
      CustomerName: 'หจก เกนไชย',
      Address: '448/173 หมู่บ้านฉัตรหลวง ซอยราษฎ์อุทิศ 54 ถนนราษฎร์อุทิศ แขวงแสนแสบ เขตมีนบุรีกรุงเทพฯ 10510',
      Lat: 13.8364088,
      Long: 100.7858743,
      CustomerNickName: 'ร้านคุณเก่ง',
      ContactPerson: 'คุณเก่ง',
      Tel: '0877997754',
      DeliveryDate: '2019-04-01',
      Remark: 'รับเช็คเก็บเงินมาด้วย',
      Assigned: false,
      CC: 60000,
      Weigth: 60,     
      Distance: 120,     
      RouteNo: 1,
      Zone: 'บางนา',
      Products: [
        {
          ProductName: 'สีน้ำเงิน T1002 กลาง',
          Quantity: 1,
          Unit: 'ถัง'
        },
        {
          ProductName: 'สีแดง T105 กลาง',
          Quantity: 5,
          Unit: 'ถัง'
        },
        {
          ProductName: 'สีเขียว T107 กลาง',
          Quantity: 4,
          Unit: 'ถัง'
        },
      ]

    },
    {
      JobId: 2,
      CustomerId: 1,
      CustomerName: 'บริษัทไอซีอี',
      Address: '448/173 หมู่บ้านฉัตรหลวง ซอยราษฎ์อุทิศ ',
      Lat: 13.8364088,
      Long: 100.7858743,
      CustomerNickName: 'ร้านคุณโต้ง งามวงศ์วาน',
      ContactPerson: 'คุณทราย',
      Tel: '0877997754',
      DeliveryDate: '2019-04-03',
      Remark: '',
      Assigned: false,
      CC: 60000,
      Distance: 130,
      Weigth: 60,     
      RouteNo: 1,
      Zone: 'บางนา',
      Products: [
        {
          ProductName: 'สีน้ำเงิน T1002 กลาง',
          Quantity: 1,
          Unit: 'ถัง'
        },
      ]

    }
  ],
  jobassigns: [
    {
      JobId: 1,
      CustomerId: 1,
      CustomerName: 'หจก เกนไชย',
      Address: '448/173 หมู่บ้านฉัตรหลวง ซอยราษฎ์อุทิศ 54 ถนนราษฎร์อุทิศ แขวงแสนแสบ เขตมีนบุรีกรุงเทพฯ 10510',
      Lat: 13.8364088,
      Long: 100.7858743,
      CustomerNickName: 'ร้านคุณเก่ง',
      ContactPerson: 'คุณเก่ง',
      Tel: '0877997754',
      DeliveryDate: '2019-04-01',
      Remark: 'รับเช็คเก็บเงินมาด้วย',
      Assigned: false,
      CC: 60000,
      Weigth: 60,     
      Distance: 120,     
      RouteNo: 1,
      Zone: 'บางนา',
      Products: [
        {
          ProductName: 'สีน้ำเงิน T1002 กลาง',
          Quantity: 1,
          Unit: 'ถัง'
        },
        {
          ProductName: 'สีแดง T105 กลาง',
          Quantity: 5,
          Unit: 'ถัง'
        },
        {
          ProductName: 'สีเขียว T107 กลาง',
          Quantity: 4,
          Unit: 'ถัง'
        },
      ]

    },
  ],
  jobdone: [

    {
      JobId: 1,
      CustomerId: 1,
      CustomerName: 'หจก เกนไชย',
      Address: '448/173 หมู่บ้านฉัตรหลวง ซอยราษฎ์อุทิศ 54 ถนนราษฎร์อุทิศ แขวงแสนแสบ เขตมีนบุรีกรุงเทพฯ 10510',
      Lat: 13.8364088,
      Long: 100.7858743,
      CustomerNickName: 'ร้านคุณเก่ง',
      ContactPerson: 'คุณเก่ง',
      Tel: '0877997754',
      DeliveryDate: '2019-04-01',
      Remark: 'รับเช็คเก็บเงินมาด้วย',
      Assigned: false,
      CC: 60000,
      Weigth: 60,     
      Distance: 120,     
      RouteNo: 1,
      Zone: 'บางนา',
      Products: [
        {
          ProductName: 'สีน้ำเงิน T1002 กลาง',
          Quantity: 1,
          Unit: 'ถัง'
        },
        {
          ProductName: 'สีแดง T105 กลาง',
          Quantity: 5,
          Unit: 'ถัง'
        },
        {
          ProductName: 'สีเขียว T107 กลาง',
          Quantity: 4,
          Unit: 'ถัง'
        },
      ]

    },
  ]

}
