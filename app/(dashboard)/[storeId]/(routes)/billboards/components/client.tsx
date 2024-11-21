"use client"

import { useParams, useRouter } from "next/navigation"

import { BillboardColumn, columns } from "./columns"
import { useMediaQuery } from 'react-responsive';

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"
import { Plus } from "lucide-react"
import LedSeparator from "@/components/ui/led-separator";

interface BillboardClientProps {
    data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {
    const params = useParams();
    const router = useRouter();
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

    return (    
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboards (${data.length})`}
                    description="Manage advertisements for your store"
                />
                <Button className="text-white bg-gradient-to-r from-red-500 to-orange-500" size={isMobile ? "icon" : "default"} onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    {isMobile ? (<Plus className="h-4 w-4 " />) : (<Plus className="mr-2 h-4 w-4" />)}
                {!isMobile && "Add New"}
                </Button>
            </div>
            <LedSeparator />
            <DataTable columns={columns} data={data} searchKey="label" />
            <Heading
                title="API"
                description="API calls for Billboards"
            />
            <LedSeparator />
            <ApiList entityName="billboards" entityIdName="billboardId" />
        </>
    )
}