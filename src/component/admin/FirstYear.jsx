"use client";
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  Box,
  Collapse,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AddStudentForm } from './AddStudentForm';

const fetchStudents = async () => {
  const { data } = await axios.get('/api/first-year');
  return data;
};

const createStudent = async (studentData) => {
  const { data } = await axios.post('/api/first-year', studentData);
  return data;
};

const FirstYear = () => {
  const [openRowId, setOpenRowId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: students = [], isLoading } = useQuery({
    queryKey: ['firstYearStudents'],
    queryFn: fetchStudents,
  });

  const mutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['firstYearStudents'] });
    },
  });

 const columns = [
  {
    field: 'expand',
    headerName: '',
    width: 50,
    renderCell: (params) => (
      <IconButton
        aria-label="expand row"
        size="small"
        onClick={() =>
          setOpenRowId(openRowId === params.row.id ? null : params.row.id)
        }
      >
        {openRowId === params.row.id ? (
          <KeyboardArrowUpIcon />
        ) : (
          <KeyboardArrowDownIcon />
        )}
      </IconButton>
    ),
  },
  { field: 'registrationNo', headerName: 'Reg No', width: 180 },
  { field: 'session', headerName: 'Session', width: 120 },
  { field: 'name', headerName: 'Name', width: 140 },
  { field: 'fatherName', headerName: 'Father Name', width: 140 },
  { field: 'institute', headerName: 'Institute', width: 140 },
  { field: 'year', headerName: 'Year', width: 100 },
  { field: 'rollNo', headerName: 'Roll No', width: 120 },
  { field: 'totalMaxMarks', headerName: 'Max Marks', width: 120 },
  { field: 'totalTheoryObtained', headerName: 'Theory Obt', width: 120 },
  { field: 'totalPracticalObtained', headerName: 'Prac/Viva Obt', width: 130 },
  { field: 'totalObtained', headerName: 'Total Obt', width: 120 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 250,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button 
          variant="outlined" 
          color="primary"
          size="small"
          onClick={() => console.log('Edit', params.row.id)}
        >
          Edit
        </Button>
        <Button 
          variant="outlined" 
          color="error"
          size="small"
          onClick={() => console.log('Delete', params.row.id)}
        >
          Delete
        </Button>
        <Button 
          variant="outlined" 
          color="success"
          size="small"
          onClick={() => console.log('Download', params.row.id)}
        >
          Download
        </Button>
      </Box>
    ),
  },
];

  return (
    <Box sx={{ width: '100%' }}>
      <div className="flex justify-between items-center mb-4">
        <Button variant="contained" onClick={() => setFormOpen(true)}>
          Add New Student
        </Button>
      </div>
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={students}
          columns={columns}
          getRowId={(row) => row._id || row.id}
          rowHeight={60}
          loading={isLoading}
          hideFooterSelectedRowCount
          disableRowSelectionOnClick
        />
      </Box>

      {/* Expandable Course Info */}
      {students.map((student) => (
        <Collapse
          in={openRowId === student.id}
          timeout="auto"
          unmountOnExit
          key={student.id}
        >
          <Box
            sx={{
              margin: 2,
              padding: 2,
              border: '1px solid #ccc',
              borderRadius: 2,
              backgroundColor: '#f9f9f9',
            }}
            component={Paper}
          >
            <Typography variant="h6" gutterBottom>
              Courses for {student.name} ({student.registrationNo})
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Course</TableCell>
                  <TableCell align="right">Total Theory</TableCell>
                  <TableCell align="right">Total Practical</TableCell>
                  <TableCell align="right">Obtained Theory</TableCell>
                  <TableCell align="right">Obtained Practical</TableCell>
                  <TableCell align="right">Total Obtained</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {student.courses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell>{course.courseName}</TableCell>
                    <TableCell align="right">{course.totalTheory}</TableCell>
                    <TableCell align="right">{course.totalPractical}</TableCell>
                    <TableCell align="right">{course.obtainedTheory}</TableCell>
                    <TableCell align="right">{course.obtainedPractical}</TableCell>
                    <TableCell align="right">
                      {course.obtainedTheory + course.obtainedPractical}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      ))}

      <AddStudentForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={mutation.mutateAsync}
      />
    </Box>
  );
};

export default FirstYear;
