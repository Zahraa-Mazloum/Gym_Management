import "../coaches/coaches.css";
import React, { useState, useEffect } from "react";
import ProgramPopup from "../../components/addProgramPopup/addProgramPopup.js";
import axios from '../../api/axios';
import MUIDataTable from "mui-datatables";
import debounce from "lodash/debounce";
import { Box } from "@mui/system";
import Loader from "../../components/loader/loader";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {RiUserAddLine} from 'react-icons/ri';
import moment from "moment";


function createData(id, name, coach,day,time,category,price) {
  return {
    id,
    name,
    coach,
    day,
    time,
    category,
    price
  };
}

function Programs(props) {
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRowsExist, setSelectedRowsExist] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [stateSalaries, setSalariesState] = useState([]);
  const [deleteId, setDeleteId] = useState([])

  const deleteSalariesByIds = (e) => {
    const selectedDelete = e.data.map((value, index) => {
      return Data[index + 1]._id;
    });
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/coach/deleteSalaries/${selectedDelete.join(",")}`)
        .then((response) => {
          toast.success("Salaries deleted successfully")
          getData();
        })
          .catch(e => {
            toast.error("Something went wrong.");
          });
      }
      getData();
    });
  };




  const handleRowSelection = (currentRowsSelected, allRowsSelected, rowsSelected) => {
    // console.log(currentRowsallRowsSelectedSelected)
    // setSelectedRows(rowsSelected);
    // setSelectedRowsExist(rowsSelected.length > 0);
  };
  useEffect(() => {
    setLoading(true);
    document.title = "Programs";
    getData();
  }, []);

  function openProgramPopup() {
    document.querySelector(".program-popup").showModal();
  }
  const rows =
    Data ||
    [].map((item) =>
      createData(
        item.id,
        item.name,
        item.coach,
        item.day,
        item.time,
        item.category,
        item.price

      )
    );

  const handleSearch = debounce((searchValue) => {
    console.log(searchValue);
  }, 500);


  const getData = () => {
    axios
      .get("program/getPrograms")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const handleUpdate = (rowData) => {
    setEditingRow(true);
    console.log(rowData[0])
    axios
      .put(`program/editProgram/${rowData[0]}`,
        {
          name: rowData[1],
          coach: rowData[2],
          day: rowData[3],
          time: rowData[4],
          category: rowData[5],
          price:rowData[6],
          priceLbp:rowData[7]
        },
      )
      .then((response) => {
        console.log(response)
        getData();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
      
  };

  const columns = [
    {
      name: "_id",
      label: "ID",
      options: {
        display: "excluded",
      },
    },
    {
        name: "name",
        label: "Program",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const rowIndex = tableMeta.rowIndex;
            const isEditing = rowIndex === editingRow;
      
            return (
              <div style={{ paddingLeft: "12%" }}>
                {isEditing ? (
                  <input
                    className="EditInput"
                    value={value}
                    onChange={(e) => {
                      updateValue(e.target.value);
                    }}
                  />
                ) : (
                  value
                )}
              </div>
            );
          },
          editable: true,
        },
      },
    {
      name: "coach",
      label: "Coach",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;
    
          const fullName = value ? `${value.first_name} ${value.last_name}` : "This coach is deleted";
    
          return (
            <div style={{ paddingLeft: "12%" }}>
              {isEditing ? (
                <input
                  className="EditInput"
                  value={fullName}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                fullName
              )}
            </div>
          );
        },
        editable: true,
      },
    },

    
    {
        name: "day",
        label: "Day",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const rowIndex = tableMeta.rowIndex;
            const isEditing = rowIndex === editingRow;
      
            return (
              <div style={{ paddingLeft: "12%" }}>
                {isEditing ? (
                  <input
                    className="EditInput"
                    value={value}
                    onChange={(e) => {
                      updateValue(e.target.value);
                    }}
                  />
                ) : (
                  value
                )}
              </div>
            );
          },
          editable: true,
        },
      },
      {
        name: "time",
        label: "time",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const rowIndex = tableMeta.rowIndex;
            const isEditing = rowIndex === editingRow;
      
            return (
              <div style={{ paddingLeft: "12%" }}>
                {isEditing ? (
                  <input
                    className="EditInput"
                    value={value}
                    onChange={(e) => {
                      updateValue(e.target.value);
                    }}
                  />
                ) : (
                  value
                )}
              </div>
            );
          },
          editable: true,
        },
      },
      {
        name: "category",
        label: "category",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const rowIndex = tableMeta.rowIndex;
            const isEditing = rowIndex === editingRow;
      
            return (
              <div style={{ paddingLeft: "12%" }}>
                {isEditing ? (
                  <input
                    className="EditInput"
                    value={value}
                    onChange={(e) => {
                      updateValue(e.target.value);
                    }}
                  />
                ) : (
                  value
                )}
              </div>
            );
          },
          editable: true,
        },
      },
      {
        name: "price",
        label: "Price",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const rowIndex = tableMeta.rowIndex;
            const isEditing = rowIndex === editingRow;
      
            return (
              <div style={{ paddingLeft: "12%" }}>
                  <span className="input-group-addon">$ </span>

                {isEditing ? (
                  <input
                    className="EditInput"
                    value={value}
                    onChange={(e) => {
                      updateValue(e.target.value);
                    }}
                  />
                ) : (
                  value
                )}
              </div>
            );
          },
          editable: true,
        },
      },
      {
        name: "priceLbp",
        label: "LBP",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const rowIndex = tableMeta.rowIndex;
            const isEditing = rowIndex === editingRow;
      
            return (
              <div style={{ paddingLeft: "12%" }}>
                <span className="input-group-addon">Lbp </span>
                {value} 
              </div>
            );
          },
          editable: false, 
        },
      },
      
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = tableMeta.rowData;
          return (
            <>
              {isEditing && editingRow === tableMeta.rowIndex ? (
                <SaveAsRoundedIcon
                  sx={{
                    color: "#393A3C",
                    cursor: "pointer",
                    justifyItems: "center",
                    alignItems: "center",

                    "&:hover": {
                      transform: "scale(1.3)",
                      transition: "0.2s ease-out",
                    },
                  }}
                  className="save-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingRow(null);
                    Swal.fire({
                      title: "Do you want to save your change(s)?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#DA3335",
                      cancelButtonColor: "#393A3C",
                      confirmButtonText: `Yes, change it!`,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleUpdate(rowData);
                        getData()
                        toast.success('Program edited successfully')
                      }
                    });
                  }}
                />
              ) : (
                <BorderColorOutlinedIcon
                  sx={{
                    color: "#393A3C",
                    cursor: "pointer",
                    justifyItems: "center",
                    alignItems: "center",

                    "&:hover": {
                      transform: "scale(1.3)",
                      transition: "0.2s ease-out",
                    },
                  }}
                  className="edit-btn"
                  onClick={() => {
                    setIsEditing(true);
                    setEditingRow(tableMeta.rowIndex);

                  }}
                />
              )}
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              {/* Action  */}
              <DeleteSweepOutlinedIcon
                sx={{
                  color: "#393A3C",
                  cursor: "pointer",
                  justifyItems: "center",
                  alignItems: "center",

                  "&:hover": {
                    transform: "scale(1.3)",
                    transition: "0.2s ease-out",
                  },
                }}
                className="delete-btn"
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DA3335",
                    cancelButtonColor: "#393A3C",
                    confirmButtonText: `Yes, delete it!`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      axios
                        .delete(`program/deleteProgram/${rowData[0]}`)
                        .then((response) => {
                          toast.success("Program deleted successfully")
                          getData();
                        })
                        .catch((err) => { 
                          console.log(err.message);
                        });
                    }
                  });
                }}
              />
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    responsive: "simple",
    selectableRows: "multiple",
    selectToolbarPlacement: "replace",
    search: true,
    searchPlaceholder: "Search for Program",
    onSearchChange: (searchValue) => handleSearch(searchValue),
    download: true,
    print: false,
    pagination: true,
    rowsPerPage: 7,
    elevation: 20,
    loaded: true,
    rowsPerPageOptions: [5, 7],
    rowHover: true,
    viewColumns: true,
    onRowsDelete:deleteSalariesByIds,
    onRowsSelect: handleRowSelection,

  };

  return (
    <>
      {Loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="table-container">
          <h1 className="titleOfPage "> Programs </h1>
          <Box sx={{ maxWidth: "100%", margin: "auto" }}>
            <MUIDataTable
              title={
                <div>
                <Button
                  variant="contained"
                  startIcon={<RiUserAddLine className="iconAddForm" />}
                  sx={{
                    cursor: "pointer",
                    justifyItems: "center",
                    alignItems: "center",
                    backgroundColor: "#FEFEFE",
                    marginLeft:'-1%',
                    "&:hover": {
                      transition: "0.2s ease-out",
                      backgroundColor: "lightgray", 
                    },
                  }}
                  className="addCoach"
                  onClick={openProgramPopup}
                >
                  <span style={{ color: "#393A3C" }}>Add Program</span>
                </Button>
              </div>
              }
              data={rows}
              columns={columns}
              options={options}
            // onRowsSelect={handleRowSelection} 

            />
              <ProgramPopup  getData={getData} />
          </Box>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
export default Programs;