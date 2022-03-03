<template>
  <div class="app__container">
    <div class="grid wide">
      <div class="row sm-gutter app__content">
        <div class="col-lbr l-12 m-12 c-12">
          <div class="home-produce">
            <!-- category mobile -->
            <category-mobile :listCategory="listCategory"></category-mobile>
            <!-- home carousel -->
            <home-carousel style="margin-bottom: 18px"></home-carousel>
            <!-- category home pc -->
            <category-home :listCategory="listCategory"></category-home>
            <!-- list product -->
            <div class="row-lbr sm-gutter list-product" style="padding-bottom: 40px; margin-top: 20px; min-height: 50px">
              <product-item v-for="(product, index) in listProduct" :key="index" :product="product"></product-item>
              <a-spin size="large" :spinning="loadingListProduct" style="width: 100%"></a-spin>
            </div>
            <button class="btn btn--primary btn-watch-more-product" v-if="visiblePagination === false" @click="handleWatchMore">Xem thêm</button>
            <pagination
              v-else
              :total="pagination.total"
              :currentPage="pagination.current"
              @getByPagination="getByPagination"
            ></pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeCarousel from '@/components/user/home_carousel'
import CategoryMobile from '@/components/user/category_mobile'
import CategoryHome from '@/components/user/category_home_pc'
import ProductItem from '@/views/client/user/home/product_item'
import Pagination from '@/components/user/pagination'
export default {
  name: 'Home',
  components: {
    HomeCarousel,
    CategoryMobile,
    CategoryHome,
    ProductItem,
    Pagination
  },
  data: () => {
    return {
      listCategory: [],
      listProduct: [],
      loadingListProduct: false,
      visiblePagination: false,
      products: [
        {
          id: 1,
          name: 'Áo thun nam POLO trơn vải cotton',
          idCategory: 52,
          idUser: 3,
          quantity: 96,
          discount: 0,
          price: 99000,
          description: '<p><span style="color: rgba(0, 0, 0, 0.8);">❌Bạn đang cần một hàm răng trắng sáng ?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">❌Bạn e ngại với mọi người mỗi khi nở nụ cười ?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">❌Bạn ngại vào nha khoa ?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Tất cả vấn đề trên sẽ được giải quyết với Kit tẩy trắng răng Smilee.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">Smilee là bộ sản phẩm tẩy trắng men răng tại nhà an toàn hàng đầu trên thị trường Việt Nam hiện nay.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">Gel tẩy trắng được sản xuất và nhập khẩu trực tiếp từ Mỹ, có chứa Glycerin, Carbamide, Peroxide có tác dụng  oxi hóa và làm đứt gãy các mảng bám trên men răng.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">Bộ sản phẩm đạt chứng nhận ISO 22716:2007.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);"> . CÔNG DỤNG ƯU VIỆT SẢN PHẨM:</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">✅ Loại bỏ các vết ố vàng trên răng, giúp răng trắng sáng tự nhiên</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">✅ Cung cấp dưỡng chất tự nhiên giúp bảo vệ men răng trong quá trình làm trắng.</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">✅ Trắng răng chỉ sau 20 phút</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">✅ Trắng răng an toàn không gây ê buốt</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">2. VẤN ĐỀ AN TOÀN</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; Có ê buốt không?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; Có an toàn không?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">Trả lời:</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tSản phẩm không chứa chất H2O2 ( Chất tẩy hoá học cực mạnh trong nha khoa), gel lành tính sẽ không làm hư hại men răng và hạn chế được tình trạng ê buốt bạn nha.</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tKhông gây hại đến lợi, nướu, răng sâu hay chân răng</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">3. VẤN ĐỀ TIẾT KIỆM</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; Bộ này sài được bao lâu?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; 2 ống gel dùng được bao lâu?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; Mua gel lẻ được không?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; Dùng 7 ngày là dừng hay sao hả bạn?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; Dùng 7 ngày là vứt đi hả bạn?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; Dùng liên tục hàng ngày hả bạn?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">&gt;&gt; Pin sạc hay cục?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">Trả lời:</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\t2 ống gel trong bộ kit dùng trong liệu trình 7-10 ngày. Còn máy dùng được đến 5 năm</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tChỉ cần sử dụng 7 ngày là bật tông, không cần dùng quanh năm như kem đánh răng</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tĐộ trắng giữ được 3-6 tháng hoặc tới 1 năm tuỳ vào men răng và cách sinh hoạt, đánh răng</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tKhi nào răng xuống tone mua thêm gel về dùng tiếp, không phải mua cả bộ </span></p><p><br></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Smilee là bộ bộ tẩy trắng răng tại nhà tiện lợi và an toàn nhất trên thị trường Việt Nam hiện nay. Sản phẩm được nghiên cứu và kiểm nghiệm kĩ lưỡng trong nhiều năm với những chuyên gia nghiên cứu dày dặn kinh nghiệm tại Mỹ. Được hiệp hội nha khoa Hoa Kỳ đồng ý và phê duyệt phân phối.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Hàng trăm Beauty Blogger và hàng nghìn người tiêu dùng Việt Nam đã sử dụng Kit tẩy trắng răng tại nhà Smilee để tự làm trắng răng tại nhà chỉ với 20 phút mỗi ngày. Răng của bạn sẽ trắng đều lên từ 3 đến 6 tone !</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????SẢN PHẨM CAM KÊT LÀM TRẮNG RĂNG NHƯ MÔ TẢ, HOÀN TIỀN 100% NẾU KHÔNG TRẮNG.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">Quá đơn giản phải không nào, nhưng đây là bí kíp làm trắng răng tại nhà đang HOT nhất hiện nay của các Beauty Blogger Việt Nam nổi tiếng như Ribi sachi - Faptv , My20s, Meichan, Quỳnh Thie, Trinh Meow, Hương Witch, Kiều Trinh, Khánh Vy,...</span></p><p><br></p><p><br></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);"> </span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">#taytrangrangsmilee #lamtrangrangsmilee #smileemax #smileetrangrang #crest #miengdantrangrangcrest</span></p><h1><span style="color: rgba(0, 0, 0, 0.8);">#taytrangrang #lamtrangrang #miengdantrangrang #taytrangrangtainha #thuoctaytrangrang #taytrangrangsmilee #kitsmilee #taytrangrangantoan #tayrang #trangrang #lamtranrangtainha #taytrangrang #bolamtrangrang #smilee #smileemax #smileetrangrang  #smilee #trangrang</span></h1>',
          title: 'Áo thun nam',
          numberOfStar: 5,
          address: 'Đình Cả, Nội Duệ , Tiên Du, Bắc Ninh',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9HF7GHiAl5L-o4SHFzCacQlTk6GoymHHtsg&usqp=CAU',
          selled: 5
        },
        {
          id: 3,
          name: 'Áo vest nữ 2 lớp - Áo blazer trơn kẻ tông màu lạ',
          idCategory: 7,
          idUser: 4,
          quantity: 99,
          discount: 10,
          price: 280000,
          description: '<p><span style="color: rgba(0, 0, 0, 0.8);">????Bộ tẩy trắng răng tại nhà Smilee - Nhập khẩu USA - Làm trắng răng lên từ 3 - 6 tone chỉ với 20 phút | Cam kết hoàn tiền 100% nếu không trắng !</span></p><p><span style="color: rgba(0, 0, 0, 0.8);"><span class="ql-cursor">﻿</span></span></p><p><span style="color: rgba(0, 0, 0, 0.8);">⭐⭐⭐⭐⭐</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">✔Bạn đang có hàm răng vàng ố ?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">✔Bạn e ngại với mọi người mỗi khi nở nụ cười ?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">✔Bạn ngại vào nha khoa ?</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Tất cả vấn đề trên sẽ được giải quyết với Kit tẩy trắng răng Smilee.</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">???? Smilee là bộ bộ tẩy trắng răng tại nhà tiện lợi và an toàn nhất trên thị trường Việt Nam hiện nay. Sản phẩm được nghiên cứu và kiểm nghiệm kĩ lưỡng trong nhiều năm với những chuyên gia nghiên cứu dày dặn kinh nghiệm tại Mỹ. Được hiệp hội nha khoa Hoa Kỳ đồng ý và phê duyệt phân phối.</span></p><p><br></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">Hàng trăm Beauty Blogger và hàng nghìn người tiêu dùng Việt Nam đã sử dụng Kit tẩy trắng răng tại nhà Smilee để tự làm trắng răng tại nhà chỉ với 20 phút mỗi ngày. Răng của bạn sẽ trắng đều lên từ 3 đến 6 tone !</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Sản phẩm cam kết làm trắng như mô tả, hoàn tiền 100% nếu không trắng.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Bộ sản phẩm bao gồm:</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\t2 ỐNG GEL: Với hoạt chất làm trắng chính là baking soda và những dưỡng chất tự nhiên, giúp bạn có thể thoải mái làm trắng răng mà không sợ ê buốt</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tKHUÔN DẺO: Được thiết kế vừa vặn với khuôn miệng với chất liệu silicon y tế mềm dẻo, không gây khó chịu khi đeo</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tĐÈN LED: Kích hoạt các hợp chất trong gel tăng cường tốc độ hoạt động giúp thời gian đeo máng giảm xuống</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Với công dụng vượt trội:</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tLoại bỏ các vết ố vàng trên răng, giúp răng trắng sáng tự nhiên</span></p><p><br></p><p>-\tC<span style="color: rgba(0, 0, 0, 0.8);">ung cấp dưỡng chất tự nhiên giúp bảo vệ men răng trong quá trình làm trắng.</span></p><p><br></p><p>-\tTrắng<span style="color: rgba(0, 0, 0, 0.8);"> răng chỉ sau 20 ph</span>út</p><p><br></p><p>-\tTrắng r<span style="color: rgba(0, 0, 0, 0.8);">ăng an toàn không gây ê bu</span>ốt</p><p><br></p><p><br></p><p>????Hiệu quả s<span style="color: rgba(0, 0, 0, 0.8);">ử dụng ưu việt:</span></p><p><br></p><p><br></p><p>-\tRăng trắn<span style="color: rgba(0, 0, 0, 0.8);">g bật 6 cấp độ</span></p><p><br></p><p>-\tThời gia<span style="color: rgba(0, 0, 0, 0.8);">n sử dụng chỉ với 20-25 phút mỗi ngày</span></p><p><br></p><p>-\tSử dụng<span style="color: rgba(0, 0, 0, 0.8);"> rất đơn giản tại nhà</span></p><p><br></p><p><br></p><p>????3 bước<span style="color: rgba(0, 0, 0, 0.8);"> sử dụng dễ dàng:</span></p><p><br></p><p>-\tGắn k<span style="color: rgba(0, 0, 0, 0.8);">huôn dẻo vào đèn LED và tra Gel vào khuôn dẻo</span></p><p><br></p><p>-\tBật <span style="color: rgba(0, 0, 0, 0.8);">đèn LED và ngậm khuôn để trong vòng 20 phút</span></p><p><br></p><p>-\tXúc<span style="color: rgba(0, 0, 0, 0.8);"> miệng sau khi sử dụng</span></p><p><br></p><p><br></p><p>Quá <span style="color: rgba(0, 0, 0, 0.8);">đơn giản phải không nào, nhưng đây là bí kíp làm trắng răng tại nhà đang HOT nhất hiện nay của các Beauty Blogger Việt Nam nổi tiếng như Ribi sachi - Faptv , My20s, Meichan, Quỳnh Thie, Trinh Meow, Hương Witch, Kiều Trinh, Khánh Vy,...</span></p><p><br></p><p><br></p><p><br></p><p>#la<span style="color: rgba(0, 0, 0, 0.8);">mtrangrang #taytrangrang #smilee #taytrangrangsmilee #kittaytrangrang #miengdantrangrang #trangrang #taytrangrangtainha #thanhoattinh #thuoctaytrangrang #tayrangsmilee #crest #kemdanhtrangrang #lamtrangrang #thuoctrangrang #maylamtrangrang #maylamtrangrangsmilee #maytaytrangrang #maytaytrangrangLED #taytrangrangantoan #trắng_răng #trangrang #trang_rang #tẩy_trắng_răng #tay_trang_smilee#taytrangrangsmil</span></p>',
          title: 'Áo vest nữ',
          numberOfStar: 2,
          address: 'Đình Cả, Nội Duệ , Tiên Du, Bắc Ninh',
          image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgVFRUYGBgYGBoYGBgYGBgYGBgYGBgZGRgYGBgcIS4lHB4rIRkYJjgmKy8xNTU1GiQ7QDs0Py41NTEBDAwMEA8QHhISHjQrJCE0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDE0QDQ0NDQxNDQ0NDQ0NDQ0NP/AABEIAP0AxwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAIDBAYBB//EAEIQAAIBAgMEBwUECAUFAQAAAAECAAMRBBIhBTFBcQYiMlFhgbETcpGhwSMzQrIUJDRSYoKS0QfC4fDxFUNzg9Ki/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAMCAQT/xAAiEQEBAAICAgICAwAAAAAAAAAAAQIRAzESISJBE1EEYXH/2gAMAwEAAhEDEQA/ALtbtt7x9Y+jG1u23vH1jqMguut2TMdgeHObB+yeR9Jj8CN0DTUT1G9xvQzPbCGpmgp/dv7jflMA7D3nygG9qfcP5fmEq7GHV85a2r9w38v5hK+xR1fOA3Fdtucs4YStiO23My1hhAfX4S9hHVVJYgAbyTYTOdItrCgAB1nI6q8LfvN4evpjq21nc9dyePEKOSjSal0eO3qi7YoHs1UNu5hOUduUHfIHGY7u48m3X8J5jdqgyopJOgFrm/hrO7S2ZVwjI5R1R1Um9zlYjrLe3eD5GaYsr2FJ2Yfoj0mDOKLtdW0RjvVuCk9x9ec3Igs0z/SjpB+jZaVJPa4mr93SAJ0/fYLrl0Pdex7iRc6M7cTGUFqqMrdl04o43jkd4Pce+8wG06WJp4+tQ09tjGVaWJY2yUGvmSmNwNrJpr1bDtAwp0FwSLjcR+ilhhqaLSdmJYVqy26w0sNQ503X00aw7pnbeVMUiuqM6K73yIWAZ7anKpN2t4RfpKZ/ZZ0z5c+TMM+S9s2Xfa/GYj/DzC1KlsVUp03Zy4bEPUd6/VLKFVCuVRw0I0+EBbPxWHOHw1cVAce2LUu+c+2KtUZSGF+yUCi27XxMaNvVUqozMiupZLZ1DAsmYXXMo1W41F4K230hoYaia7MXUPkAp2e73sy5h1VI1vcjdbfpMPt/CE4zF1EqVKbnE4XDko2W9PEUrVAe/si0s/s+ycWKdgExbouZVcZRXpqLhgQdBxEaNtf+gJiQKjVHem4BRBmpgKd1xo1/HQyqmxaeXPg6zIwJsy1Gq02ZTYq6szAi4se6QdJsW74mlgi5oUq6lmrDt1SD1qFM7kNrXJ33A8GKdG9jnC4cUMwbKzsCL2szFlGutwCJ113Y2NNZLsuSojNTqJvCVE7QB4qQQw8GEUZsenepinHZbEAL3E06NOm5/rV15qYpkDqvab3j6ySjI6vabmfWS0JNRYr9hvdPoZksFwmsxX3b+435TMpghqIGhH3T+435TAewhvhxvuX/APG3oYE2HuPOAa2t9w3NfzCQ7GHVHOTbY+4bmv5hI9jdkQIa3bbmfWW6G6VanaPM+s7jamShUbuRiOeUwPPds481qzvfQkhfBAbCV8JQao600GZmNh/eVnNheelf4ebB9mn6TUUZ3HUzfhTvt3mOo19tP0U6MphkUkBn/Ex7+4dwmjx+GSqhR0VlIsQQCLcpnf8ArlRWyo+Gcjel2R/I3OvOFsLtAumZkKEbweB58REynTtxryTph0e/QayVKd/ZOSLcUbeBfu005T0XYGO9tQRz2iLN7y6H47/OB+nmMw+Iw1RFqIaiDOFvYkoc1hffuIg7/DTG5kqUzwyMPMFT+UTsvtjKemh6T9H1xtHITldTmpVBvR/LWx4jkd4Es9HNjLg6C0V1y6u1rF3PaYj5DuAAhIRwm0wro1sj9Ew6UM+fIXObLlvndm3XPfbfBWH6GquFoYcuuajWWqagpgF8tRmyWvcaNa9zumqnRDmmaxnRb2lSrU9rb2mIw+IAyXy/o65St765rnXh4xuL6KF8JiMMKoBrV3rBstwuaqr5ct9dFte/GaeIzu3QvpBshMVRam2jdpHHaR17LqbjUcxcXEWGo4g0kSo6hwgV6q9tiBYlFtlUnfm193uJxWnBBQw6oqogsoFlHcB4nU8zFJyIoGSqdpuZ9ZLQkVTtNzPrJaEmonx33NT3G9DMtg94mn2ifsX9w+kzGD3iAfr/AHFT/wAbekD7DGh5wviv2d/cMD7E3ecAztf9nPNfzCR7G7Ikm1/uDzX8wjNjjqiBXbf5mV+kL5cNU90D4sB9ZZ4xbQwhq0XQb2Qhfet1fnA832RgzXrIpBKZ1DHwJ1+NjPesIEyBCAVta3C2608s6GGkQnVy1BdWuTclSN67u4941E9Lwz7ot9t4yaUKvQzDl86KENitxplBN7qN2YEkg2uLw+2EtRZV1Ogv56xIxI0Ivw5wWmKxKvlcIVL/AINAE8d92Hl5RdO+6xe1/wBKCVFrUKRQioBkRiVUISHLtv103CCv8Nan2xsdcgFuLdcaDkCW/lnpHSXGKmHqsw0Wm5PeTlIAHiTp5zA/4edHcQtRcSwFNACArXzuCtt3AbtT3bp3GfpzK+npqidAiE6JtAorR8baApyOtOwGRTtooHIp2KBkKnaPM+sloSJ+0eZ9ZLQk1Eu1D9g/uzM4PeJo9qn7B+Q9RM5ghqIB3G/s7+4fpBOxRp5wtjf2d/c+ogvYw0gFNrn7A+8v5hObJ7AnNtH7D+ZfWO2X2PI+kCsJfoiUFl+lugCkweXEMiCysPa3ue2W6wy997m/8QFha5P4TFcDIMIitVY7yFC8uNvSLE0NbiYy3vamHWhHH4I1U6pfMN2V2S44g5SLwDs3Z1anVDqzIovmVmzgjiATr8SZdpbRdJYqYmvVpu1JVzjQBja50Jt5HjxnPWXXa2PJcJcfWqWIC16opN1ggWq6ncTmIpg94zKzc0WGlE882dtCulVzUBLWysG0IW9wLHW2uhvx363ms2GajmyOwCkBldc4sQDcX1Gm4km95THL6Rz4rfexi8cDLmNwgVQy+Y4a90pCUec+KcE7AUUUUBRRRQOWnYooGOfeeZ9ZLQkLbzzk1ASahbYP2DeX5hM/gt4h7bZ+wPiV9YBwW+Abx/7O/uj1EG7F3QjtI/qz8h+YQdsbcIBHbZ+xHvr9Z3Z/Y/lPpLOOwXtEVMwXrBr2vuvwktHBqi5cxOluA+UpMMqnc8YErLJew0ls4VAN3xJ/4lSoLm81jx/tjLl/S7sOiMmfiz1GY99myA/BVHlL2Mp2nOjyXpkfuhh5lyfpLmMpEqtu4yOc7ejC+oBVKfHgIN2VtYYg1sIzmm2c+ydCVY5TqDrqbg6cQbcBCmPbKpHhczzMo+d2UkHO2t7EG9wQY4sd2u8uVkj0BKb4cj9IUP1riqRmDGwA37jbSx+e+ajZm1w4sCCLcOEw3R7pVUN6OJAcbgzDUjir8DztNJhsPQUE0gKbnW+Zjr3G5PVlPCzpn80vqtnh3DqVOt/SDK9LIxXu3eI4StsXaGtjoRoR3Q1jqOZcw3j5idl2zYFCOjI4TjLsUUUBRRRQFaKKKBjTvMnoSvxlihJqIdvH7H+YfWBsAOsIY6QH7Ie+PQwRgN8ArtY2wz/y/mEpbFAst9BxPhvMubb/AGdua+sH7Oa1O81jN1nK6lo42K3/ABkFXG+MEtWINr/8RjvcT0vKIpXZwesy2bQra+gG8G4INzofkdY4VTuJBPEgWv5Em3LXnINn7iOR9R9JKFsYcbDo2B7EW0IZrnvuxOvfvhJ0H+90G9F7eyPg59BC1VDwNj3iQynuvZhfjGb21s/NmKNv33Gg85gP+mlHcNwbhxJAJnrVSkbdY3OtzaYfG0gKjj+K/wAVEYY/Jzmy+LL46iwOZEJO82IAHM/2hjZuMYWU7go+GskelfSVfYkVDbcAB9frLPNsfo4rKyuDxs3iOB5j05TebNxAZRynleXO6oxIReu1jbNvAF+7QzZbG2pTpqS1RQinRswII4AHieHlMZY6u4rx5bmr9DWPw2U5h2T8jKYlLaHTOkbpSQvfTMxyJ5cT8otl4w1F61gw3gbreE5cbp3ym9L8UU4Zl0jFedjYDoo2KBjhJqMrrLFAyaiDpB90vvj0MEYA9aFekH3S++PQwVgO1AKbbP6uea+sG4RrUwO8n6f3hLbf7OfeX1gqibIvK/z/ANJTj7T5L8Tqy3FuI3GVKVckMp3htPMf3vJMWzL1xqOI7uUp0HuzG+hK2+EsgO4E2ZB3qR56MPrLjSgxysh7mUfHqn1hBhrOsodn9MlwmK/R64tRdFYOBrTdiyksOKnKPEb9156KlRWAZWDKwBBUggg7iCN4ngvTJf1n/wBSfmeVNm7YxOGFqGIdFP4QcyX3khGuAfG15LKe3oxy1HuPSjbtLBUDUqG5NwiA9Z2/dXw723ATzTotj3rpWq1Dd3rszW3aolgBwA3DwAmOxuIqVnL1Xeo53s7FjbU2F9w1Om4TTdCT1Ko/jU/Fbf5ZrGarOeW406gXjaaDM54X9AB9IljHqBU943+JvNogONYmo4Y2UWG4nOAFvu/CCT3XOklw1M6FkZRuQuRc8lFso3WAEGjaKl2CL1y7XZjm1zG1ltwG4Rzpdyzs7le0Sd17XCjdcXB/3pxoQ2i700zIQDcWJBYLrrcDfwmj6M7Sz00fMha+V8huLg2I8NNbeMz9JAVKh8ykaq2jAHfzhjYGz0pJYG9yCTYC+UWF7bz4wNwjggEbiJ0SnsurmQ+BI+ekuyVmqtLuFGmOjZx0ooooGKUy5h5TWWaBk1FfpB92vv8A0ME4DtQr0jbqJ730grZ/agFdufs/86/WDMMl18h6Qltz7ge+voYLd2VUVRrlBJ56j5WlOPtLl6MxFQKvW3bpS2WqkuVOgf8AyjSOxDs10cAE7u68g2AhDVFa3aU6dxFvpLIjeJN0Pf8AUQgHuAe8Xgn2g1lzAvmpjwuvwNvS0OVkOl7frP8A60/M8EAwh0vf9Z/9aerQOKkze1J0nLTRdCn61YeFM/nB+kypqQ90Mrfbuv71O/8AS6//AEYx7Mum0xD5UZu5T8baQTjqp6ovoAfS0ubSeyW/eZR8Dm+kE4p/Q+k1WJDsd0UajSp42m5ZGpo9VW7SM4UsyZRqnW1vqoF7nhTXF5XupDC5O+4Judx87fCet7PTLSpr3U0X4IBBO2+itDEkvrTc73QCzW0GdNx5ix8ZiZK3FgaO0Kd7Mjqd4KEZSL/usdCONoUw+2VQWW55i0s1egVUA5a6NxF1ZDfn1rfODaXQ7HFrEKBftXTdf3z6TXkx4tl0SxRqCo3AFQOdiT9PlNDBnR7ZYw1EU7hmuWdhexY919dBYa93CEryeV3VJNQ4zgnLxTjrpiivFAxSyxQMrAyxQk1EHSEfZp7/ANDBWz+1CnSFuonvH0gvAdqAT279wPfHo0pYYh08V0P0+Vpc6QfcJ74/K0GphXDZkNiAM19B5mV40uXqIMaygWO/hbfeUsECGd9dQiHkfaEH5fOXdo7XppvTM3hu+MqYHE+1o1nsBZ6agDwv/wDZlbUsYnB1lrY1XV08Qw8xY+g+MqLFhDkqKx3Hqnk2nraCs30vP60fcT6wPC/S/wDam9xPQwTM3tqdOGFuiNXLilH7ysvyDf5YKMtdH2tiqXvEfFWH1idl6brab9ZF8Cx9B9ZQrLcy0/Xdm4DqjkP9b/Gcw1O9RB3uo+LCaZj09RYW7tPhO3jbxCRWOvO3jTFeA68QjYrwHRTl4gYHbxThMUDGLLOHlZZYoSaip0gPUQfxH0g7Z/alzpGex/N9JU2X2hAK7WAyUr7vaAkd4Ck2gLaOHxL3JZVTfZSAAPEnfD22aIdFU95tztb6mZars2uhujtpxD/QmW456Q5L8lZEsDmq0ynFSytflbjCGz8KFwnV/wC5Vz8gOrb/APHzgyoD/wB1Kbd7NlDnzSxMJ0XbIipYKq3KAHQv1h4mylddTfNvvpu+9My62sUqOkjxqabjbvlvDEFZNpxnWWB6TuTiLnfkS/OxgyWtsV8+Jqt/GVHJOr9JWEzW4aZPsVrYilrbrAX8TcD5kSFpXZiDcGxBuCOBGoM4632xMU1QupCi1iAL5gDwcHjf6wnSQI6Mfwurf0sDINiOjItVFANRcz2t2/xeea8tVRc28/8ASb+k/tvAY4NBOw8TnphTvTq+X4flp5QmDJWLS7h+advI7xAzjqS8V5HeK8B+adBkZMQaA/NFGRQMkss0ZVEs0JNQN6RtqnJvUStsveJL0jPWT3T6yPZm8QCu1VJCAOykXN1tre28EEHdAeJpue2gqDvUlG/pOh+IhjEvduQtKddrAmenGaxjzZX5VnMTRpE2AZbdZlZSCFGrG+46dxhTZbB0DA672HEMdTccJRqrne373V/lUhn+JyD4yxVwpBDocrDiPqOMRy9aEFqDORxAF7d7a2PjYL8eUlxNYIjudyqW+AvKWBpZF1JLMSzE7yTxMq9LK+TDOB+IqvxNz8gZ017YSkSbk7ySTzOpk0homTTDZGVqiywWkVUHlzgaroRi7o9InVTmXk2hA8x84dxzkIWXetmHjlNyPMXHnMH0dxXs8QhvoxyNybT1t8J6FU3zc6Yy7Fej2PUPb8LgDk2tgfiR5zUXmEwy20mu2fis6AntDRuff5zOU+2sb9LwM7IrxwMyofaKNzRZoHYpwtFeA6KNvFAyQMsUTKiSzSkVAjpC3XUfwfUxbL4SPpA32i+4PUx+yjutvnXBKqNTBu0nssK1MJUA3huY1+VpmdvVmHUykE6Ag3Gunlx+EvjnjfURy4sp7qPZK5sznibLyB/uSYXQStgKGRFXuEtqJpK9uMJmOnGI0pU/eY/lHqZp2mE6TVc2IYfuhV+Vz+acreIalu6PUi+4HnGhBOHeJlpMWt3DwEgbWdIigVyCPCek7NxXtaKPxK9b3hofmDPOHE1nQzFXR6Z/Ccw5Nv8AmPnOxnKemqw41MJYDFZH8DoR6QWhtrJTUvaa0xLpoqe2KJ/HbmCJOu0aR3Ovxnn2OxALtlOnHuzcSPC8jWuZzxh+WvSVxKHc6/1CSBx3ieajEmPXGsOM54u/m/p6OGnSZ52NoONzsPMyRNrVB+Nv6jHi7+afp6BeKYVNvVR+M+dj6xTnjT8sW0MtUjKKNLdFpB6gTpA32o9wepk+xRdlHeQPnKW33+1/lX6y90b1qIP4gfhr9Jr6cnbdYqiMl+Inne0qZeuG/CPUG09B23XyUmY8AT8BMPggSvWB18J3Dt3lvrR4jxOovfu7+H+kcRLvIhqtYE8ALnynmlSrmdnP4mLfEkza9J8cEpFAeu4ygcbHtHw0mKQCcrWMLSNaSFBwkTrMtHRXnAZyA14R6NYjJiF7mup89R6QeY1GKkMN4II5jUQPVFW8HY7EZLoDqePcP7yLD7dRkBUguV1TuPG/hcwczkkknU6kzaGV16PvHq0hnZ1hL7SdvII7NAmDRFpAXnA8Cxmikd4oB9Hlqk8pIjcRa/f/AGlulT79Z55ja9mXLjiC7TpPUrHIpIsNeA07900PRvZ7JlckF8zKFvoAFGpNv4rf3klxb/iH9jbOGVXe+tyq3IsDx04mw+U7ljrH0cOfll/Sn0hxS5FBZB1gp1sbkgCwO/u84KVFXcbnx3Qp0m2ZTARte2DqdLghh81ED+k7xS69sfyr8p/ib2p3TyqltTEU7qKjCxIsbNYg2I6wNp6W5nnO2aOTEVV/jLeT9YfJpSo8V92KNV3dszsWY8Sbmc9n4yVbeETMo32mV0JUjjFcyU1E/wBiMZ04QGgTukYHEetTwgdtG5Y4tOQLuyu35H6Q3Auyh1+Sn1Ahm83j0hydnCPkWaOBnWDiY1jETGvA7aICRqSJKpgJYo4RQOrth95IMK4Ta2awOkyjHW0u4AXtznG7I9E6PYdarksbhdbd58fCan9LQNkv1rEzDdFi2ZyDuUf6ekk2fiHepWqubBbInfpcudPHKPKRzy96e7+NjPDYp0hxGZwt9FGvM/7+cCsYqtS5JJuSbk85EzyuM1Hh5svLK05mmN6XUrVVfg6W80Nj8is1jNAvSahno5hvRg3keqfUHynb0zx3WTIgCdA5HnOCdmHqdyjuHwkT0gZJmHfFcePwgVFHCSCcqjXda8Qhw8TsZHiAS2SnaPIet/pCB0lPAdVB43J/38JZLzc6Qy95HAmSrIA8kDzrCYGc3xoedQwE04DOkxggSKYoy/fFAoVl6x5y5s86ytV7XkPSW8GJmKZRq+j+KyMUJAzAdbute3hxlrEKiJlB62YbhYWKBrkd+o+e/fAmBXM6qdxcDyJAhbaVQlrNqQ7rfdoPnvN9/wAZLLH5R6MOTXFZ+tq5acJkd4ry7xETK2IswKtqGBBHgRYyR2lbffhDkYqvRKsVbepI524+e+NCiFekFELUUj8S68xpf4W+EFzFevG7mzgIrmIGczE8ZxpDiRu75Gpk9dABb5yBYcPEeIwSRIBSm6gAdwtHF/GUEeSTW0ritZ7SZX8YPvOo5EbZ8V/PHrUlE1DOrUM7s8V9HnQZRFUx61DDml0tFKoqGKHNP//Z',
          selled: 8
        },
        {
          id: 4,
          name: 'Máy ảnh Canon EOS 80D 18-55MM 3.5-5.6 IS STM',
          idCategory: 5,
          idUser: 4,
          quantity: 99,
          discount: 10,
          price: 14500000,
          description: '<p><span style="color: rgba(0, 0, 0, 0.8);">????Bộ tẩy trắng răng tại nhà Smilee - Nhập khẩu USA - Làm trắng răng lên từ 3 - 6 tone chỉ với 20 phút | Cam kết hoàn tiền 100% nếu không trắng !</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">⭐⭐⭐⭐⭐</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">✔Bạn đang có hàm răng vàng ố ?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">✔Bạn e ngại với mọi người mỗi khi nở nụ cười ?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">✔Bạn ngại vào nha khoa ?</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Tất cả vấn đề trên sẽ được giải quyết với Kit tẩy trắng răng Smilee.</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">???? Smilee là bộ bộ tẩy trắng răng tại nhà tiện lợi và an toàn nhất trên thị trường Việt Nam hiện nay. Sản phẩm được nghiên cứu và kiểm nghiệm kĩ lưỡng trong nhiều năm với những chuyên gia nghiên cứu dày dặn kinh nghiệm tại Mỹ. Được hiệp hội nha khoa Hoa Kỳ đồng ý và phê duyệt phân phối.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">Hàng trăm Beauty Blogger và hàng nghìn người tiêu dùng Việt Nam đã sử dụng Kit tẩy trắng răng tại nhà Smilee để tự làm trắng răng tại nhà chỉ với 20 phút mỗi ngày. Răng của bạn sẽ trắng đều lên từ 3 đến 6 tone !</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Sản phẩm cam kết làm trắng như mô tả, hoàn tiền 100% nếu không trắng.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Bộ sản phẩm bao gồm:</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\t2 ỐNG GEL: Với hoạt chất làm trắng chính là baking soda và những dưỡng chất tự nhiên, giúp bạn có thể thoải mái làm trắng răng mà không sợ ê buốt</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tKHUÔN DẺO: Được thiết kế vừa vặn với khuôn miệng với chất liệu silicon y tế mềm dẻo, không gây khó chịu khi đeo</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tĐÈN LED: Kích hoạt các hợp chất trong gel tăng cường tốc độ hoạt động giúp thời gian đeo máng giảm xuống</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Với công dụng vượt trội:</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tLoại bỏ các vết ố vàng trên răng, giúp răng trắng sáng tự nhiên</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tCung cấp dưỡng chất tự nhiên giúp bảo vệ men răng trong quá trình làm trắng.</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tTrắng răng chỉ sau 20 phút</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tTrắng răng an toàn không gây ê buốt</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Hiệu quả sử dụng ưu việt:</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tRăng trắng bật 6 cấp độ</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tThời gian sử dụng chỉ với 20-25 phút mỗi ngày</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tSử dụng rất đơn giản tại nhà</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????3 bước sử dụng dễ dàng:</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tGắn khuôn dẻo vào đèn LED và tra Gel vào khuôn dẻo</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tBật đèn LED và ngậm khuôn để trong vòng 20 phút</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tXúc miệng sau khi sử dụng</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">Quá đơn giản phải không nào, nhưng đây là bí kíp làm trắng răng tại nhà đang HOT nhất hiện nay của các Beauty Blogger Việt Nam nổi tiếng như Ribi sachi - Faptv , My20s, Meichan, Quỳnh Thie, Trinh Meow, Hương Witch, Kiều Trinh, Khánh Vy,...</span></p><p><br></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">#lamtrangrang #taytrangrang #smilee #taytrangrangsmilee #kittaytrangrang #miengdantrangrang #trangrang #taytrangrangtainha #thanhoattinh #thuoctaytrangrang #tayrangsmilee #crest #kemdanhtrangrang #lamtrangrang #thuoctrangrang #maylamtrangrang #maylamtrangrangsmilee #maytaytrangrang #maytaytrangrangLED #taytrangrangantoan #trắng_răng #trangrang #trang_rang #tẩy_trắng_răng #tay_trang_smilee#taytrangrangsmil</span></p>',
          title: 'Camera',
          numberOfStar: 3,
          address: 'Đình Cả, Nội Duệ , Tiên Du, Bắc Ninh',
          image: 'https://www.mega-ks.com/wp-content/uploads/2017/09/CANON-EOS-80D-BODY-WITH-EF-S-18-55MM-IS-STM-1.jpg',
          selled: 5
        },
        {
          id: 5,
          name: 'Apple iPhone 12 mini 64GB',
          idCategory: 2,
          idUser: 3,
          quantity: 99,
          discount: 10,
          price: 14500000,
          description: '<p><span style="color: rgba(0, 0, 0, 0.8);">????Bộ tẩy trắng răng tại nhà Smilee - Nhập khẩu USA - Làm trắng răng lên từ 3 - 6 tone chỉ với 20 phút | Cam kết hoàn tiền 100% nếu không trắng !</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">⭐⭐⭐⭐⭐</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">✔Bạn đang có hàm răng vàng ố ?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">✔Bạn e ngại với mọi người mỗi khi nở nụ cười ?</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">✔Bạn ngại vào nha khoa ?</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Tất cả vấn đề trên sẽ được giải quyết với Kit tẩy trắng răng Smilee.</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">???? Smilee là bộ bộ tẩy trắng răng tại nhà tiện lợi và an toàn nhất trên thị trường Việt Nam hiện nay. Sản phẩm được nghiên cứu và kiểm nghiệm kĩ lưỡng trong nhiều năm với những chuyên gia nghiên cứu dày dặn kinh nghiệm tại Mỹ. Được hiệp hội nha khoa Hoa Kỳ đồng ý và phê duyệt phân phối.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">Hàng trăm Beauty Blogger và hàng nghìn người tiêu dùng Việt Nam đã sử dụng Kit tẩy trắng răng tại nhà Smilee để tự làm trắng răng tại nhà chỉ với 20 phút mỗi ngày. Răng của bạn sẽ trắng đều lên từ 3 đến 6 tone !</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Sản phẩm cam kết làm trắng như mô tả, hoàn tiền 100% nếu không trắng.</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Bộ sản phẩm bao gồm:</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\t2 ỐNG GEL: Với hoạt chất làm trắng chính là baking soda và những dưỡng chất tự nhiên, giúp bạn có thể thoải mái làm trắng răng mà không sợ ê buốt</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tKHUÔN DẺO: Được thiết kế vừa vặn với khuôn miệng với chất liệu silicon y tế mềm dẻo, không gây khó chịu khi đeo</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tĐÈN LED: Kích hoạt các hợp chất trong gel tăng cường tốc độ hoạt động giúp thời gian đeo máng giảm xuống</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Với công dụng vượt trội:</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tLoại bỏ các vết ố vàng trên răng, giúp răng trắng sáng tự nhiên</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tCung cấp dưỡng chất tự nhiên giúp bảo vệ men răng trong quá trình làm trắng.</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tTrắng răng chỉ sau 20 phút</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tTrắng răng an toàn không gây ê buốt</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Hiệu quả sử dụng ưu việt:</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tRăng trắng bật 6 cấp độ</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tThời gian sử dụng chỉ với 20-25 phút mỗi ngày</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tSử dụng rất đơn giản tại nhà</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">????3 bước sử dụng dễ dàng:</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tGắn khuôn dẻo vào đèn LED và tra Gel vào khuôn dẻo</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tBật đèn LED và ngậm khuôn để trong vòng 20 phút</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">-\tXúc miệng sau khi sử dụng</span></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">Quá đơn giản phải không nào, nhưng đây là bí kíp làm trắng răng tại nhà đang HOT nhất hiện nay của các Beauty Blogger Việt Nam nổi tiếng như Ribi sachi - Faptv , My20s, Meichan, Quỳnh Thie, Trinh Meow, Hương Witch, Kiều Trinh, Khánh Vy,...</span></p><p><br></p><p><br></p><p><span style="color: rgba(0, 0, 0, 0.8);">#lamtrangrang #taytrangrang #smilee #taytrangrangsmilee #kittaytrangrang #miengdantrangrang #trangrang #taytrangrangtainha #thanhoattinh #thuoctaytrangrang #tayrangsmilee #crest #kemdanhtrangrang #lamtrangrang #thuoctrangrang #maylamtrangrang #maylamtrangrangsmilee #maytaytrangrang #maytaytrangrangLED #taytrangrangantoan #trắng_răng #trangrang #trang_rang #tẩy_trắng_răng #tay_trang_smilee#taytrangrangsmil</span></p>',
          title: 'Điện thoại Apple',
          numberOfStar: 3,
          address: 'Đình Cả, Nội Duệ , Tiên Du, Bắc Ninh',
          image: 'https://i-techbd.com/wp-content/uploads/2019/12/Samsung-Galaxy-S15-.jpg',
          selled: 4
        },
        {
          id: 6,
          name: 'Samsung Galasy s15',
          idCategory: 2,
          idUser: 3,
          quantity: 99,
          discount: 10,
          price: 12000000,
          description: '<p><span style="color: rgba(0, 0, 0, 0.8);">???? Bộ kít làm trắng răng Smilee được nghiên cứu và sản xuất theo tiến trình khoa học công nghệ Hoa Kỳ,  đạt chuẩn ISO: 22716 - 2017</span></p><p><span style="color: rgba(0, 0, 0, 0.8);">????Sử dụng Baking soda dạng gel thay vì Baking soda dạng bột truyền thống để nâng cao hiệu quả làm trắng , đồng thời bảo vệ men răng trước tẩy trắng trong Baking soda thông thường. ????Bộ tẩy trắng</span></p>',
          title: 'Điện thoại Samsung',
          numberOfStar: 3,
          address: 'Đình Cả, Nội Duệ , Tiên Du, Bắc Ninh',
          image: 'https://i-techbd.com/wp-content/uploads/2019/12/Samsung-Galaxy-S15-.jpg',
          selled: 20
        }
      ]
    }
  },
  created () {
    this.getListCategory()
    this.getListProduct()
  },
  methods: {
    getListCategory () {
      this.listCategory = [
        {
          id: 1,
          original_category_name: 'Thời Trang Nam',
          image: 'https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn'
        },
        {
          id: 2,
          original_category_name: 'Điện Thoại & Phụ Kiện',
          image: 'https://cf.shopee.vn/file/31234a27876fb89cd522d7e3db1ba5ca_tn'
        },
        {
          id: 3,
          original_category_name: 'Thiết Bị Điện Tử',
          image: 'https://cf.shopee.vn/file/978b9e4cb61c611aaaf58664fae133c5_tn'
        },
        {
          id: 4,
          original_category_name: 'Máy tính & Laptop',
          image: 'https://cf.shopee.vn/file/c3f3edfaa9f6dafc4825b77d8449999d_tn'
        },
        {
          id: 5,
          original_category_name: 'Máy ảnh - Máy quay phim',
          image: 'https://cf.shopee.vn/file/ec14dd4fc238e676e43be2a911414d4d_tn'
        },
        {
          id: 6,
          original_category_name: 'Đồng Hồ',
          image: 'https://cf.shopee.vn/file/86c294aae72ca1db5f541790f7796260_tn'
        },
        {
          id: 7,
          original_category_name: 'Thời Trang Nữ',
          image: 'https://cf.shopee.vn/file/75ea42f9eca124e9cb3cde744c060e4d_tn'
        },
        {
          id: 8,
          original_category_name: 'Giày Dép Nữ',
          image: 'https://cf.shopee.vn/file/48630b7c76a7b62bc070c9e227097847_tn'
        },
        {
          id: 9,
          original_category_name: 'Túi Ví',
          image: 'https://cf.shopee.vn/file/fa6ada2555e8e51f369718bbc92ccc52_tn'
        },
        {
          id: 10,
          original_category_name: 'Thiết Bị Điện Gia Dụng',
          image: 'https://cf.shopee.vn/file/7abfbfee3c4844652b4a8245e473d857_tn'
        },
        {
          id: 11,
          original_category_name: 'Thể Thao & Du Lịch',
          image: 'https://cf.shopee.vn/file/6cb7e633f8b63757463b676bd19a50e4_tn'
        },
        {
          id: 12,
          original_category_name: 'Giày Dép Nam',
          image: 'https://cf.shopee.vn/file/74ca517e1fa74dc4d974e5d03c3139de_tn'
        },
        {
          id: 13,
          original_category_name: 'Ô tô -xe máy - xe đạp',
          image: 'https://cf.shopee.vn/file/3fb459e3449905545701b418e8220334_tn'
        },
        {
          id: 14,
          original_category_name: 'Mẹ & Bé ',
          image: 'https://cf.shopee.vn/file/099edde1ab31df35bc255912bab54a5e_tn'
        },
        {
          id: 15,
          original_category_name: 'Nhà Cửa & Đời Sống',
          image: 'https://cf.shopee.vn/file/24b194a695ea59d384768b7b471d563f_tn'
        },
        {
          id: 16,
          original_category_name: 'Sức Khỏe & Sắc Đẹp ',
          image: 'https://cf.shopee.vn/file/bba68b7dc2d664748dd075d500049d72_tn'
        },
        {
          id: 18,
          original_category_name: 'Phụ Kiện Thời Trang',
          image: 'https://cf.shopee.vn/file/8e71245b9659ea72c1b4e737be5cf42e_tn'
        },
        {
          id: 19,
          original_category_name: 'Bách Hóa Online',
          image: 'https://cf.shopee.vn/file/c432168ee788f903f1ea024487f2c889_tn'
        }
      ]
    },
    getListProduct () {
      this.loadingListProduct = true
      this.listProduct = [...this.products]
      this.loadingListProduct = false
    },
    handleWatchMore () {
      console.log('handleWatchMore')
      this.loadingListProduct = true
      this.listProduct = this.listProduct.concat(this.products)
      this.loadingListProduct = false
    }
  }
}
</script>

<style scoped>
.home-produce {
  margin-bottom: 20px;
}
.btn-watch-more-product {
  display: block;
  margin: 0 auto !important;
}
</style>
