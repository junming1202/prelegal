"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { NdaFormData } from "@/lib/ndaTypes";
import {
  STANDARD_TERMS,
  LICENSE_NOTICE,
  buildCoverPageFields,
  buildSignatureRows,
} from "@/lib/ndaContent";

const styles = StyleSheet.create({
  page: {
    paddingVertical: 48,
    paddingHorizontal: 56,
    fontSize: 10,
    lineHeight: 1.5,
    color: "#1e293b",
    fontFamily: "Helvetica",
  },
  title: { fontSize: 16, fontFamily: "Helvetica-Bold", color: "#1e3a5f" },
  subtitle: { fontSize: 9, color: "#64748b", marginBottom: 18 },
  sectionHeading: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#475569",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 3,
    marginTop: 16,
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#64748b",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  fieldValue: { fontSize: 10, marginBottom: 8 },

  table: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 4,
    marginTop: 10,
  },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#f1f5f9" },
  tableRowLast: { flexDirection: "row" },
  cellLabel: {
    width: "20%",
    padding: 6,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#64748b",
    textTransform: "uppercase",
  },
  cellValue: { width: "40%", padding: 6, fontSize: 9 },

  clause: { flexDirection: "row", marginBottom: 8 },
  clauseNumber: { width: 16, fontFamily: "Helvetica-Bold" },
  clauseBody: { flex: 1 },
  clauseHeading: { fontFamily: "Helvetica-Bold" },

  license: { marginTop: 18, fontSize: 8, color: "#94a3b8" },
});

export default function NdaPdfDocument({ data }: { data: NdaFormData }) {
  const coverFields = buildCoverPageFields(data);
  const signatureRows = buildSignatureRows(data);

  return (
    <Document title="Mutual Non-Disclosure Agreement">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Mutual Non-Disclosure Agreement</Text>
        <Text style={styles.subtitle}>
          Common Paper Mutual NDA Standard Terms, Version 1.0
        </Text>

        {/* Cover page */}
        <Text style={styles.sectionHeading}>Cover Page</Text>
        {coverFields.map((field) => (
          <View key={field.label} wrap={false}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <Text style={styles.fieldValue}>{field.value}</Text>
          </View>
        ))}

        {/* Signature table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.cellLabel}> </Text>
            <Text style={[styles.cellValue, { fontFamily: "Helvetica-Bold" }]}>
              Party 1
            </Text>
            <Text style={[styles.cellValue, { fontFamily: "Helvetica-Bold" }]}>
              Party 2
            </Text>
          </View>
          {signatureRows.map((row) => (
            <View key={row.label} style={styles.tableRow}>
              <Text style={styles.cellLabel}>{row.label}</Text>
              <Text style={styles.cellValue}>{row.party1}</Text>
              <Text style={styles.cellValue}>{row.party2}</Text>
            </View>
          ))}
          <View style={styles.tableRowLast}>
            <Text style={styles.cellLabel}>Signature</Text>
            <Text style={[styles.cellValue, { paddingVertical: 18 }]}> </Text>
            <Text style={[styles.cellValue, { paddingVertical: 18 }]}> </Text>
          </View>
        </View>

        {/* Standard terms */}
        <Text style={styles.sectionHeading}>Standard Terms</Text>
        {STANDARD_TERMS.map((clause, idx) => (
          <View key={clause.heading} style={styles.clause}>
            <Text style={styles.clauseNumber}>{idx + 1}.</Text>
            <Text style={styles.clauseBody}>
              <Text style={styles.clauseHeading}>{clause.heading}. </Text>
              {clause.body}
            </Text>
          </View>
        ))}

        <Text style={styles.license}>{LICENSE_NOTICE}</Text>
      </Page>
    </Document>
  );
}
