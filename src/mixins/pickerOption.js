export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: this.$t('dateRange.today'),
            i18n: 'dateRange.today',
            onClick(picker) {
              const start = new Date()
              picker.$emit('pick', [start, start])
            }
          },
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
            text: this.$t('dateRange.month'),
            i18n: 'dateRange.month',
            onClick(picker) {
              const end = new Date()
              const start = new Date(end.getFullYear(), end.getMonth(), 1)
              picker.$emit('pick', [start, end])
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
          },
          {
            text: this.$t('dateRange.total'),
            i18n: 'dateRange.total',
            onClick(picker) {
              const end = new Date()
              const start = new Date(2010, 0, 1)
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
