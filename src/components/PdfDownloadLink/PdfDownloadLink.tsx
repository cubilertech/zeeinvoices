'use client';
import PdfView from '@/appPages/PdfView/pdfView';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useSession } from 'next-auth/react';
import React, { FC } from 'react'

interface PdfDownloadLinkProps {
    InvSetting: any;
    InvDetails: any;
    summaryDetail: any;
    children:any;
  }

const PdfDownloadLink : FC<PdfDownloadLinkProps> = ({InvSetting,InvDetails,summaryDetail,children}) => {
  const { data: session } = useSession();
  return (
    <>
     <PDFDownloadLink
            document={
              <PdfView
                invSetting={InvSetting}
                invDetails={InvDetails}
                Summary={summaryDetail}
                user={session?.user}
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
