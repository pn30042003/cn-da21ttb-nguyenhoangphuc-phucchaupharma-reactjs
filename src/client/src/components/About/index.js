import classNames from "classnames/bind";
import styles from "./About.module.scss";
import images from "../../assets/images";

const cx = classNames.bind(styles);

function About() {
  return (
    <div className={cx("container")}>
      <div className={cx("grid", "grid-container")}>
        <div className={cx("row")}>
          <div className={cx("col-12", "flex-center")}>
            <h2>GIỚI THIỆU VÀ HƯỚNG DẪN</h2>
          </div>
        </div>
        {/* Giới thiệu */}
        <div className={cx("row")}>
          <div className={cx("col-12")}>
            <h3 className={cx("title")}>1. VỀ CHÚNG TÔI</h3>
            <p className={cx("text-des")}>
              &nbsp;&nbsp;PhucChau Pharma tự hào là đơn vị uy tín trong lĩnh vực phân
               phối và bán lẻ thực phẩm chức năng – sản phẩm chăm sóc sức khỏe tại Việt Nam.
                Được thành lập từ năm 2023, chúng tôi mang trong mình sứ mệnh nâng cao chất lượng
                 cuộc sống cộng đồng thông qua việc cung cấp những giải pháp hỗ trợ sức khỏe an toàn,
                  hiệu quả và đáng tin cậy.
              <br />
              &nbsp;&nbsp;Với định hướng lấy sức khỏe khách hàng làm trung tâm, PhucChau Pharma không 
              ngừng tìm kiếm và phân phối đa dạng các dòng sản phẩm có nguồn gốc rõ ràng,
               được kiểm định chất lượng nghiêm ngặt. Chúng tôi mong muốn không chỉ là nơi 
               mua sắm, mà còn là người bạn đồng hành trên hành trình chăm sóc sức khỏe lâu 
               dài của bạn và gia đình.
              <br />
              &nbsp;&nbsp;Chất lượng dịch vụ tại PhucChau Pharma không chỉ là một cam kết,
               mà còn là lời hứa về sự minh bạch, tận tâm và chuyên nghiệp trong từng khâu tư
                vấn – bán hàng – hậu mãi. Chúng tôi luôn lắng nghe, thấu hiểu và sẵn sàng hỗ trợ
                 khách hàng lựa chọn sản phẩm phù hợp nhất với nhu cầu sức khỏe cá nhân.
                  <br />
              &nbsp;&nbsp;PhucChau Pharma cam kết chỉ cung cấp sản phẩm chính hãng, tôn
               trọng quyền lợi khách hàng và giá trị khoa học của nhà sản xuất. Chúng tôi 
               hướng tới việc xây dựng một hệ sinh thái chăm sóc sức khỏe bền vững, nơi niềm
                tin và chất lượng luôn được đặt lên hàng đầu.
            </p>
          </div>
        </div>
        {/* Hướng đẫn mua hàng*/}
        <div className={cx("row")}>
          <div className={cx("col-12")}>
            <h3 className={cx("title")}>
              2. HƯỚNG DẪN MUA HÀNG ONLINE QUA WEBSITE
            </h3>
            <p className={cx("text-des")}>
              Bước 1: Truy cập website PhucChau Pharma
              <br />
              Bước 2: Tìm kiếm sản phẩm cần mua, chọn số lượng
              <br />
              Bước 3: Đặt hàng <br />– Thêm sản phẩm vào giỏ hàng và nhấn thanh
              toán
              <br />– Điền đầy đủ thông tin mua hàng theo yêu cầu <br />– Nhấn
              đặt hàng để hoàn tất <br />– Kiểm tra email để xem chi tiết đơn
              hàng
            </p>
          </div>
        </div>
        {/* Bảo hành */}
        <div className={cx("row")}>
          <div className={cx("col-12")}>
            <h3 className={cx("title")}>3. BẢO HÀNH VÀ ĐỔI TRẢ</h3>
            <p className={cx("text-des")}>
              Khách hàng ở xa có thể được hỗ trợ phí ship đổi trả.
              <br />
              Khách hàng đến trực tiếp cửa hàng sẽ được giải quyết đổi trả ngay
              lập tức.
              <br />
              Chi tiết, vui lòng đọc tại chính sách đổi trả.
            </p>
          </div>
        </div>
        {/* Thông tin */}
        <div className={cx("row")}>
          <div className={cx("col-6")}>
            <h3 className={cx("title")}>5. THÔNG TIN LIÊN HỆ </h3>
            <p className={cx("text-des")}>
              Địa chỉ: 126 Nguyễn Thiện Thành, Phường 5, Trà Vinh
              <br /> Hotline: 0357550228
              <br /> Email: PhucChauPharma@gmail.com
              <br /> Mở cửa:
              <br /> T2 – T7: 11:00 ~ 21:00
              <br /> CN: 14:00 ~ 20:00
            </p>
          </div>

          <div className={cx("col-6")}>
            {" "}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15720.504546942351!2d106.3465193!3d9.9234516!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0175ea296facb%3A0x55ded92e29068221!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBUcsOgIFZpbmg!5e0!3m2!1svi!2s!4v1703329265825!5m2!1svi!2s"
              className={cx("map")}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
