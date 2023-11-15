/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
// import { Pagination, Spinner } from "react-bootstrap";
// import ModalCreate from "./ModalCreate";
import { useAppContext } from "../../context/useAppContext";
import { Outlet } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
function Main() {
  const {
    aria,
    cols,
    arias,
    classCols,
    clickCollapse,
    clickProfile,
    toggleWhileMinimize,
    toggleSidebar,
    toggleMin,
    toggleSide,
    navItem,
    drop,
  } = useAppContext();
  // const [data, setData] = useState([]);
  // const [current, setCurrent] = useState(1);
  // const [dataPage] = useState(10);
  // const [loading, setLoading] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");

  // const getApi = async () => {
  //   setLoading(true);
  //   try {
  //     const api = await fetch("https://jsonplaceholder.typicode.com/posts", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (api.ok) {
  //       const response = await api.json();
  //       console.log(response);
  //       setInterval(() => {
  //         setData(response);
  //         setLoading(false);
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getApi();
  // }, []);

  // // for pagination
  // const indexOfLastPage = current * dataPage;
  // const indexOfFirstPage = indexOfLastPage - dataPage;
  // const currentData = data.slice(indexOfFirstPage, indexOfLastPage);
  // const paginate = (pageNumber) => setCurrent(pageNumber);

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  //   setCurrent(1);
  // };

  // // for search data with live search
  // const filterData = currentData.filter(
  //   (item) =>
  //     item.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     item.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  return (
    <>
      <div id="wrapper">
        <Sidebar
          collaps={cols}
          collapShow={classCols}
          aria={aria}
          buttonToggle={clickCollapse}
          toggle={toggleSide}
          iconSide={toggleSidebar}
          toggleMinimize={toggleMin}
        />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar
              navItem={navItem}
              ariaToggle={aria}
              dropDownToggle={drop}
              toggleButton={clickProfile}
              toggleMinimize={toggleWhileMinimize}
            />
            <div className="container-fluid">
              {/* Page Heading */}
              {/* DataTales Example */}
              {/* <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary mt-2">
                    DataTables Example
                  </h6>
                  <ModalCreate />
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-end form-inline mb-3 navbar-search">
                    <input
                      type="text"
                      className="form-control bg-light border-0 small"
                      placeholder="Search for..."
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                      value={searchTerm}
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
                          <th>ID</th>
                          <th>Body</th>
                          <th>Title</th>
                          <th>User ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <>
                            <tr>
                              <td className="text-center" colSpan={5}>
                                <Spinner
                                  animation="grow"
                                  role="status"></Spinner>
                              </td>
                            </tr>
                          </>
                        ) : (
                          <>
                            {filterData.length > 0 ? (
                              filterData.map((item, index) => (
                                <tr key={index * 2}>
                                  <td>{index + 1}</td>
                                  <td>{item.id}</td>
                                  <td>{item.body}</td>
                                  <td>{item.title}</td>
                                  <td>{item.userId}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td className="text-center" colSpan={5}>
                                  No data found...
                                </td>
                              </tr>
                            )}
                          </>
                        )}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-end">
                      <Pagination>
                        {Array.from({
                          length: Math.ceil(data.length / dataPage),
                        }).map((_, index) => (
                          <Pagination.Item
                            key={index}
                            active={index + 1 === current}
                            onClick={() => paginate(index + 1)}>
                            {index + 1}
                          </Pagination.Item>
                        ))}
                      </Pagination>
                    </div>
                  </div>
                </div>
              </div> */}
              <dir>{<Outlet />}</dir>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
    </>
  );
}

export default Main;
