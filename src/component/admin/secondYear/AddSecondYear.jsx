"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { studentFormSchema } from "../../../types/secondYear";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

export const AddSecondYear = ({ open, onClose, onSubmit }) => {
 const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      session: "",
      name: "",
      fatherName: "",
      institute: "",
      year: "",
      courses: [
        {
          courseName: "",
          totalTheory: 0,
          totalPractical: 0,
          obtainedTheory: 0,
          obtainedPractical: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Student</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gap={2}
            mb={3}
          >
            <TextField
              {...register("session")}
              label="Session"
              error={!!errors.session}
              helperText={errors.session?.message}
              fullWidth
              margin="normal"
            />
            <TextField
              {...register("name")}
              label="Name"
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
              margin="normal"
            />
            <TextField
              {...register("fatherName")}
              label="Father's Name"
              error={!!errors.fatherName}
              helperText={errors.fatherName?.message}
              fullWidth
              margin="normal"
            />
            <TextField
              {...register("institute")}
              label="Institute"
              error={!!errors.institute}
              helperText={errors.institute?.message}
              fullWidth
              margin="normal"
            />
            <TextField
              {...register("year")}
              select
              label="Year"
              error={!!errors.year}
              helperText={errors.year?.message}
              fullWidth
              margin="normal"
              SelectProps={{ native: true }}
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
            </TextField>
            <TextField
  {...register('firstYearTheoryObtained', { valueAsNumber: true })}
  label="First Year Theory Obtained"
  type="number"
  error={!!errors.firstYearTheoryObtained}
  helperText={errors.firstYearTheoryObtained?.message}
  fullWidth
  margin="normal"
/>
<TextField
  {...register('firstYearPracticalObtained', { valueAsNumber: true })}
  label="First Year Practical Obtained"
  type="number"
  error={!!errors.firstYearPracticalObtained}
  helperText={errors.firstYearPracticalObtained?.message}
  fullWidth
  margin="normal"
/>
 <TextField
              {...register("certificateName")}
              label="Certificate Name"
              error={!!errors.certificateName}
              helperText={errors.certificateName?.message}
              fullWidth
              margin="normal"
              />
          </Box>

          <Typography variant="h6" gutterBottom>
            Courses
          </Typography>
          {fields.map((field, index) => (
            <Paper key={field.id} sx={{ p: 2, mb: 2 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="subtitle1">Course {index + 1}</Typography>
                {index > 0 && (
                  <IconButton onClick={() => remove(index)} color="error">
                    <Remove />
                  </IconButton>
                )}
              </Box>
              <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                <TextField
                  {...register(`courses.${index}.courseName`)}
                  label="Course Name"
                  error={!!errors.courses?.[index]?.courseName}
                  helperText={errors.courses?.[index]?.courseName?.message}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  {...register(`courses.${index}.totalTheory`, {
                    valueAsNumber: true,
                  })}
                  label="Total Theory"
                  type="number"
                  error={!!errors.courses?.[index]?.totalTheory}
                  helperText={errors.courses?.[index]?.totalTheory?.message}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  {...register(`courses.${index}.totalPractical`, {
                    valueAsNumber: true,
                  })}
                  label="Total Practical"
                  type="number"
                  error={!!errors.courses?.[index]?.totalPractical}
                  helperText={errors.courses?.[index]?.totalPractical?.message}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  {...register(`courses.${index}.obtainedTheory`, {
                    valueAsNumber: true,
                  })}
                  label="Obtained Theory"
                  type="number"
                  error={!!errors.courses?.[index]?.obtainedTheory}
                  helperText={errors.courses?.[index]?.obtainedTheory?.message}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  {...register(`courses.${index}.obtainedPractical`, {
                    valueAsNumber: true,
                  })}
                  label="Obtained Practical"
                  type="number"
                  error={!!errors.courses?.[index]?.obtainedPractical}
                  helperText={
                    errors.courses?.[index]?.obtainedPractical?.message
                  }
                  fullWidth
                  margin="normal"
                />
              </Box>
            </Paper>
          ))}
          <Button
            startIcon={<Add />}
            onClick={() =>
              append({
                courseName: "",
                totalTheory: 0,
                totalPractical: 0,
                obtainedTheory: 0,
                obtainedPractical: 0,
              })
            }
            variant="outlined"
          >
            Add Course
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Student"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
