"use client";

import React, { useState, useMemo } from "react";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddDiplomaForm from "./AddDiplomaForm";
import EditDiplomaForm from "./EditDiplomaForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DiplomaCertificates = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["diploma-certificates"],
    queryFn: async () => {
      const res = await axios.get("/api/diploma-certificate");
      const response = res.data;
      console.log("Fetched Diploma Certificates:", response);
      
      if (response.success) {
        return response.data.map((item, index) => ({
          id: item._id,
          sno: index + 1,
          ...item,
        }));
      }
      return [];
    },
  });
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        const res = await axios.delete(`/api/diploma-certificate/${id}`);
        if (res.data.success) {
          refetch(); // Refresh the table
        } else {
          alert("Failed to delete student");
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong");
      }
    }
  };

  const handleDownload = async (id, rollNo) => {
    try {
      const res = await axios.get(`/api/diploma-certificate/${id}/download`, {
        responseType: "blob",
      });

      const url = URL.createObjectURL(
        new Blob([res.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = `Diploma-${rollNo}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Unable to generate certificate");
    }
  };

  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);

  const handleEditOpen = (row) => {
    setSelected(row);
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setSelected(null);
  };

  /* columns need access to handleEditOpen, so memoise */
  const columns = useMemo(
    () => [
      {
        field: "sno",
        headerName: "S.No",
        width: 30,
        sortable: false,
        filterable: false,
      },
      { field: "rollNo", headerName: "Roll No", width: 100 },
      { field: "session", headerName: "Session", width: 110 },
      { field: "name", headerName: "Name", width: 160 },
      { field: "fatherName", headerName: "Father Name", width: 160 },
      {
        field: "registrationNumber",
        headerName: "Registration No",
        width: 180,
      },
      { field: "institute", headerName: "Institute", width: 180 },
      { field: "duration", headerName: "Duration", width: 110 },
      { field: "certificateName", headerName: "Certificate", width: 250 },
      { field: "conducted", headerName: "Conducted", width: 130 },
      {
        field: "theoryMarks",
        headerName: "Theory Marks",
        width: 130,
        type: "number",
      },
      {
        field: "practicalMarks",
        headerName: "Practical Marks",
        width: 140,
        type: "number",
      },
      {
        field: "totalMarks",
        headerName: "Total Marks",
        width: 110,
        type: "number",
      },
      {
        field: "obtainedMarks",
        headerName: "Obtained Marks",
        width: 150,
        type: "number",
      },
      {
        field: "percentage",
        headerName: "Percentage (%)",
        width: 140,
        type: "number",
      },
      { field: "grade", headerName: "Grade", width: 90 },
      { field: "certificateIssue", headerName: "Issue Date", width: 180 },
      {
        field: "actions",
        headerName: "Actions",
        width: 240,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="contained"
              onClick={() => handleEditOpen(params.row)}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => handleDownload(params.row.id, params.row.rollNo)}
            >
              Download
            </Button>
          </Stack>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button variant="contained" onClick={handleAddOpen}>
          Add New Student
        </Button>
      </div>

      <Box sx={{ height: 600, width: "100%", p: 2 }}>
        <DataGrid
          rows={data || []}
          columns={columns}
          loading={isLoading}
          disableRowSelectionOnClick
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50]}
        />
      </Box>

      {/* add‑form modal */}
      <AddDiplomaForm
        open={addOpen}
        handleClose={handleAddClose}
        onAdded={refetch}
      />

      {/* edit‑form modal */}
      <EditDiplomaForm
        open={editOpen}
        handleClose={handleEditClose}
        student={selected}
        onUpdated={refetch}
      />
    </div>
  );
};

export default DiplomaCertificates;
