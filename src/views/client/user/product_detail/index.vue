<template>
  <div class="container app__container">
    <div class="row product">
      <div class="col col-lg-5 col-md-5 col-sm-12">
        <!-- depicted product -->
        <depicted-product
          :images="product.depicted"
          :mainImageProduct="product.productDetail.image"
          :productName="product.productDetail.name">
        </depicted-product>
      </div>

      <div class="col col-lg-7 col-md-7 col-sm-12">
        <!-- sale product -->
        <sale-product :product="product.productDetail"></sale-product>
        <!-- guarantee product -->
        <a class="guarantee-product" href="#">
          <div>
            <img
              src="@/assets/img/GuaranteeProduct.png"
              alt="guarantee product"
              class="guarantee-product-img">
            <span class="guarantee-product-title">Shopee Đảm Bảo</span>
          </div>
          <span class="guarantee-product-desc">3 Ngày Trả Hàng / Hoàn Tiền</span>
        </a>
      </div>
    </div>
    <div class=" product mt-5 p-5">
      <!-- detail product -->
      <detail-product :productDetail="product.productDetail"></detail-product>
    </div>
  </div>
</template>

<script>
import DepictedProduct from '@/views/client/user/product_detail/depicted_product'
import SaleProduct from '@/views/client/user/product_detail/sale_product'
import DetailProduct from '@/views/client/user/product_detail/detail_product'
import Pagination from '@/components/user/pagination'
import '@/assets/css/productDetail.scss'
export default {
  name: 'ProductDetail',
  components: {
    DepictedProduct,
    SaleProduct,
    DetailProduct,
    Pagination
  },
  data () {
    return {
        comment: [],
        product: {
          depicted: [],
          productDetail: {}
        },
      pagination: {
        pageNum: 1,
        pageSize: 5
      },
      loadingComment: true,
      comments: [],
      totalComment: 0
    }
  },
  mounted () {
    const { slugWithId } = this.$route.params
    console.log('slugWithId: ', slugWithId)
      // getProductById(this.getIdProductFromSlug(slugWithId)).then(response => {
      //   const { data, status } = response.data
      //
      //   if (status === 200) {
      //     this.product.depicted = [ {
      //       id: 0,
      //       id_product: data.id,
      //       path: data.image
      //     }, ...data.images]
      //     this.product.productDetail = data
      //     console.log(data)
      //     this.getListComment(data.id)
      //   } else if (status === 404) {
      //     this.visibleModalProductNotFound = true
      //   }
      // })
    this.product = {
      depicted: [
        { id: 0, id_product: 1, path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9HF7GHiAl5L-o4SHFzCacQlTk6GoymHHtsg&usqp=CAU' },
        { id: 1, path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9HF7GHiAl5L-o4SHFzCacQlTk6GoymHHtsg&usqp=CAU' },
        { id: 2, path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9HF7GHiAl5L-o4SHFzCacQlTk6GoymHHtsg&usqp=CAU' },
        { id: 3, path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9HF7GHiAl5L-o4SHFzCacQlTk6GoymHHtsg&usqp=CAU' }
      ],
      productDetail: {
        id: 1,
        name: 'Áo thun nam POLO trơn vải cotton',
        idCategory: 1,
        idUser: 3,
        quantity: 96,
        discount: 0,
        price: 99000,
        description: '<p><span style="color: rgba(0, 0, 0, 0.8);">❌Bạn đang cần một hàm răng trắng sáng ?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">❌Bạn e ngại với mọi người mỗi khi nở nụ cười ?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">❌Bạn ngại vào nha khoa ?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Tất cả vấn đề trên sẽ được giải quyết với Kit tẩy trắng răng Smilee.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">Smilee là bộ sản phẩm tẩy trắng men răng tại nhà an toàn hàng đầu trên thị trường Việt Nam hiện nay.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">Gel tẩy trắng được sản xuất và nhập khẩu trực tiếp từ Mỹ, có chứa Glycerin, Carbamide, Peroxide có tác dụng  oxi hóa và làm đứt gãy các mảng bám trên men răng.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">Bộ sản phẩm đạt chứng nhận ISO 22716:2007.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);"> . CÔNG DỤNG ƯU VIỆT SẢN PHẨM:</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">✅ Loại bỏ các vết ố vàng trên răng, giúp răng trắng sáng tự nhiên</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">✅ Cung cấp dưỡng chất tự nhiên giúp bảo vệ men răng trong quá trình làm trắng.</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">✅ Trắng răng chỉ sau 20 phút</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">✅ Trắng răng an toàn không gây ê buốt</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">2. VẤN ĐỀ AN TOÀN</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; Có ê buốt không?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; Có an toàn không?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">Trả lời:</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tSản phẩm không chứa chất H2O2 ( Chất tẩy hoá học cực mạnh trong nha khoa), gel lành tính sẽ không làm hư hại men răng và hạn chế được tình trạng ê buốt bạn nha.</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tKhông gây hại đến lợi, nướu, răng sâu hay chân răng</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">3. VẤN ĐỀ TIẾT KIỆM</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; Bộ này sài được bao lâu?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; 2 ống gel dùng được bao lâu?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; Mua gel lẻ được không?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; Dùng 7 ngày là dừng hay sao hả bạn?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; Dùng 7 ngày là vứt đi hả bạn?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; Dùng liên tục hàng ngày hả bạn?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; Pin sạc hay cục?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">Trả lời:</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\t2 ống gel trong bộ kit dùng trong liệu trình 7-10 ngày. Còn máy dùng được đến 5 năm</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tChỉ cần sử dụng 7 ngày là bật tông, không cần dùng quanh năm như kem đánh răng</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tĐộ trắng giữ được 3-6 tháng hoặc tới 1 năm tuỳ vào men răng và cách sinh hoạt, đánh răng</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tKhi nào răng xuống tone mua thêm gel về dùng tiếp, không phải mua cả bộ </span></p><p><br></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Smilee là bộ bộ tẩy trắng răng tại nhà tiện lợi và an toàn nhất trên thị trường Việt Nam hiện nay. Sản phẩm được nghiên cứu và kiểm nghiệm kĩ lưỡng trong nhiều năm với những chuyên gia nghiên cứu dày dặn kinh nghiệm tại Mỹ. Được hiệp hội nha khoa Hoa Kỳ đồng ý và phê duyệt phân phối.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Hàng trăm Beauty Blogger và hàng nghìn người tiêu dùng Việt Nam đã sử dụng Kit tẩy trắng răng tại nhà Smilee để tự làm trắng răng tại nhà chỉ với 20 phút mỗi ngày. Răng của bạn sẽ trắng đều lên từ 3 đến 6 tone !</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????SẢN PHẨM CAM KÊT LÀM TRẮNG RĂNG NHƯ MÔ TẢ, HOÀN TIỀN 100% NẾU KHÔNG TRẮNG.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">Quá đơn giản phải không nào, nhưng đây là bí kíp làm trắng răng tại nhà đang HOT nhất hiện nay của các Beauty Blogger Việt Nam nổi tiếng như Ribi sachi - Faptv , My20s, Meichan, Quỳnh Thie, Trinh Meow, Hương Witch, Kiều Trinh, Khánh Vy,...</span></p><p><br></p><p><br></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);"> </span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">#taytrangrangsmilee #lamtrangrangsmilee #smileemax #smileetrangrang #crest #miengdantrangrangcrest</span></p><h1><span style="color: rgba(0, 0, 0, 0.8);">#taytrangrang #lamtrangrang #miengdantrangrang #taytrangrangtainha #thuoctaytrangrang #taytrangrangsmilee #kitsmilee #taytrangrangantoan #tayrang #trangrang #lamtranrangtainha #taytrangrang #bolamtrangrang #smilee #smileemax #smileetrangrang  #smilee #trangrang</span></h1>',
        title: 'Áo thun nam',
        numberOfStar: 5,
        address: 'Đình Cả, Nội Duệ , Tiên Du, Bắc Ninh',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9HF7GHiAl5L-o4SHFzCacQlTk6GoymHHtsg&usqp=CAU',
        images: [
          { id: 1, path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9HF7GHiAl5L-o4SHFzCacQlTk6GoymHHtsg&usqp=CAU' },
          { id: 2, path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9HF7GHiAl5L-o4SHFzCacQlTk6GoymHHtsg&usqp=CAU' },
          { id: 3, path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9HF7GHiAl5L-o4SHFzCacQlTk6GoymHHtsg&usqp=CAU' }
        ],
        selled: 5,
        isSell: true,
        categories: [ { id: 1, original_category_name: 'Thời Trang Nam' } ]
      }
    }
  },
  methods: {
    getIdProductFromSlug (slugWithId) {
      const arrayTruncate = slugWithId.split('.')
        return arrayTruncate[arrayTruncate.length - 1]
    },
    handleProductNotFound () {
      this.$router.push({ path: '/' })
    },
    onSubmitCreateComment (commentText, listFileImage, star) {
      const formData = new FormData()

      const commentObj = {
        id_product: this.product.productDetail.id,
        comment: commentText,
        star
      }

      listFileImage.forEach(file => formData.append('files', file.fileImage))
      formData.append(
        'comment',
        new Blob([JSON.stringify(commentObj)], { type: 'application/json' })
      )
    }
  }
}
</script>

<style>
.product{
    padding: 15px 0;
    background-color: #fff;
    border-radius: 2px;
}

.guarantee-product {
    display: flex;
    align-items: center;
    padding: 25px 20px;
    font-size: 1.4rem;
    text-decoration: none;
    font-weight: 500;
    flex-wrap:wrap;
}

.guarantee-product:hover {
    text-decoration: none;
}

.guarantee-product-desc {
    color: rgba(0, 0, 0, 0.54);
}

.guarantee-product-img {
    width: 20px;
    height: 20px;
}

.guarantee-product-title {
    margin: 0 20px 0 5px;
    color: #222;
}

.title__name {
    font-size: 2rem;
    line-height: 2.4rem;
}

@media (max-width: 768px) {
    .product-option__select, .guarantee-product, .quantity-product {
        justify-content: space-around;
        margin-bottom: 8px;
    }
    .depicted-product__social {
        flex-wrap: wrap;
        justify-content:space-around;
    }
    .product-option__select-btn-color {
        margin-bottom: 8px;
    }
}
</style>
