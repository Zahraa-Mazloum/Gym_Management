import "./coaches.css";
import React, { useState, useEffect } from "react";
// import KpiPopup from "../../components/addKpiPopup/kpiPopup.js";
import ConfirmationPopup from "../../components/confirmationPopup/confirmationPopup";
// import showEditBox from "../../components/EditConformation/EditConformation.js";
import axios from '../../api/axios';
import MUIDataTable from "mui-datatables";
import debounce from "lodash/debounce";
import { Box } from "@mui/system";
import Loader from "../../components/loader/loader";
import { AiOutlinePlus } from "react-icons/ai";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function createData(id, first_name, middle_name, last_name, phone) {
  return {
    id,
    first_name,
    middle_name,
    last_name,
    phone,
    // created_at,
    // updated_at,
  };
}

function Coaches(props) {
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
          toast.success("Coaches deleted successfully")
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
    document.title = "Coaches";
    getData();
  }, []);

  // function openKpiPopup() {
  //   document.querySelector(".kpi-popup").showModal();
  // }
  const rows =
    Data ||
    [].map((item) =>
      createData(
        item.id,
        item.first_name,
        item.middle_name,
        item.last_name,
        item.phone,
        // item.created_at,
        // item.updated_at
      )
    );

  const handleSearch = debounce((searchValue) => {
    console.log(searchValue);
  }, 500);


  const getData = () => {
    axios
      .get("coach/getCoaches")
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
      .put(`coach/editCoach/${rowData[0]}`,
        {
          first_name: rowData[1],
          middle_name: rowData[2],
          last_name: rowData[3],
          phone: rowData[4],
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

  // const showConfirmationBox = () => {
  //   document.querySelector(".confirmation-popup").showModal();
  // };

  // const showEditBox = () => {
  //   document.querySelector(".edit-popup").showModal();
  // };

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
                        toast.success('Coach edited successfully')
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
    rowsPerPage: 10,
    elevation: 20,
    loaded: true,
    rowsPerPageOptions: [5, 10],
    rowHover: true,
    viewColumns: true,
    onRowsDelete:deleteCoachesByIds,
    onRowsSelect: handleRowSelection,
    // customToolbar: () => (
    //   <DeleteSweepOutlinedIcon
    //     sx={{
    //       color: "#393A3C",
    //       cursor: "pointer",
    //       justifyItems: "center",
    //       alignItems: "center",
    //       "&:hover": {
    //         transform: "scale(1.3)",
    //         transition: "0.2s ease-out",
    //       },
    //     }}
    //     className="delete-all-btn"
    //     onClick={deleteCoachesByIds}
    //     style={{ display: selectedRowsExist ? "inline-block" : "none" }}
    //   />
    // )
  };

  return (
    <>
      {Loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="table-container">
          <Box sx={{ maxWidth: "100%", margin: "auto" }}>
            <MUIDataTable
              title={
                <div>
                  <GroupAddIcon
                    sx={{
                      color: "#393A3C",
                      cursor: "pointer",
                      justifyItems: "center",
                      alignItems: "center",

                      "&:hover": {
                        transition: "0.2s ease-out",
                      },
                    }}
                    className="addkpi"
                  />{" "}
                  <span className="kpititle">Coaches</span>
                </div>
              }
              data={rows}
              columns={columns}
              options={options}
            // onRowsSelect={handleRowSelection} 

            />
          </Box>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
export default Coaches;