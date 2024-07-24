'use client';
import { Button, } from '@mui/material'
import React from 'react'
import { Icon } from "../Icon";
import { useRouter } from 'next/navigation';

const CustomButton = () => {
    const route = useRouter();
  return (
    <Button
    onClick={()=>route.push('/invoices')}
      variant="outlined"
      size="small"
      startIcon={<Icon icon="invoiceIcon" width={15} height={15} />}
    >
      Invoices
    </Button>
  )
}

export default CustomButton
