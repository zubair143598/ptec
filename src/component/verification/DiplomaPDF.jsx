import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  heading: { textAlign: "center", fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  section: { marginBottom: 10 },
  label: { fontWeight: "bold" },
  table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 1 },
  tableRow: { flexDirection: "row" },
  tableCell: { borderStyle: "solid", borderWidth: 1, padding: 5, flexGrow: 1 }
});

const DiplomaPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>APPROVED RESULT DETAILS</Text>

      <View style={styles.section}>
        <Text>
          It is to verify that the Diploma/Certificate issued in favor of Mr/Miss/Mrs. <Text style={styles.label}>{data.name}</Text> 
          {" "}S/D/W/O <Text style={styles.label}>{data.fatherName}</Text>, vide Registration No: <Text style={styles.label}>{data.registrationNumber}</Text> 
          {" "}with Roll No: <Text style={styles.label}>{data.rollNo}</Text> trained and evaluated by <Text style={styles.label}>{data.institute}</Text> 
          {" "}in the trade of <Text style={styles.label}>{data.certificateName}</Text> ({data.duration}) is found genuine according to our office record with the following transcript.
        </Text>
      </View>

      <Text style={{ marginTop: 15, fontWeight: "bold" }}>MARKS CARD DETAILS</Text>
      <View style={[styles.table, { marginTop: 10 }]}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Total Marks</Text>
          <Text style={styles.tableCell}>{data.totalMarks}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Theory Marks</Text>
          <Text style={styles.tableCell}>{data.theoryMarks}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Practical Marks</Text>
          <Text style={styles.tableCell}>{data.practicalMarks}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Marks Obtained</Text>
          <Text style={styles.tableCell}>{data.obtainedMarks}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Percentage</Text>
          <Text style={styles.tableCell}>{data.percentage}%</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Grade</Text>
          <Text style={styles.tableCell}>{data.grade}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default DiplomaPDF;
