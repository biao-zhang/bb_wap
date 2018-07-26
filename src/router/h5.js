import IndexFall from '@/components/indexfall'
import Teamwork from '../components/h5/teamwork'

const h5 = {
  path: '/h5',
  component: IndexFall,
  children: [
    // 评价结果页
    {
      path: 'teamwork',
      component: Teamwork
    },
  ]
}

export default h5;
