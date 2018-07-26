<template>
  <div>
    <datetime
      v-model="value1"
      @on-change="change"
      @on-cancel="log('cancel')"
      @on-confirm="log('confirm')"
      @on-hide="log('hide', $event)"></datetime>

      <datetime v-model="minuteListValue" format="YYYY-MM-DD HH:mm" :minute-list="['00', '15', '30', '45']" @on-change="change" ></datetime>


  </div>
</template>


<script>
  import { Datetime, Group, XButton } from 'vux'
  export default {
    components: {
      Datetime,
      Group,
      XButton
    },
    data () {
      return {
        readonly: true,
        minuteListValue: '2017-06-12 09:00',
        hourListValue: '2017-06-12 09:00',
        format: 'YYYY-MM-DD HH:mm',
        value1: '2015-11-12',
        valueReadonly: '2015-11-12',
        value2: '',
        value3: '',
        value3_1: '',
        value4: '',
        value5: '',
        value6: '2016-08-18',
        value7: '',
        value8: '',
        limitHourValue: '',
        startDate: '2015-11-11',
        endDate: '2017-10-11',
        formatValue: '2017-10-11',
        formatValueFunction (val) {
          return val.replace(/-/g, '$')
        },
        value9: '',
        visibility: false,
        computeHoursValue: '',
        computeDaysValue: '',
        computeHoursFunction (date, isToday, generateRange) {
          if (isToday) {
            return generateRange(new Date().getHours(), 23)
          } else {
            return generateRange(0, 23)
          }
        },
        computeDaysFunction (options, generateRange) {
          return [options.month] // if current month is n, days are [n]
        },
        onlySetEndDate: '2017-10-11',
        onlySetEndDateValue: ''
      }
    },
    methods: {
      log (str1, str2 = '') {
        console.log(str1, str2)
      },
      showPlugin () {
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD HH',
          value: '2017-05-20 18',
          onConfirm (val) {
            console.log('plugin confirm', val)
          },
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          }
        })
      },
      toggleFormat () {
        this.format = this.format === 'YYYY-MM-DD HH:mm' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'
      },
      change (value) {
        console.log('change', value)
      },
      clearValue (value) {
        this.value6 = ''
      },
      clearValue8 (value) {
        this.value8 = ''
      },
      setToday (value) {
        let now = new Date()
        let cmonth = now.getMonth() + 1
        let day = now.getDate()
        if (cmonth < 10) cmonth = '0' + cmonth
        if (day < 10) day = '0' + day
        this.value7 = now.getFullYear() + '-' + cmonth + '-' + day
        console.log('set today ok')
      }
    }
  }
</script>

<style scoped lang="less">
  .center {
    padding-top: 10px;
    padding-left: 15px;
    color: green;
  }
</style>
