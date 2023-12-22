/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { Spinner, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { formatOnlyDate } from "../../../helper/formatDate";
import debounce from "lodash/debounce";
import "../../../../style/styles.css";
import ModalDelete from "./Delete";
import { Link } from "react-router-dom";
const MainEmployee = () => {
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
        `http://127.0.0.1:4000/employee?page=${page}&size=${size}&query=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (api.ok) {
        const response = await api.json();
        setData(response.result.data);
        setPage(response.result.paginate["page"]);
        setSize(response.result.paginate["pageSize"]);
        setPages(response.result.paginate["totalPage"]);
        setCountData(response.result.paginate["empCount"]);
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
      item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">Employee</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary mt-2">
            DataTables Employee
          </h6>
          <Link to="/employee/create">
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
                  <th>NIK</th>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Bussines Unit</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <>
                    <tr>
                      <td className="text-center" colSpan={10}>
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
                          <td>{item.nik}</td>
                          <td>{item.full_name}</td>
                          <td>{item.title}</td>
                          <td>{item.email}</td>
                          <td>{item.department}</td>
                          <td>{item.bussines_unit}</td>
                          <td>{formatOnlyDate(item.createdAt)}</td>
                          <td>{formatOnlyDate(item.updatedAt)}</td>
                          <td>
                            <Link to={`/employee/edit/${item.id}`}>
                              <Button className="d-none d-sm-inline-block btn btn-sm btn-warning shadow-sm">
                                <i className="fas fa-fw fa-edit"></i>
                              </Button>
                            </Link>{" "}
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
                        <td className="text-center" colSpan={10}>
                          No data found...
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
            <div className="d-sm-flex align-items-center justify-content-between">
              <p>Total Employee : {countData}</p>
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

export default MainEmployee;
