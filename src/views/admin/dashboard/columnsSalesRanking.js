export const columnsSalesRanking = [
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: { customRender: 'rowIndex' },
    align: 'center',
    ellipsis: true,
    width: 30
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    align: 'left',
    ellipsis: true,
    width: 150
  },
  {
    title: 'Doanh số',
    dataIndex: 'revenue',
    scopedSlots: { customRender: 'revenue' },
    align: 'right',
    ellipsis: true,
    width: 50
  }
]
