import "../coaches/coaches.css";
import React, { useState, useEffect } from "react";
import MemberPopup from "../../components/addMemberPopup/addMemberPopup.js";
import axios from '../../api/axios';
import MUIDataTable from "mui-datatables";
import debounce from "lodash/debounce";
import { Box } from "@mui/system";
import Loader from "../../components/loader/loader";
import { AiOutlinePlus } from "react-icons/ai";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import Button from "@mui/material/Button";
import 'react-toastify/dist/ReactToastify.css';
import {RiUserAddLine} from 'react-icons/ri';
import 'react-toggle-switch/dist/css/switch.min.css';


function createData(id, first_name, middle_name, last_name, phone,gender,date,address,emergencyPhone,army,status) {
  return {
    id,
    first_name,
    middle_name,
    last_name,
    phone,
    gender,
    date,
    address,
    emergencyPhone,
    army,
    status
    // created_at,
    // updated_at,
  };
}

function Members(props) {
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRowsExist, setSelectedRowsExist] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [stateCoaches, setCoachesState] = useState([]);
  const [deleteId, setDeleteId] = useState([])

  const deleteCoachesByIds = (e) => {
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
        axios.delete(`/coach/deleteCoaches/${selectedDelete.join(",")}`)
        .then((response) => {
          toast.success("Members deleted successfully")
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
    document.title = "Members";
    getData();
  }, []);

  function openMemberPopup() {
    document.querySelector(".member-popup").showModal();
  }
  const rows =
    Data ||
    [].map((item) =>
      createData(
        item.id,
        item.first_name,
        item.middle_name,
        item.last_name,
        item.phone,
        item.gender,
        item.date,
        item.address,
        item.emergencyPhone,
        item.army,
        item.status,
        // item.created_at,
        // item.updated_at
      )
    );

  const handleSearch = debounce((searchValue) => {
    console.log(searchValue);
  }, 500);


  const getData = () => {
    axios
      .get("member/getMembers")
      .then((response) => {
        console.log(response.data)
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
      .put(`member/editMember/${rowData[0]}`,
        {
          first_name: rowData[1],
          middle_name: rowData[2],
          last_name: rowData[3],
          phone: rowData[4],
          emergencyPhone:rowData[5],
          gender: rowData[6],
          date: rowData[7],
          address: rowData[8],
          army:rowData[9]

        },
      )
      .then((response) => {
        console.log(response)
        getData();
      })
      .catch((error) => {
        console.log(error);
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
      name: "first_name",
      label: "First Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
              style={{ paddingLeft: "12%" }}
            >
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
      name: "middle_name",
      label: "Middle Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
              style={{ paddingLeft: "12%" }}
            // onClick={() => setEditingRow(rowIndex)}
            >
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
      name: "last_name",
      label: "Last Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
              style={{ paddingLeft: "12%" }}
            // onClick={() => setEditingRow(rowIndex)}
            >
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
      name: "phone",
      label: "Phone",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
              style={{ paddingLeft: "9%" }}
            // onClick={() => setEditingRow(rowIndex)}
            >
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
      name: "emergencyPhone",
      label: "Emergency Phone",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div
              style={{ paddingLeft: "22%" }}            >
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
        name: "gender",
        label: "Gender",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const rowIndex = tableMeta.rowIndex;
            const isEditing = rowIndex === editingRow;
  
            return (
              <div
                style={{ paddingLeft: "12%" }}
              >
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
        name: "date",
        label: "Birthday",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const rowIndex = tableMeta.rowIndex;
            const isEditing = rowIndex === editingRow;
  
            return (
              <div
                style={{ paddingLeft: "9%" }}
              // onClick={() => setEditingRow(rowIndex)}
              >
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
        name: "address",
        label: "Address",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const rowIndex = tableMeta.rowIndex;
            const isEditing = rowIndex === editingRow;
  
            return (
              <div
                style={{ paddingLeft: "9%" }}
              // onClick={() => setEditingRow(rowIndex)}
              >
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
        name: "army",
        label: "Army",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const rowIndex = tableMeta.rowIndex;
            const isEditing = rowIndex === editingRow;
  
            return (
              <div
                style={{ paddingLeft: "17%" }}
              >
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
      // {
      //   name: "active",
      //   label: "Active",
      //   options: {
      //     customBodyRender: (value, tableMeta, updateValue) => {
      //       const rowIndex = tableMeta.rowIndex;
      //       const isEditing = rowIndex === editingRow;
  
      //       return (
      //         <div
      //           style={{ paddingLeft: "9%" }}
      //         // onClick={() => setEditingRow(rowIndex)}
      //         >
      //           {isEditing ? (
      //             <input
      //               className="EditInput"
      //               value={value}
      //               onChange={(e) => {
      //                 updateValue(e.target.value);
      //               }}
      //             />
      //           ) : (
      //             value
      //           )}
      //         </div>
      //       );
      //     },
      //     editable: true,
      //   },
      // },
      
      
    // {
    //   name: "created_at",
    //   label: "Created At",
    // },
    // {
    //   name: "updated_at",
    //   label: "Updated At",
    // },
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
                        toast.success('Member edited successfully')
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
                        .delete(`coach/deleteCoach/${rowData[0]}`)
                        .then((response) => {
                          toast.success("Coach deleted successfully")
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
    searchPlaceholder: "Search for Coach",
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
    onRowsDelete:deleteCoachesByIds,
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
          <h1 className="titleOfPage "> Members </h1>
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
                  onClick={openMemberPopup}
                >
                  <span style={{ color: "#393A3C" }}>Add Member</span>
                </Button>
              </div>
              }
              data={rows}
              columns={columns}
              options={options}
            // onRowsSelect={handleRowSelection} 

            />
              <MemberPopup getData={getData} />
          </Box>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
export default Members;