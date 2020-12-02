export const PAGE_SIZES = [5, 10, 20, 30, 50]

export const SYNC_STATUS = [
  {
    value: 'Active',
    label: 'Active',
    type: 'success'
  },
  {
    value: 'Paused',
    label: 'Paused',
    type: 'danger'
  }
]

export const STATUS = [
  {
    value: '1',
    label: 'Active',
    type: 'success'
  },
  {
    value: '0',
    label: 'Paused',
    type: 'danger'
  }
]

export const TRACKING_TYPE = [
  {
    value: '0',
    label: 'Insight'
  },
  {
    value: '1',
    label: 'Universal'
  }
]

export const DOWNLOAD_STATUS = [
  {
    value: '1',
    label: 'Processing'
  },
  {
    value: '2',
    label: 'Failed'
  },
  {
    value: '3',
    label: 'Completed'
  },
  {
    value: '4',
    label: 'Email-Completed'
  }
]

export const ENGINE_TYPE = [
  {
    value: 'Google',
    label: 'Google'
  },
  // {
  //   value: 'Bing',
  //   label: 'Microsoft Bing',
  // },
  {
    value: 'Baidu',
    label: 'Baidu'
  }
]

export const CONVERSION_TYPE = [
  {
    value: '1',
    label: '1 day'
  },
  {
    value: '3',
    label: '3 days'
  },
  {
    value: '7',
    label: '7 days'
  },
  {
    value: '14',
    label: '14 days'
  },
  {
    value: '30',
    label: '30 days'
  },
  {
    value: '45',
    label: '45 days'
  },
  {
    value: '60',
    label: '60 days'
  }
]

export const CAMPAIGN_STATUS = [
  {
    value: 'enabled',
    label: 'Enabled'
  },
  {
    value: 'disabled',
    label: 'Disabled'
  }
]

export const NATURE_LIST = [
  {
    value: '1',
    label: 'Home Page'
  },
  {
    value: '2',
    label: 'Submit Button'
  },
  {
    value: '3',
    label: 'Form PV'
  },
  {
    value: '4',
    label: 'Registration Steps'
  },
  {
    value: '5',
    label: 'Registration Thank You'
  },
  {
    value: '6',
    label: 'Registration Start'
  },
  {
    value: '7',
    label: 'Login Page'
  },
  {
    value: '8',
    label: 'Thank you Page'
  },
  {
    value: '9',
    label: 'Other PV'
  },
  {
    value: '10',
    label: 'Member Registration'
  },
  {
    value: '11',
    label: 'Member Reg Thank You'
  },
  {
    value: '12',
    label: 'Product Page'
  },
  {
    value: '13',
    label: 'Shopping Cart'
  },
  {
    value: '14',
    label: 'Order Information'
  },
  {
    value: '15',
    label: 'Order Confirmation'
  },
  {
    value: '16',
    label: 'Order Thank You'
  }
]

export const DEDUPLICATION_LIST = [
  {
    value: '-2',
    label: '1-per-visitor conversion'
  },
  {
    value: '-1',
    label: 'Browser session'
  }
]

export const ENUM_DATE = [
  {
    value: '-1',
    label: 'day'
  },
  {
    value: '7',
    label: 'last7'
  },
  {
    value: '30',
    label: 'last30'
  },
  {
    value: '1week',
    label: 'week'
  },
  {
    value: '1month',
    label: 'month'
  }
]

export const CHANNEL_TYPE = [
  {
    value: 'conversions',
    label: 'All Conversions'
  },
  {
    value: 'averageTimeSpan',
    label: 'AverageTimeSpan'
  },
  {
    value: 'uniqueVistors',
    label: 'UniqueVistors'
  },
  {
    value: 'newVisitors',
    label: 'NewVisitors'
  },
  {
    value: 'repeatVistors',
    label: 'RepeatVistors'
  },
  {
    value: 'frequencyVisit',
    label: 'FrequencyVisit'
  },
  {
    value: 'averagePv',
    label: 'AveragePv'
  },
  {
    value: 'uniqueVisits',
    label: 'UniqueVisits'
  },
  {
    value: 'bounceRate',
    label: 'BounceRate'
  }
]

export const DEVICE_TYPE = [
  {
    value: 'Computer',
    label: 'Computer'
  },
  {
    value: 'Mobile',
    label: 'Mobile'
  },
  {
    value: 'Tablet',
    label: 'Tablet'
  },
  {
    value: 'Unknown',
    label: 'Unknown'
  }
]

export const CHANNEL_NAME = [
  {
    value: 'direct',
    label: 'Direct'
  },
  {
    value: 'organic',
    label: 'Organic'
  },
  {
    value: 'paidsearch',
    label: 'Paid Search'
  },
  {
    value: 'display',
    label: 'Display'
  },
  {
    value: 'video',
    label: 'Video'
  },
  {
    value: 'social',
    label: 'Social'
  },
  {
    value: 'referral',
    label: 'Referral'
  },
  {
    value: 'others',
    label: 'Others'
  }
]

export const CHANNEL_ID = [
  {
    value: '1',
    label: 'Direct'
  },
  {
    value: '2',
    label: 'Organic'
  },
  {
    value: '3',
    label: 'Paid Search'
  },
  {
    value: '4',
    label: 'Display'
  },
  {
    value: '5',
    label: 'Video'
  },
  {
    value: '6',
    label: 'Social'
  },
  {
    value: '7',
    label: 'Referral'
  },
  {
    value: '8',
    label: 'Others'
  }
]

export const convertType = (value, typeArr, defaultNotFound) => {
  defaultNotFound = defaultNotFound ? defaultNotFound : { text: '无匹配类型' }
  let types = typeArr.filter(item => {
    return item.value === value + ''
  })
  return types.length > 0 ? types[0] : defaultNotFound
}
