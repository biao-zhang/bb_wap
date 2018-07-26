// import IndexFall from '@/components/indexfall'
import wxInit from '@/components/wx/init'
import Voice from '@/components/wx/voice/voice'

const map = {
  path:'/wx',
  component:wxInit,
  children: [
    {
      path: 'voice',
      component: Voice
    },
  ]
}
export default map
