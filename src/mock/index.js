const categoryTreeTest = [
  {
    id: 1,
    name: '测试',
    children: [
      {
        id: 2,
        pid: 1,
        name: '一级测试',
        children: [
          {
            id: 3,
            pid: 2,
            name: '二级测试'
          },
          {
            id: 4,
            pid: 2,
            name: '二级测试2'
          }
        ]
      },
      {
        id: 5,
        pid: 1,
        name: '一级测试2',
        children: [
          {
            id: 6,
            pid: 2,
            name: '二级测试3'
          },
          {
            id: 7,
            pid: 2,
            name: '二级测试4'
          }
        ]
      }
    ]
  },
  {
    id: 8,
    name: '测试2'
  }
]

export default {
  categoryTreeTest
}
