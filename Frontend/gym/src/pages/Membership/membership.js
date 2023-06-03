import "../coaches/coaches.css";
import React, { useState, useEffect } from "react";
import MemberShipPopup from "../../components/addMembershipPopup/addMembershipPopup.js";
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


function createData(id,createdAt,member,program,paid) {
  return {
    id,
    member,
    program,
    paid,
    createdAt
   
  };
}

function Membership(props) {
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRowsExist, setSelectedRowsExist] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [stateSalaries, setSalariesState] = useState([]);
  const [deleteId, setDeleteId] = useState([])
  const [dollarRate, setDollarRate] = useState(null);


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

  const fetchDollarRate = async () => {
    try {
      const response = await axios.get("dollar/getAllDollarRates"); 
      const data = await response.json();
      const dollarRates = data.dollarRate; 
      setDollarRate(dollarRates);
    } catch (error) {
      console.log(error);
    }
  };


  const handleRowSelection = (currentRowsSelected, allRowsSelected, rowsSelected) => {
    // console.log(currentRowsallRowsSelectedSelected)
    // setSelectedRows(rowsSelected);
    // setSelectedRowsExist(rowsSelected.length > 0);
  };
  useEffect(() => {
    setLoading(true);
    document.title = "Membership";
    getData();
    fetchDollarRate();
  }, []);

  function openMembershipPopup() {
    document.querySelector(".membership-popup").showModal();
  }
  const rows =
    Data ||
    [].map((item) =>
      createData(
        item.id,
        item.member,
        item.program,
        item.paid,
        item.createdAt

      )
    );

  const handleSearch = debounce((searchValue) => {
    console.log(searchValue);
  }, 500);


  const getData = () => {
    axios
      .get("membership/getMemberships")
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
      .put(`membership/updateMembership/${rowData[0]}`,
        {
          member: rowData[1],
          amount: rowData[2],
          program: rowData[3],
          dollarRate: rowData[4],
          paid: rowData[5],
          priceLbp:rowData[6],
          createdAt:rowData[7],

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
      name: "member",
      label: "Member",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;
    
          const fullName = value ? `${value.first_name} ${value.middle_name} ${value.last_name}` : "This member is deleted";
    
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
      name: "program",
      label: "Program",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;
          const name = value ? `${value.name}` : "This program is deleted";

          return (
            <div style={{ paddingLeft: "12%" }}>
              {isEditing ? (
                <input
                  className="EditInput"
                  value={name}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                name
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "amount",
      label: "Amount",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;
    
          return (
            <div style={{ paddingLeft: "12%" }}>
              <span className="input-group-addon">$ </span>
              {value} 
            </div>
          );
        },
        editable: false, 
      },
    },
   
      {
        name: "paid",
        label: "Paid ",
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
        name: "priceLbp",
        label: "LBP",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const rowIndex = tableMeta.rowIndex;
            const isEditing = rowIndex === editingRow;
      
            return (
              <div style={{ paddingLeft: "12%" }}>
                <span className="input-group-addon">LBP </span>
                {value} 
              </div>
            );
          },
          editable: false, 
        },
      }, 

      {
        name: "createdAt",
        label: "Date",
        options: {
          customBodyRender: (value) => moment(value).format("DD-MM-YYYY"),
        },
      }, 
      {
        name: "end_date",
        label: "End Date",
        options: {
          customBodyRender: (value) => moment(value).format("DD-MM-YYYY"),
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
                        toast.success('Membership edited successfully')
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
                        .delete(`membership/deleteMembership/${rowData[0]}`)
                        .then((response) => {
                          toast.success("Membership deleted successfully")
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
    searchPlaceholder: "Search for Membership",
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
          <h1 className="titleOfPage "> Membership </h1>
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
                  onClick={openMembershipPopup}
                >
                  <span style={{ color: "#393A3C" }}>Add Membership</span>
                </Button>
              </div>
              }
              data={rows}
              columns={columns}
              options={options}
            // onRowsSelect={handleRowSelection} 

            />
              <MemberShipPopup getData={getData} />
          </Box>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
export default Membership;