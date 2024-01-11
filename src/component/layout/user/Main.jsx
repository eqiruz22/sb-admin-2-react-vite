/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from "react";
import { Spinner } from "react-bootstrap";
import ModalCreate from "./Create";
import ReactPaginate from "react-paginate";
import { formatDate } from "../../../helper/formatDate";
import debounce from "lodash/debounce";
import ModalEdit from "./Edit";
import "../../../../style/styles.css";
import ModalDelete from "./Delete";
import useAuthContext from "../../hooks/useAuthContext";
const MainUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [size, setSize] = useState(10);
  const [countData, setCountData] = useState(0);
  const { user } = useAuthContext();
  const tokens = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    debounceApi();
  }, [page, size, searchTerm, tokens]);

  const getApi = useCallback(async () => {
    setLoading(true);
    try {
      const api = await fetch(
        `http://127.0.0.1:4000/user?page=${page}&size=${size}&query=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      const response = await api.json();
      if (api.ok) {
        setData(response.result.data);
        setPage(response.result.paginate["page"]);
        setSize(response.result.paginate["pageSize"]);
        setPages(response.result.paginate["totalPage"]);
        setCountData(response.result.paginate["userCount"]);
        setLoading(false);
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.log(error);
    }
  }, [page, size, searchTerm, tokens]);

  const debounceApi = debounce(getApi, 200);
  if (!user) {
    return null;
  }

  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterData = data.filter(
    (item) =>
      item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">User</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary mt-2">
            DataTables Users
          </h6>
          <ModalCreate
            page={page}
            size={size}
            search={searchTerm}
            setData={setData}
            setPage={setPage}
            setSize={setSize}
            setPages={setPages}
            setCountData={setCountData}
          />
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
                  <th>Username</th>
                  <th>Fullname</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <>
                    <tr>
                      <td className="text-center" colSpan={7}>
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
                          <td>{item.username}</td>
                          <td>{item.full_name}</td>
                          <td>{item.role}</td>
                          <td>{formatDate(item.createdAt)}</td>
                          <td>{formatDate(item.updatedAt)}</td>
                          <td>
                            <ModalEdit
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
                        <td className="text-center" colSpan={7}>
                          No data found...
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
            <div className="d-sm-flex align-items-center justify-content-between">
              <p>Total User : {countData}</p>
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

export default MainUser;
