import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SlideShowProducts from "../Other/SlideProducts";
import styles from "./BodyHome.module.scss";

const cx = classNames.bind(styles);

function BodyHome({ products }) {
  const [productsNew, setProductsNew] = useState([]);
  useEffect(() => {
    axiosProducts(1);
  }, []);
  const axiosProducts = async (page) => {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_API_URL}/products/hot`,
        {
          params: {
            sortprice: "default",
            filterSize: "default",
            brands: null,
            page: page,
          },
        }
      );

      setProductsNew(response.data.splice(0, 8));
      // setAmountPage(
      //   Math.ceil(response.data[0]?.total_number_products_filter / 9)
      // );
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("grid")}>
        <div className={cx("row")}>
          <div className={cx("col-12")}>
            <h3 className={cx("title-body")}>SẢN PHẨM NỔI BẬT</h3>
          </div>
        </div>
        <div className={cx("row", "products-container")}>
          {productsNew.map((product, index) => {
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
        </div>
        <SlideShowProducts
          products_props={products}
          title={"MỘT SỐ SẢN PHẨM KHÁC"}
        />
      </div>
    </div>
  );
}

export default BodyHome;
