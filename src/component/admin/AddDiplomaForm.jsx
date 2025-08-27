"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiplomaCertificateSchema } from "@/types/DiplomaCertificateSchema";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const AddDiplomaForm = ({ open, handleClose, onAdded }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(DiplomaCertificateSchema),
  });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post("/api/diploma-certificate", formData);
      return res.data;
    },
    onSuccess: (result) => {
      if (result.success) {
        reset();
        handleClose();
        onAdded?.();
      } else {
        alert("Error: " + result.error);
      }
    },
    onError: (error) => {
      console.error(error);
      alert("Unexpected error");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Add New Student</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            {[
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
              { label: "Serial Number", name: "serialNumber" },
              { label: "Total Marks", name: "totalMarks", type: "number" },
            ].map(({ label, name, type }) => (
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
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button type="submit" variant="contained" disabled={mutation.isPending}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddDiplomaForm;
