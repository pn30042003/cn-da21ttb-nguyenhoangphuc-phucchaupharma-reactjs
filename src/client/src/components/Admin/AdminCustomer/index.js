import classNames from "classnames/bind";
import styles from "./AdminCustomer.module.scss";
import images from "../../../assets/images";
import { useEffect, useState } from "react";
//Phân trang
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import Cookies from "js-cookie";
//Phân trang

const cx = classNames.bind(styles);

function AdminCustomer({ axiosProduct, page, customer }) {
  const navigate = useNavigate();

  const [amountPage, setAmountPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    if (customer[0]) {
      setAmountPage(Math.ceil(customer[0].total_number_customer / 7));
    }
    setCurrentPage(page);
  }, [customer, page]);

  useEffect(() => {
    // Nếu bạn muốn gọi navigate và axiosProduct ở đây, thì hãy thêm điều kiện để tránh lặp vô tận
    if (currentPage !== page) {
      navigate(`/admin/dashboard/customer/${currentPage}`);
      axiosProduct(currentPage);
    }
  }, [currentPage]);

  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
  };

  return (
    <div className={cx("container", "container-admin", "admin-order")}>
      <div className={cx("grid", "grid-admin")}>
        <div className={cx("row", "row-admin", "admin-header")}>
          <div className={cx("col-10")}>
            <h2 className={cx("title-page")}>KHÁCH HÀNG</h2>
          </div>
          <div className={cx("col-2", "admin-header-img")}>
            <div className={cx("name-admin")}>Admin</div>
            <div className={cx("admin-img-container")}>
              <img className={cx("img-admin")} src={images.user} />
            </div>
          </div>
        </div>
        {/*  */}
        <div className={cx("row", "row-admin", "title-order-container")}>
          <div className={cx("col-1", "flex-center")}>ID</div>
          <div className={cx("col-2", "flex-center")}>Họ và tên</div>
          <div className={cx("col-3", "flex-center")}>Email</div>
          <div className={cx("col-2", "flex-center")}>Số điện thoại</div>
          <div className={cx("col-4", "flex-center")}>Địa chỉ</div>
        </div>
        {customer.map((order, index) => {
          return (
            <div key={index} className={cx("row", "row-admin", "order-item")}>
              <div
                className={cx(
                  "col-1",
                  "flex-center",
                  "order-item-text",
                  "order-id"
                )}
              >
                {order.customer_id}
              </div>
              <div className={cx("col-2", "flex-center", "order-item-text")}>
                {order.fullname}
              </div>
              <div className={cx("col-3", "flex-center", "order-item-text")}>
                {order.email}
              </div>
              <div className={cx("col-2", "flex-center", "order-item-text")}>
                {order.phone_number}
              </div>
              <div className={cx("col-4", "flex-center", "order-item-text")}>
                {order.address}
              </div>
            </div>
          );
        })}

        {/* Thanh phân trang */}
        <div className={cx("row", "row-admin")}>
          <div className={cx("col-12", "flex-center", "page-container")}>
            <ReactPaginate
              previousLabel={<BsChevronLeft />}
              nextLabel={<BsChevronRight />}
              breakLabel={"..."}
              pageCount={amountPage}
              marginPagesDisplayed={1} //có bao nhiêu trang sẽ xuất hiện ở phía trước và sau nút "trước" và "sau".
              pageRangeDisplayed={3} //có bao nhiêu trang sẽ xuất hiện giữa các nút "previous" và "next".
              onPageChange={handlePageChange} //hàm xử lý được gọi khi người dùng chuyển trang.  Prop này nhận một đối số là đối tượng { selected }, trong đó selected là số trang đã chọn (đếm từ 0).
              containerClassName={cx("pagination")} // thẻ ul
              pageClassName={cx("pagination-item")} // thẻ li
              pageLinkClassName={cx("pagination-item-a")} //thẻ a
              activeClassName={cx("pagination-item-a", "active")} //a active
              previousClassName={cx("pagination-item-a")} //lui
              nextClassName={cx("pagination-item-a", "next")} //tới
              breakClassName={cx("pagination-item-a", "previous")} //dấu ...
            />
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}

export default AdminCustomer;
