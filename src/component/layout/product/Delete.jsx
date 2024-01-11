/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
function ModalDelete(props) {
  const {
    isId,
    page,
    size,
    search,
    setData,
    setPage,
    setSize,
    setPages,
    setCountData,
  } = props;

  const handleDelete = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://127.0.0.1:4000/product/${isId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          });
          const response = await res.json();
          if (res.ok) {
            await fetch(
              `http://127.0.0.1:4000/product?page=${page}&size=${size}&query=${search}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${JSON.parse(
                    localStorage.getItem("token")
                  )}`,
                },
              }
            )
              .then((res) => res.json())
              .then((res) => {
                setData(res.result.data);
                setPage(res.result.paginate["page"]);
                setSize(res.result.paginate["pageSize"]);
                setPages(res.result.paginate["totalPage"]);
                setCountData(res.result.paginate["productCount"]);
              });
          }
          Swal.fire({
            title: "Deleted!",
            text: response.result,
            icon: "success",
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <>
      <Button onClick={handleDelete} className="btn btn-sm btn-danger ml-1">
        <i className="fas fa-fw fa-trash"></i>
      </Button>
    </>
  );
}

export default ModalDelete;
