"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiplomaCertificateSchema } from "../../types/DiplomaCertificateSchema";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const FIELDS = [
  { label: "Session", name: "session" },
  { label: "Name", name: "name" },
  { label: "Father Name", name: "fatherName" },
  { label: "Registration Number", name: "registrationNumber" },
  { label: "Institute", name: "institute" },
  { label: "Certificate Name", name: "certificateName" },
  { label: "Conducted", name: "conducted" },
  { label: "Theory Marks", name: "theoryMarks", type: "number" },
  { label: "Practical Marks", name: "practicalMarks", type: "number" },
  { label: "Issue Date", name: "certificateIssue" },
];

const EditDiplomaForm = ({ open, handleClose, student, onUpdated }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(DiplomaCertificateSchema),
    defaultValues: student ?? {},
  });

  /* refresh default values every time a new row is selected */
  useEffect(() => {
    if (student) reset(student);
  }, [student, reset]);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.put(
        `/api/diploma-certificate/${student.id}`,
        formData
      );
      return res.data;
    },
    onSuccess: (result) => {
      if (result.success) {
        handleClose();
        onUpdated?.(); // refetch table
      } else {
        alert("Error: " + result.error);
      }
    },
    onError: (err) => {
      console.error(err);
      alert("Unexpected error");
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Student</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            {FIELDS.map(({ label, name, type }) => (
              <Grid item xs={6} key={name}>
                <TextField
                  fullWidth
                  type={type || "text"}
                  label={label}
                  {...register(name)}
                  error={!!errors[name]}
                  helperText={errors[name]?.message}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={mutation.isPending}>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditDiplomaForm;
