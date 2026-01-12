import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

import { PiFacebookLogoLight } from "react-icons/pi";
import { PiInstagramLogoLight } from "react-icons/pi";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { RiPinterestLine } from "react-icons/ri";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx("container", "footer-container")}>
      <div className={cx("grid", "footer-grid")}>
        <div className={cx("row", "footer-row")}>
          <div className={cx("about", "col-4", "footer-item")}>
            <h4 className={cx("title")}>Về phucchau pharma</h4>
            <p>
  Chào mừng bạn đến với PhucChau Pharma – đơn vị chuyên cung cấp các sản phẩm
  thực phẩm chức năng chất lượng cao, hỗ trợ chăm sóc và nâng cao sức khỏe
  toàn diện. Chúng tôi cam kết mang đến những giải pháp an toàn, hiệu quả,
  có nguồn gốc rõ ràng, giúp bạn và gia đình sống khỏe mỗi ngày.
</p>
          </div>
          <div className={cx("contact", "col-3", "footer-item")}>
            <h4 className={cx("title")}>Liên hệ</h4>
            <p>Hno: 126 Nguyen Van Thuong, P25, Binh Thanh Ditrict, HCM</p>
            <ul>
              <li>
                <Link to={"/"} className={cx("footer-link")}>
                  +84 0357929230
                </Link>
              </li>
              <li>
                <Link to={"/"} className={cx("footer-link")}>
                  abc@gmail.com
                </Link>
              </li>
            </ul>
          </div>
          <div className={cx("help", "col-3", "footer-item")}>
            <h4 className={cx("title")}>Hỗ trợ</h4>
            <ul>
              <li>
                <Link to={"/about"} className={cx("footer-link")}>
                  Hướng dẫn mua hàng
                </Link>
              </li>
              <li>
                <Link to={"/about"} className={cx("footer-link")}>
                  Bảo hành đổi và trả
                </Link>
              </li>
              <li>
                <Link to={"/about"} className={cx("footer-link")}>
                  Thông tin liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div className={cx("social", "col-2", "footer-item")}>
            <h4 className={cx("title")}>Theo dõi</h4>
            <ul>
              <li>
                <Link to={"/"} className={cx("social-link")}>
                  <PiFacebookLogoLight className={cx("social-icon")} />
                  <span className={cx("footer-link")}>Facebook</span>
                </Link>
              </li>
              <li>
                <Link to={"/"} className={cx("social-link")}>
                  <PiInstagramLogoLight className={cx("social-icon")} />
                  <span className={cx("footer-link")}>Intagram</span>
                </Link>
              </li>
              <li>
                <Link to={"/"} className={cx("social-link")}>
                  <PiYoutubeLogoLight className={cx("social-icon")} />
                  <span className={cx("footer-link")}>Youtube</span>
                </Link>
              </li>
              <li>
                <Link to={"/"} className={cx("social-link")}>
                  <RiPinterestLine className={cx("social-icon")} />
                  <span className={cx("footer-link")}>Pinterest</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={cx("row")}>
          <div className={cx("col-12", "footer-all-rights")}>
            @2025 PhucChau Pharma. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
