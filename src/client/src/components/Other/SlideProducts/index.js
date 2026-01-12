import classNames from "classnames/bind";
import styles from "./SlideShowProducts.module.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoMdArrowForward } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";

const cx = classNames.bind(styles);
function SlideShowProducts({ products_props, title }) {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(1);
  const productsPerSlide = 4; //số sản phẩm trên 1 slide
  const totalSlide = Math.ceil(products.length / productsPerSlide); //Tổng số slide = số lượng sản phẩm / số sản phẩm trên 1 slide

  useEffect(() => {
    if (products_props) {
      setProducts(products_props);
    } else {
      fetchProducts();
    }
  }, [products_props]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://${process.env.REACT_APP_API_URL}/products/random`);
      setProducts(response.data);
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) => Math.min(prevSlide + 1, totalSlide)); //Slide hiện tại mà > tổng slide thì thấy tổng slide
  };

  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 1));
  };

  const startIndex = (currentSlide - 1) * productsPerSlide;
  const visibleProducts = products.slice(
    startIndex,
    startIndex + productsPerSlide
  );

  return (
    <>
      <div className={cx("row")}>
        <div className={cx("col-12")}>
          <h2 className={cx("title-slide-show")}>
            {title ? title : "MỘT SỐ SẢN PHẨM KHÁC"}
          </h2>
        </div>
      </div>
      <div className={cx("row", "products-slideshow-container")}>
        <button
          onClick={handlePrevClick}
          //   disabled={currentSlide === 1}
          className={cx("btn", "prev-btn")}
        >
          <IoMdArrowBack className={cx("icon-slideshow")} fontSize={20} />
        </button>
        {visibleProducts.map((product, index) => {
          const urlName = product.name.replace(/\s+/g, "-").toLowerCase();
          return (
            <Link
              to={`/products/${urlName}`}
              className={cx("product-item", "col-3", "col-half")}
              key={index}
            >
              <div className={cx("product-item-inner")}>
                <img className={cx("product-img")} src={product.image1} />
                <h4 className={cx("product-title")}>{product.name}</h4>
                <h5 className={cx("product-price")}>
                  {Math.round(product.price)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  ₫
                </h5>
              </div>
            </Link>
          );
        })}
        <button
          className={cx("btn", "next-btn")}
          onClick={handleNextClick}
          //   disabled={currentSlide === totalSlide}
        >
          <IoMdArrowForward className={cx("icon-slideshow")} fontSize={20} />
        </button>
      </div>
    </>
  );
}

export default SlideShowProducts;
