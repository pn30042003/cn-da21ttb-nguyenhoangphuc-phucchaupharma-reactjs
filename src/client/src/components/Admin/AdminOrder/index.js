import classNames from "classnames/bind";
import styles from "./AdminOrder.module.scss";
import images from "../../../assets/images";
import { Link } from "react-router-dom";
import { FcProcess } from "react-icons/fc";
import { FcInTransit } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

const cx = classNames.bind(styles);

function AdminOrder({ axiosProduct, page, orders }) {
  const navigate = useNavigate();

  const [amountPage, setAmountPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    // Giả sử bạn có API trả về 7 sản phẩm và tổng số lượng (amountPage) là 7
    if (orders[0]) {
      setAmountPage(Math.ceil(orders[0].total_orders / 7));
    }
    setCurrentPage(page);
    // setAmountPage(7);
    // Các thao tác khác khi có dữ liệu từ API
  }, [orders]);

  useEffect(() => {
    // Nếu bạn muốn gọi navigate và axiosProduct ở đây, thì hãy thêm điều kiện để tránh lặp vô tận
    if (currentPage !== page) {
      navigate(`/admin/dashboard/order/${currentPage}`);
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
            <h2 className={cx("title-page")}>ĐƠN ĐẶT HÀNG</h2>
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
          <div className={cx("col-1", "flex-center")}>ID Đơn</div>
          <div className={cx("col-1", "flex-center")}>ID Khách</div>
          <div className={cx("col-2", "flex-center")}>Tên khách hàng</div>
          <div className={cx("col-2", "flex-center")}>Ngày đặt</div>
          <div className={cx("col-2", "flex-center")}>Tổng giá tiền</div>
          <div className={cx("col-1", "flex-center")}>Tình trạng</div>
          <div className={cx("col-3", "flex-center")}>Ghi chú</div>
        </div>
        {orders.map((order, index) => {
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
                {order.order_id}
              </div>
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
                {order.customer_name}
              </div>
              <div className={cx("col-2", "flex-center", "order-item-text")}>
                {order.order_date}
              </div>
              <div className={cx("col-2", "flex-center", "order-item-text")}>
                {Math.round(order.total_amount)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                ₫
              </div>

              <div className={cx("col-1", "flex-center")}>
                {/* {order && order.order_status == "Đang xử lý" ? (
                  <FcProcess className={cx("icon-order-status")} />
                ) : null}
                {order && order.order_status == "Đang vận chuyển" ? (
                  <FcInTransit className={cx("icon-order-status")} />
                ) : null}
                {order && order.order_status == "Đã huỷ" ? (
                  <FcCancel className={cx("icon-order-status")} />
                ) : null}
                {order && order.order_status == "Thành công" ? (
                  <FcOk className={cx("icon-order-status")} />
                ) : null} */}
                {order.order_status}
              </div>
              <div
                className={cx("col-3", "order-item-text", "order-note-text", "flex-center")}
              >
                {order.order_note}
              </div>
            </div>
          );
        })}

        <div className={cx("row", "row-admin")}>
          <div className={cx("col-12", "flex-center", "page-container")}>
            {/* Thanh phân trang */}
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

export default AdminOrder;
