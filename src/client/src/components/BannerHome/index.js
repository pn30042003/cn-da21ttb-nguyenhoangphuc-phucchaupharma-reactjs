import classNames from "classnames/bind";
import styles from "./BannerHome.module.scss";
import images from "../../assets/images";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
const cx = classNames.bind(styles);

const img = [images.ovanicvn, images.top_10];

function BannerHome() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 7000);

    return () => clearInterval(interval);
  }, [currentImage]);

  const prevImage = () => {
    currentImage == 0
      ? setCurrentImage(img.length - 1)
      : setCurrentImage(currentImage - 1);
  };

  const nextImage = () => {
    currentImage == img.length - 1
      ? setCurrentImage(0)
      : setCurrentImage(currentImage + 1);
  };
  return (
    <div className={cx("container")}>
      <div className={cx("grid", "banner-grid")}>
        <div className={cx("row")}>
          <div className={cx("col-12", "banner")}>
            <img
              className={cx("banner-img")}
              src={img[currentImage]}
              alt="banner"
            />
            <MdKeyboardDoubleArrowLeft
              className={cx("btn-prev-slide")}
              onClick={prevImage}
            >
              Quay lại
            </MdKeyboardDoubleArrowLeft>
            <MdKeyboardDoubleArrowRight
              className={cx("btn-next-slide")}
              onClick={nextImage}
            >
              Tiếp theo
            </MdKeyboardDoubleArrowRight>

            {/* <div className={cx("banner-describe")}>
            <h2 className={cx('banner-tittle')}>New product line Nike classic</h2>
            <Link to={'products'} className={cx('banner-btn')}>Buy now</Link>
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerHome;
