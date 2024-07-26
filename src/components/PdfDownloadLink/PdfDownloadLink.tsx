'use client';
import PdfView from '@/appPages/PdfView/pdfView';
import { Button } from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import React, { FC } from 'react'

interface PdfDownloadLinkProps {
    InvSetting: any;
    InvDetails: any;
    summaryDetail: any;
    children:any;
  }

const PdfDownloadLink : FC<PdfDownloadLinkProps> = ({InvSetting,InvDetails,summaryDetail,children}) => {
  return (
    <>
     <PDFDownloadLink
            document={
              <PdfView
                invSetting={InvSetting}
                invDetails={InvDetails}
                Summary={summaryDetail}
              />
            }
            fileName="ZeeInvoices"
          >
            {({ loading }) =>
              loading ? (
                <button>Loading Document...</button>
              ) : (
              children  
              )
            }
          </PDFDownloadLink>
    </>
  )
}

export default PdfDownloadLink
