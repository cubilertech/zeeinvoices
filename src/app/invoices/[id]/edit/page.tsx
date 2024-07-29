'use client';
import CreateInvoice from '@/appPages/CreateInvoice';
import { setResetInvoiceSetting } from '@/redux/features/invoiceSetting';
import { setResetInvoice } from '@/redux/features/invoiceSlice';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const InvoiceEdit = () => {
    const {id} = useParams<{ id: string }>();
   

   

  return (
    <>
     <CreateInvoice type='edit' /> 
    </>
  )
}

export default InvoiceEdit
