<template>
  <div class="footer-auth">
    <div class="footer pb-50">
      <div class="grid wide footer__content">
        <div class="row-lbr">
          <div class="col-lbr l-2-4 m-4 c-6-lbr">
            <h3 class="footer__heading mt-50">Chăm sóc khách hàng</h3>
            <ul class="footer-list">
              <li class="footer-item">
                <a href="#" class="footer-item__link">Trung tâm trợ giúp</a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-item__link">F8 Shop Mall</a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-item__link">Hướng dẫn mua hàng</a>
              </li>
            </ul>
          </div>
          <div class="col-lbr l-2-4 m-4 c-6-lbr">
            <h3 class="footer__heading mt-50">Giới thiệu</h3>
            <ul class="footer-list">
              <li class="footer-item">
                <a href="#" class="footer-item__link">Giới thiệu</a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-item__link">Tuyển dụng</a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-item__link">Điều khoản</a>
              </li>
            </ul>
          </div>
          <div class="col-lbr l-2-4 m-4 c-6-lbr">
            <h3 class="footer__heading mt-50">Danh mục</h3>
            <ul class="footer-list">
              <li class="footer-item">
                <a href="#" class="footer-item__link">Trang điểm mặt</a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-item__link">Trang điểm mắt</a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-item__link">Trang điểm môi</a>
              </li>
            </ul>
          </div>
          <div class="col-lbr l-2-4 m-4 c-6-lbr">
            <h3 class="footer__heading mt-50">Theo dõi</h3>
            <ul class="footer-list">
              <li class="footer-item">
                <a href="#" class="footer-item__link footer-item__link-facebook">
                  <i class="footer-item__icon fab fa-facebook"></i>
                  Facebook
                </a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-item__link">
                  <i class="footer-item__icon fab fa-instagram-square"></i>
                  Instagram
                </a>
              </li>
              <li class="footer-item">
                <a href="#" class="footer-item__link">
                  <i class="footer-item__icon fab fa-linkedin"></i>
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
          <div class="col-lbr l-2-4 m-8 c-12-lbr">
            <h3 class="footer__heading mt-50">Vào cửa hàng trên ứng dụng</h3>
            <div class="footer__download">
              <img src="@/assets/img/QR.png" alt="Max QR" class="footer__download-qr" />
              <div class="footer__download-apps">
                <a href="#" class="footer__download-app-link">
                  <img src="@/assets/img/AppStore.png" alt="App Store" class="footer__download-app-img" />
                </a>

                <a href="#" class="footer__download-app-link">
                  <img src="@/assets/img/GooglePlay.png" alt="Google Play" class="footer__download-app-img" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer__bottom mb-50">
        <div class="grid wide">
          <p class="footer__text font-black">© bản quyền thuộc về Nguyễn Cao Thìn</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// require('@/assets/css/grid.scss')
// require('@/assets/css/component/footer.scss')
export default {
  name: 'FooterAuth',
  data () {
    return {}
  }
}
</script>

<style>
.footer-auth {
  background-color: rgb(245, 245, 245);
}
.footer {
  padding-top: 30px;
}
</style>
