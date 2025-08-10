  "use client";

  import React, { useState, useEffect } from "react";
  import { TextField, Button, Alert, Box, Typography } from "@mui/material";
  import axios from "axios";
  import { useRouter, useSearchParams } from "next/navigation";
  import Image from "next/image";
  import { generateVerificationPDF } from "@/utils/generateVerificationPDF"

  const Verification = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [rollNo, setRollNo] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // If there is a ?q= in the URL, auto-search it
    useEffect(() => {
      const queryRollNo = searchParams.get("q");
      if (queryRollNo) {
        setRollNo(queryRollNo);
        fetchStudent(queryRollNo);
      }
    }, [searchParams]);

    const fetchStudent = async (roll) => {
      setResult(null);
      setError(null);

      if (!roll) {
        setError("Please enter a roll number.");
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get("/api/diploma-certificate");
        const students = res.data?.data || [];

        const found = students.find(
          (student) => String(student.rollNo) === String(roll)
        );

        if (found) {
          setResult(found);
        } else {
          setError("No student found with that roll number.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while verifying the roll number.");
      } finally {
        setLoading(false);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // Update URL without reload
      router.push(`/verification?q=${rollNo}`);
      fetchStudent(rollNo);
    };

    return (
      <div className="max-w-[1140px] mx-auto px-4 py-12">
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Verification Code / Roll No:
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, margin: "0 auto" }}
        >
          <TextField
            type="number"
            label="Enter Roll No"
            fullWidth
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            inputProps={{ min: 0 }}
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Verifying..." : "Submit"}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {result && (
          <>
          <div className="max-w-[600px] mt-6 mx-auto">
            <div className="w-[340px] mx-auto my-4">

            <Image src="/newlogo.png" alt="Logo" layout="responsive" width={150} height={50} className="mb-4" />
            </div>
            <div className="border border-gray-300 border-t-0">
              <h3 className="bg-[#1c4a7e] text-center text-[22px] font-bold py-4 mb-4 text-white">Approved Result Details</h3>
              <div className="p-4">
                <p className="text-[18px]"> It is to verify that the Diploma/Certificate issued in favor of Mr/Miss/Mrs. <strong>{result.name}</strong>  S/D/W/O <strong> {result.fatherName}</strong>, vide Registration No: <strong> {result.registrationNumber}</strong> with Roll No: <strong> {result.rollNo}</strong> trained and evaluated by <strong>{result.institute}</strong> in the trade of <strong> {result.certificateName}</strong> (3 Years) is found genuine according to our office record with the following transcript.</p>
              </div>
            </div>
          </div>
          <div className="max-w-[600px] mt-6 mx-auto">
    <div className="border border-gray-300">
      {/* Header */}
      <h3 className="bg-[#1c4a7e] text-white text-center text-[18px] font-bold py-3 uppercase">
        Marks Card Details
      </h3>

      {/* Table */}
      <table className="w-full border-collapse">
        <tbody>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 font-semibold p-3 w-1/2">Total Marks</td>
            <td className="border border-gray-300 p-3">{result.totalMarks}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 font-semibold p-3">Theory Marks</td>
            <td className="border border-gray-300 p-3">{result.theoryMarks}</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 font-semibold p-3">Practical Marks</td>
            <td className="border border-gray-300 p-3">{result.practicalMarks}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 font-semibold p-3">Marks Obtained</td>
            <td className="border border-gray-300 p-3">{result.obtainedMarks}</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 font-semibold p-3">Percentage</td>
            <td className="border border-gray-300 p-3">{result.percentage}%</td>
          </tr>
          <tr>
            <td className="border border-gray-300 font-semibold p-3">Grade</td>
            <td className="border border-gray-300 p-3">{result.grade}</td>
          </tr>
          <tr>
  <td className="border border-gray-300 font-semibold p-3">
    Click on download button to download computerized verification
  </td>
  <td className="border border-gray-300 p-3">
    <button
      type="button"
      className="bg-amber-200 py-2 px-4"
      onClick={() => generateVerificationPDF(result)}
    >
      Download
    </button>
  </td>
</tr>
        </tbody>
      </table>
    </div>
  </div>

          </>
        )}
      </div>
    );
  };

  export default Verification;
