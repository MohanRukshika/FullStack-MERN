import { useEffect, useState } from "react";
import axios from "axios";
import LoadingAnimation from "../components/LoadingAnimation";
import CustomerOrderDetailsModel from "../components/customerOrderDetailsModel";

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [totalOrder,setTotalOrder] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOrdersAreLoaded, setIsOrdersAreLoaded] = useState(false);

  const totalPage = Math.ceil(totalOrder / pageSize);

  const loadOrders = () => {
  const token = localStorage.getItem("token");

  setIsOrdersAreLoaded(false);

  axios
    .get(
      `${import.meta.env.VITE_API_URL}/orders/${pageSize}/${currentPage}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((response) => {
      setOrders(response.data);
      setTotalOrder(response.data.length);
      setIsOrdersAreLoaded(true);
    })
    .catch((error) => {
      console.log(error);
      setIsOrdersAreLoaded(true);
    });
};

  useEffect(() => {
  loadOrders();
}, [currentPage, pageSize]);

  return (
    <div className="w-full h-full flex items-center flex-col p-4 overflow-y-scroll">
      <div className="sticky top-1 w-full h-[90px] bg-accent text-white flex items-center justify-between rounded-2xl px-7">
        <h1 className="text-xl font-medium">Orders</h1>
        <div>Total Orders : {totalOrder}</div>
      </div>

      <div className="w-full h-full overflow-scroll p-5">
        {isOrdersAreLoaded ? (
          <>
            <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-xl bg-white shadow-accent shadow-md">
              <thead className="bg-secondary text-primary">
                <tr>
                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Order ID
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Email
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Date
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold">
                    Total
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold ">
                    Status
                  </th>
                  <th className="px-5 py-4 text-left text-sm font-semibold rounded-tr-xl">
                    
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((item) => {
                  return (
                    <tr
                      key={item.orderID}
                      className="bg-white hover:bg-accent/5 transition-colors duration-200"
                    >
                      <td className="px-5 py-3 text-sm text-secondary/70 border-b border-gray-200">
                        {item.orderID}
                      </td>

                      <td className="px-5 py-3 text-sm text-secondary border-b border-gray-200">
                        {item.email}
                      </td>
                      <td className="px-5 py-3 text-sm text-secondary border-b border-gray-200">
                        {new Date(item.date).toLocaleDateString()}
                      </td>

                      <td className="px-5 py-3 text-sm font-bold text-accent border-b border-gray-200">
                        LKR{" "}
                  {item.items
                    .reduce((total, item) => {

                      const quantity =
                        item.quantity || 1;

                      const price =
                        item.product.price ||
                        item.price ||
                        0;

                      return total + price * quantity;

                    }, 0)
                    .toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                      </td>

                      <td className="px-5 py-3 border-b border-gray-200">
                        <span
                          className={`inline-block px-4 py-1 rounded-full text-xs font-medium ${
                            item.status === "Completed"
                              ? "bg-accent/10 text-accent"
                              : "bg-secondary/10 text-secondary"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <CustomerOrderDetailsModel
                          order={item}
/>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="w-full flex justify-end items-center gap-3 mt-4">
              <button
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded transition-colors duration-200 ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPage}
              </span>

              <button
  onClick={() => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  }}
  disabled={currentPage === totalPage}
  className={`px-3 py-1 rounded transition-colors duration-200 ${
    currentPage === totalPage
      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
  }`}
>
  Next
</button>
              <select
                value={pageSize}
                onChange={(e)=>{
                  setPageSize(parseInt(e.target.value));
                  setIsOrdersAreLoaded(false)
                }} className="ml-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-250 transition-colors duration-200">
                  <option value={2}>2</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
              </select>
            </div>
          </>
        ) : (
          <LoadingAnimation />
        )}

        
      </div>
    </div>
  );
}