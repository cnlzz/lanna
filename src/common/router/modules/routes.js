const routes = [
  {
    path: '/pages/index/live/live',
    aliasPath: '/', //对于h5端你必须在首页加上aliasPath并设置为/
    name: 'live',
    meta: {
      title: 'LMS',
    },
  },
  {
    path: '/pages/index/data/data',
    name: 'data',
    aliasPath: '/data',
    meta: {
      title: '',
    },
  },
  {
    path: '/pages/index/mine/mine',
    name: 'mine',
    aliasPath: '/mine',
    meta: {
      title: '',
    },
  },
  {
    path: '/pages/live/message-list/message-list',
    name: 'messageList',
    aliasPath: '/messageList',
    meta: {
      title: '',
    },
  },
  {
    path: '/pages/live/live-detail/live-detail',
    name: 'liveDetail',
    aliasPath: '/liveDetail',
    meta: {
      title: '',
    },
  },
  {
    path: '/pages/live/successful-registration/successful-registration',
    name: 'successfulRegistration',
    aliasPath: '/successfulRegistration',
    meta: {
      title: '',
    },
  },
  {
    path: '/pages/mine/improve-information/improve-information',
    name: 'improveInformation',
    aliasPath: '/improveInformation',
    meta: {
      title: '',
    },
  },
  {
    path: '/pages/mine/staff-login/staff-login',
    name: 'staffLogin',
    aliasPath: '/staffLogin',
    meta: {
      title: '员工登录',
    },
  },
  {
    path: '/pages/mine/sms/sms',
    name: 'sms',
    aliasPath: '/sms',
    meta: {
      title: '',
    },
  },
  {
    path: '/pages/mine/my-collections/my-collections',
    name: 'myCollections',
    aliasPath: '/myCollections',
    meta: {
      title: '',
    },
  },
  {
    path: '/pages/course/course',
    name: 'course',
    aliasPath: '/course',
    meta: {
      title: '课程',
    },
  },
];
export default routes;
