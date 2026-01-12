import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import axios from "axios";
//Phân trang
import ReactPaginate from "react-paginate";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
//Phân trang
import { IoIosSearch } from "react-icons/io";

const cx = classNames.bind(styles);

function Products() {
  const [sortByPrice, setSortByPrice] = useState("default");
  const [filterSize, setFilterSize] = useState("default");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [amountPage, setAmountPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    axiosProducts(currentPage);
  }, [sortByPrice, filterSize, currentPage]);
  useEffect(() => {
    axiosProductsCategory(1);
  }, [selectedCategories]);

  const axiosProducts = async (page) => {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_API_URL}/products/filter`,
        {
          params: {
            sortprice: sortByPrice,
            filterSize: filterSize,
            categories: selectedCategories.join(","),
            page: page,
            searchName: searchName,
          },
        }
      );

      setNewProducts(response.data);
      setAmountPage(
        Math.ceil(response.data[0]?.total_number_products_filter / 9)
      );
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  const axiosProductsCategory = async (page) => {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_API_URL}/products/filter`,
        {
          params: {
            sortprice: sortByPrice,
            filterSize: filterSize,
            categories: selectedCategories.join(","),
            page: page,
          },
        }
      );

      setNewProducts(response.data);
      setAmountPage(
        Math.ceil(response.data[0]?.total_number_products_filter / 9)
      );
      setCurrentPage(1);
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  const handleSortPriceChange = (valueSort) => {
    setSortByPrice(valueSort);
  };
  //BEGIN: Sắp xếp theo size//
  const handleFilterSizeChange = (value) => {
    setFilterSize(value);
  };
  //END: Sắp xếp theo size//
  //BEGIN: Sắp xếp theo category//
  const handleCategoryFilterChange = (category) => {
    const updatedCategories = [...selectedCategories];
    if (updatedCategories.includes(category)) {
      const index = updatedCategories.indexOf(category);
      updatedCategories.splice(index, 1);
    } else {
      updatedCategories.push(category);
    }
    setSelectedCategories(updatedCategories);
  };
  //END: Sắp xếp theo category//
  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
  };
  //Tìm kiếm
  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };
  const handleSearchSubmit = () => {
    axiosProducts(1); // Gửi request khi người dùng thực hiện tìm kiếm, trang được đặt lại về trang đầu tiên
  };
  const handleSearchSubmitEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // Thực hiện logic của bạn ở đây
      axiosProducts(1); // Gửi request khi người dùng thực hiện tìm kiếm, trang được đặt lại về trang đầu tiên
    }
  };

  return (
    <div className={cx("container", "container-products")}>
      <div className={cx("grid")}>
        <div className={cx("products-title", "row")}>
          <h2 className={cx("products-title-text", "col-full-width", "col-6")}>
            TẤT CẢ SẢN PHẨM
          </h2>
          <div className={cx("filter-price", "col-6")}>
            <div className={cx("col-9", "col-half")}></div>
            <div className={cx("sort-price", "col-3", "col-half")}>
              <select
                className={cx("sort-price-select")}
                value={sortByPrice}
                onChange={(e) => handleSortPriceChange(e.target.value)}
              >
                <option value="default" className={cx("sort-item")}>
                  Sắp xếp theo:
                </option>
                <option value="increase" className={cx("sort-item")}>
                  Giá tăng dần
                </option>
                <option value="decrease" className={cx("sort-item")}>
                  Giá giảm dần
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className={cx("body-products", "row")}>
          <div className={cx("col-3")}>
            <div className={cx("filter-brand", "row")}>
              <h4 className={cx("col-12", "filter-brand-title")}>
                Loại sản phẩm
              </h4>
              <ul>
                {["Vitamin & Khoáng chất", "Sinh lý - Nội tiết tố", "Tăng cường chức năng", "Hỗ trợ điều trị", "Hỗ trợ tiêu hóa", "Thần kinh não"].map((category) => (
                  <li
                    key={category}
                    className={cx("col-12", "brand-item", {
                      selected: selectedCategories.includes(category),
                    })}
                    onClick={() => handleCategoryFilterChange(category)}
                  >
                    <IoMdArrowDropright className={cx("brand-item-icon")} />{" "}
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            {/* Thêm ô input và nút tìm kiếm */}
            <div className={cx("filter-brand", "row")}>
              <h4 className={cx("col-12", "filter-brand-title")}>Tìm kiếm</h4>
            </div>
            <div className={cx("search-container", "row")}>
              <label for="search">
                <input
                  required=""
                  autocomplete="off"
                  placeholder="Tên sản phẩm..."
                  id="search"
                  type="text"
                  value={searchName}
                  onChange={handleSearchNameChange}
                  onKeyDown={(e) => handleSearchSubmitEnter(e)}
                />
                <div className={cx("icon")} onClick={handleSearchSubmit}>
                  <svg
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={cx("swap-on")}
                  >
                    <path
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                  <svg
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={cx("swap-off")}
                  >
                    <path
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </div>
                {/* <button type="reset" className={cx("close-btn")}>
                  <svg
                    viewBox="0 0 20 20"
                    className={cx("h-5","w-5")}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </button> */}
              </label>
              {/* <input
                type="text"
                placeholder="Nhập tên sản phẩm..."
                value={searchName}
                onChange={handleSearchNameChange}
                className={cx("search-input")}
              />
              <button
                onClick={handleSearchSubmit}
                className={cx("search-button")}
              >
              <IoIosSearch />
              </button> */}
            </div>

            {/*  */}
          </div>

          <div className={cx("col-9")}>
            {" "}
            <div className={cx("product-container", "row")}>
              {newProducts.length != 0 ? (
                newProducts.map((product, index) => {
                  const urlName = product.name
                    .replace(/\s+/g, "-")
                    .toLowerCase();
                  return (
                    <Link
                      to={`/products/${urlName}`}
                      className={cx("product-item", "col-4", "col-half")}
                      key={index}
                    >
                      <div className={cx("product-item-inner")}>
                        <img
                          className={cx("product-img")}
                          src={product.image1}
                        />
                        <h4 className={cx("product-title")}>{product.name}</h4>
                        <h6 className={cx("product-brand")}>{product.category}</h6>
                        <h5 className={cx("product-price")}>
                          {Math.round(product.price)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                          ₫
                        </h5>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className={cx("col-12")}>Không tìm thấy sản phẩm nào!</div>
              )}
            </div>
          </div>
        </div>

        {/* Thanh phân trang */}
        <div className={cx("row")}>
          <div className={cx("col-12", "page-container")}>
            <ReactPaginate
              forcePage={currentPage - 1} // Trừ 1 vì ReactPaginate tính từ 0
              previousLabel={<BsChevronLeft />}
              nextLabel={<BsChevronRight />}
              breakLabel={"..."}
              pageCount={amountPage}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName={cx("pagination")}
              pageClassName={cx("pagination-item")}
              pageLinkClassName={cx("pagination-item-a")}
              activeClassName={cx("pagination-item-a", "active")}
              previousClassName={cx("pagination-item-a")}
              nextClassName={cx("pagination-item-a", "next")}
              breakClassName={cx("pagination-item-a", "previous")}
            />
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}

export default Products;
