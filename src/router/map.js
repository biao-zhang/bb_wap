import IndexFall from '@/components/indexfall'
import MapTest1 from '@/components/map/test1'
import MapTest2 from '@/components/map/test2'
import MapDingwei from '@/components/map/dingwei'
import MapLuxian from '@/components/map/luxian'
import MapBiaozhu from '@/components/map/biaozhu'

const map = {
  path:'/map',
  component:IndexFall,
  redirect:'/map/test1',
  children:[
    {
      path:'test1',
      component:MapTest1
    },
    {
      path:'test2',
      component:MapTest2
    },
    {
      path:'dingwei',
      component:MapDingwei
    },
    {
      path:'luxian',
      component:MapLuxian
    },
    {
      path:'biaozhu',
      component:MapBiaozhu
    },

  ]
}

export default map;

