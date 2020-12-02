export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: this.$t('dateRange.yesterday'),
            i18n: 'dateRange.yesterday',
            onClick(picker) {
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, start])
            }
          },
          {
            text: this.$t('dateRange.last7days'),
            i18n: 'dateRange.last7days',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: this.$t('dateRange.last30days'),
            i18n: 'dateRange.last30days',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: this.$t('dateRange.lastweek'),
            i18n: 'dateRange.lastweek',
            onClick(picker) {
              let now = new Date()
              let currentWeek = now.getDay()
              if (currentWeek == 0) {
                currentWeek = 7
              }
              let monday =
                now.getTime() - (currentWeek - 1 + 7) * 24 * 60 * 60 * 1000 //星期一
              let sunday =
                now.getTime() + (7 - currentWeek - 7) * 24 * 60 * 60 * 1000 //星期日
              picker.$emit('pick', [new Date(monday), new Date(sunday)])
            }
          },
          {
            text: this.$t('dateRange.lastmonth'),
            i18n: 'dateRange.lastmonth',
            onClick(picker) {
              const start = new Date()
              let month = start.getMonth()
              month--
              let year = start.getFullYear()
              if (month < 0) {
                ;(month = 11), year--
              }
              start.setMonth(month)
              start.setYear(year)
              start.setDate(1) //第一天
              const end = new Date(start)
              end.setMonth(month + 1)
              end.setDate(0)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  watch: {
    '$i18n.locale'() {
      this.pickerOptions.shortcuts.forEach(item => {
        item.text = this.$t(item.i18n)
      })
    }
  }
}
