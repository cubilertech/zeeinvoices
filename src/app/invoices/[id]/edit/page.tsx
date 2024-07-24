'use client';
import { Typography } from '@mui/material'
import { useParams } from 'next/navigation'
import React from 'react'

const InvoiceEdit = () => {
    const {id} = useParams<{ id: string }>()
  return (
    <div>
      <Typography variant='h1'>Edit Pagr</Typography>{id}
      <Typography variant='h1'>Edit Pagr</Typography>{id}
    </div>
  )
}

export default InvoiceEdit
