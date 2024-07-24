'use client';
import CreateInvoice from '@/appPages/CreateInvoice';
import { useParams } from 'next/navigation'
import React from 'react'

const InvoiceEdit = () => {
    const {id} = useParams<{ id: string }>()
  return (
    <>
     <CreateInvoice /> 
    </>
  )
}

export default InvoiceEdit
