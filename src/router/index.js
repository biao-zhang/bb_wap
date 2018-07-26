import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Index from '@/components'
import IndexFall from '@/components/indexfall'
import Route from '@/components/router'
import axios from 'axios'
import MyDetailMsg from '@/components/my/persionDetailMsg'
import ShopIndex from '@/components/shop/shopIndex'
import LInput from '@/components/demo/xInput'
import NearbyIndex from '@/components/nearby/nearbyIndex'
import ServiceIndex from '@/components/service/serviceIndex'
import RunTo from '@/components/service/runTo'
import Housekeep from '@/components/service/housekeep'
import Driver from '@/components/service/driver'
import Repair from '@/components/service/repair'
import Commonweal from '@/components/service/commonweal'
import Helper from '@/components/service/helper'
import RedDynamic from '@/components/nearby/redDynamic/redDynamic'
import {isWeiXin} from '@/untils/untils'
import {wxloginJsp} from '@/api/personally'
import Map from './map'
import Wx from './wx'
import demo from './demo'
import Router1 from './lml'
import Router2 from './zb'
import Router3 from './lyb'
import Router4 from './h5'

Vue.use(Router)

const router = new Router({
  // mode:"history",

  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect:'/shop',
    },
    {
      path: '/bb',
      name: 'indexFall',
      component: IndexFall,
      children:[
        {
          path:'runTo',
          component:RunTo,
          meta:{auth:true}
        },
        {
          path:'housekeep',
          component:Housekeep,
          meta:{auth:true}
        },
        {
          path:'driver',
          component:Driver,
          meta:{auth:true}
        },
        {
          path:'repair',
          component:Repair,
          meta:{auth:true}
        },
        {
          path:'commonweal',
          component:Commonweal,
          meta:{auth:true}
        },
        {
          path:'helper',
          component:Helper,
          meta:{auth:true}
        }
      ]
    },
    {
      path:'/demo',
      redirect:'/demo/datatime',
      component:Index,
      children:demo
    },
    {
      path:'/my',
      redirect:'/my/persionDatailMsg',
      component:Index,
      children:[
        {
          path:'persionDatailMsg',
          component:MyDetailMsg,
        }

      ]
    },
    {
      path:'/shop',
      component:Index,
      redirect:'/shop/shopIndex',
      children:[
        {
          path:'shopIndex',
          component:ShopIndex
        },
        {
          path:'input',
          component:LInput
        }
      ]
    },
    // 红动全城页
    {
      path: '/z',
      component:Index,
      redirect:'/z/redDynamic',
      children:[
        {
          path:'redDynamic',
          component:RedDynamic,
        }
      ]
    },
    {
      path:'/nearby',
      component:Index,
      redirect:'/z/redDynamic',
      // redirect:'/nearby/nearbyIndex',
      children:[
        {
          path:'nearbyIndex',
          component:NearbyIndex
        }
      ]
    },
    {
      path:'/service',
      component:Index,
      redirect:'/service/serviceIndex',
      children:[
        {
          path:'serviceIndex',
          component:ServiceIndex
        }
      ]
    },
    Map,Wx,
    Router1,Router2,Router3,Router4,
    {
      path:'/route',
      component:Route,
    }
  ]
})

router.afterEach(function (to) {
  store.commit('setLoading',false)
})
router.beforeEach(function (to, from, next) {
  store.commit('setLoading',true)
  axios.post('/personally/user/selectBasicById')
    .then(function (response) {
      let res = response.data.message;
      if(to.meta.title)
      {
        document.title = to.meta.title;
        document.description = to.meta.description;
      }
      if(res!=='success'){ //未登录的
        if(to.matched.some(m => m.meta.auth))//需要验证
        {
          if(isWeiXin())
          {
            wxloginJsp().then( res => {
              if(res.data) {
                window.location = res.data
              }
            })
            // next({ path: '/y/logIn', query: { redirect: to.fullPath } })
          }
          else{
            console.log('需要登录验证')
            // next({ path: '/y/login', query: { Rurl: to.fullPath } })
            next({ path: '/y/logIn', query: { redirect: to.fullPath } })
          }

        }
        else{
          next()
        }
      }

      else{
        store.commit('setUserId',response.data.data.userId)
        next()
      }
    })
    .catch(function (error) {
      console.log('登录拦截',error);
      next();
    })
    //5秒跳转不过去，自动关闭loadding
    setTimeout(function(){
      store.commit('setLoading',false);
    },5000)
})
export default router
