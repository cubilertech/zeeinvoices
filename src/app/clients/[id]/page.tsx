'use client';
import ClientSingleDetail from '@/components/AllClients/ClientSingleDetail'
import { useParams } from 'next/navigation'
import React from 'react'

const ClientSingleView = () => {
  const {id} = useParams();
  return (
    <div>
      <ClientSingleDetail id={id} />
    </div>
  )
}

export default ClientSingleView
