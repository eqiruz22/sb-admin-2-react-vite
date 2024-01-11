/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { formatDate } from "../../../helper/formatDate";

function ModalDetail(props) {
  const { id } = props;
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const handleClose = () => setShow(false);

  // const stepIconStyle = {
  //   background: "white",
  //   color: "blue",
  // };
  const getHistory = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:4000/history/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const response = await res.json();
      if (res.ok) {
        setData(response.result.data);
        setCount(response.result.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    setShow(true);
    getHistory();
  };
  const CustomStepIcon = (props) => {
    const isActive = props.active;
    return (
      <div
        style={{
          backgroundColor: isActive ? "grey" : "blue",
          color: "white",
          borderRadius: "50%",
          width: "25px",
          height: "25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        {isActive ? <span>&#10003;</span> : props.icon + 0}
      </div>
    );
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm ml-1"
        title="History Asset">
        <i className="fas fa-fw fa-info"></i>
      </button>

      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Header>
          <Modal.Title>History Asset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box sx={{ maxWidth: 400 }}>
            <Stepper orientation="vertical" activeStep={count}>
              {data.map((item) => (
                <Step key={item.id}>
                  <StepLabel StepIconComponent={CustomStepIcon}>
                    {item.used_by} {formatDate(item.createdAt)}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalDetail;
