/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { Spinner, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { formatDate } from "../../../helper/formatDate";
import debounce from "lodash/debounce";
import "../../../../style/styles.css";
import ModalDelete from "./Delete";
import ModalDetail from "./Detail";
import { Link } from "react-router-dom";
const MainProduct = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(0);
  const [size, setSize] = React.useState(10);
  const [countData, setCountData] = React.useState(0);

  React.useEffect(() => {
    debounceApi();
  }, [page, size, searchTerm]);
  const getApi = React.useCallback(async () => {
    setLoading(true);
    try {
      const api = await fetch(
        `http://127.0.0.1:4000/product?page=${page}&size=${size}&query=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (api.ok) {
        const response = await api.json();
        console.log(response);
        setData(response.result.data);
        setPage(response.result.paginate["page"]);
        setSize(response.result.paginate["pageSize"]);
        setPages(response.result.paginate["totalPage"]);
        setCountData(response.result.paginate["productCount"]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [page, size, searchTerm]);

  const debounceApi = debounce(getApi, 200);

  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterData = data.filter(
    (item) =>
      item.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hostname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">Product</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary mt-2">
            DataTables product
          </h6>
          <Link to={"/product/create"}>
            <Button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
              <i className="fas fa-fw fa-plus"></i>
            </Button>
          </Link>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-end form-inline mb-3 navbar-search">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
              onChange={handleSearch}
            />
          </div>
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing={0}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>SN</th>
                  <th>Hostname</th>
                  <th>Product</th>
                  <th>Manufacture</th>
                  <th>Type</th>
                  <th>Buy Date</th>
                  <th>Warranty</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <>
                    <tr>
                      <td className="text-center" colSpan={9}>
                        <Spinner animation="grow" role="status"></Spinner>
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    {filterData.length > 0 ? (
                      filterData.map((item, index) => (
                        <tr key={index * 2}>
                          <td>{index + 1}</td>
                          <td>{item.serial_number}</td>
                          <td>{item.hostname}</td>
                          <td>{item.product_name}</td>
                          <td>{item.manufacture && item.manufacture.name}</td>
                          <td>{item.type && item.type.name}</td>
                          <td>{formatDate(item.buy_date)}</td>
                          <td>{formatDate(item.warranty)}</td>
                          {item.statsasset.id === 1 ? (
                            <td>
                              <span className="text-info">
                                {item.statsasset && item.statsasset.name}
                              </span>
                            </td>
                          ) : (
                            <td>
                              <span className="text-success">
                                {item.statsasset && item.statsasset.name}
                              </span>
                            </td>
                          )}

                          <td>
                            <ModalDetail isId={item.id} />
                            <Link to={`/product/edit/${item.id}`}>
                              <Button className="d-none d-sm-inline-block btn btn-sm btn-warning shadow-sm">
                                <i className="fas fa-fw fa-edit"></i>
                              </Button>
                            </Link>
                            <ModalDelete
                              isId={item.id}
                              page={page}
                              size={size}
                              search={searchTerm}
                              setData={setData}
                              setPage={setPage}
                              setSize={setSize}
                              setPages={setPages}
                              setCountData={setCountData}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="text-center" colSpan={9}>
                          No data found...
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
            <div className="d-sm-flex align-items-center justify-content-between">
              <p>Total product : {countData}</p>
              <nav aria-label="Page navigation example" key={countData}>
                <ReactPaginate
                  previousLabel={"<<"}
                  nextLabel={">>"}
                  pageCount={pages}
                  onPageChange={changePage}
                  containerClassName={"pagination"}
                  pageLinkClassName={"page-link"}
                  previousLinkClassName={"page-link"}
                  nextLinkClassName={"page-link"}
                  activeLinkClassName={"page-item active"}
                  activeClassName={"active"}
                  disabledLinkClassName={"page-item disabled"}
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainProduct;
