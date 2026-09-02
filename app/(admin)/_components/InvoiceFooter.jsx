"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";

/**
 * The block below the totals, replicating the existing HFMC tax invoice:
 * three bordered cells — bank details, terms, and the authorised signatory.
 *
 * Uses real table borders rather than MUI Cards because this block is printed
 * far more often than it is read on screen, and browsers render 1px collapsed
 * borders predictably on paper where box-shadows and radii do not.
 */

const CELL = {
  border: "1px solid",
  borderColor: "#c9ced6",
  p: 1.5,
  verticalAlign: "top",
};

function Heading({ children, align }) {
  return (
    <Typography variant="subtitle2" sx={{ fontSize: 12, mb: 1, textAlign: align }}>
      {children}
    </Typography>
  );
}

function Line({ children }) {
  return (
    <Typography variant="body2" sx={{ fontSize: 11, lineHeight: 1.8 }}>
      {children}
    </Typography>
  );
}

export default function InvoiceFooter({ bank, signatory, terms, signedAt }) {
  const stampDate = signedAt ? new Date(signedAt) : null;

  return (
    <Box
      component="table"
      sx={{ width: "100%", borderCollapse: "collapse", mt: 3, tableLayout: "fixed" }}
    >
      <Box component="tbody">
        <Box component="tr">
          {/* ------------------------------------------- bank details */}
          <Box component="td" sx={{ ...CELL, width: "38%" }}>
            <Heading>Bank Details</Heading>

            <Stack direction="row" spacing={1.5}>
              <Box sx={{ flexShrink: 0 }}>
                {bank.upiQrImage ? (
                  <Box
                    component="img"
                    src={bank.upiQrImage}
                    alt="UPI QR"
                    sx={{ width: 68, height: 68, display: "block" }}
                  />
                ) : (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      width: 68,
                      height: 68,
                      border: "1px dashed",
                      borderColor: "#c9ced6",
                      color: "text.disabled",
                    }}
                  >
                    <QrCode2RoundedIcon fontSize="small" />
                    <Typography sx={{ fontSize: 8 }}>UPI QR</Typography>
                  </Stack>
                )}
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Line>Name : {bank.bankName}</Line>
                <Line>Account No. : {bank.accountNumber}</Line>
                <Line>IFSC code : {bank.ifsc}</Line>
                <Line>Account holder&apos;s name : {bank.accountHolder}</Line>
              </Box>
            </Stack>
          </Box>

          {/* ------------------------------------------------- terms */}
          <Box component="td" sx={{ ...CELL, width: "32%" }}>
            <Heading>Terms and conditions</Heading>
            <Line>{terms}</Line>
          </Box>

          {/* --------------------------------------------- signatory */}
          <Box component="td" sx={{ ...CELL, width: "30%" }}>
            <Typography variant="body2" sx={{ fontSize: 11, textAlign: "center", mb: 0.5 }}>
              For : {signatory.company}
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{ minHeight: 56 }}
            >
              {signatory.signatureImage ? (
                <Box
                  component="img"
                  src={signatory.signatureImage}
                  alt="Signature"
                  sx={{ maxHeight: 52, maxWidth: "55%" }}
                />
              ) : (
                <Typography
                  sx={{
                    fontFamily: "Georgia, serif",
                    fontSize: 20,
                    lineHeight: 1.15,
                    color: "#1a1a1a",
                  }}
                >
                  {signatory.name}
                </Typography>
              )}

              {signatory.digitallySigned && (
                <Box sx={{ borderLeft: "1px solid #9aa3b2", pl: 1 }}>
                  <Typography sx={{ fontSize: 8, lineHeight: 1.5, color: "#1f4fd8" }}>
                    Digitally signed by
                    <br />
                    {signatory.name}
                    {stampDate && (
                      <>
                        <br />
                        Date: {stampDate.getFullYear()}.
                        {String(stampDate.getMonth() + 1).padStart(2, "0")}.
                        {String(stampDate.getDate()).padStart(2, "0")}{" "}
                        {String(stampDate.getHours()).padStart(2, "0")}:
                        {String(stampDate.getMinutes()).padStart(2, "0")}:
                        {String(stampDate.getSeconds()).padStart(2, "0")} +05&apos;30&apos;
                      </>
                    )}
                  </Typography>
                </Box>
              )}
            </Stack>

            <Typography
              variant="subtitle2"
              sx={{ fontSize: 11, textAlign: "center", mt: 0.5 }}
            >
              Authorized Signatory
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
