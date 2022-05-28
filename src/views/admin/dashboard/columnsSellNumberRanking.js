export const columnsSellNumberRanking = [
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
    title: 'Đã bán',
    dataIndex: 'sold',
    scopedSlots: { customRender: 'sold' },
    align: 'right',
    ellipsis: true,
    width: 50
  },
  {
    title: 'Tồn kho',
    dataIndex: 'inventory',
    scopedSlots: { customRender: 'inventory' },
    align: 'right',
    ellipsis: true,
    width: 50
  }
]
