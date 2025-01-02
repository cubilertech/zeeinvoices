"use client";

import { getSignature } from "@/redux/features/invoiceSetting";
import {
    getInvoiceSignature,
    getInvoiceSignatureDesignation,
    setInvoiceSignature,
    setInvoiceSignatureDesignation,
} from "@/redux/features/invoiceSlice";
import { palette } from "@/theme/palette";
import { googleImage } from "@/utils/common";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface DisplaySignatureProps {}

const DisplaySignature: FC<DisplaySignatureProps> = ({}) => {
    const dispatch = useDispatch();
    const isSignature = useSelector(getSignature);
    const invoiceSignature = useSelector(getInvoiceSignature);
    const invoiceSignatureDesignation = useSelector(
        getInvoiceSignatureDesignation
    );

    useEffect(() => {
        if (!isSignature) {
            dispatch(setInvoiceSignature(""));
            dispatch(setInvoiceSignatureDesignation(""));
        }
    }, [isSignature, dispatch]);

    return (
        <Stack sx={{
            justifyContent: "end",
            alignItems: "center",
            width: '100%'
        }}>
            <Stack
                sx={{
                    px: "20px",
                    mt: { sm: "0px", xs: "20px" },
                    width: { sm: "fit-content", xs: "100%" },
                    alignSelf: {xs: 'center', sm: 'start'},
                    alignItems: 'center'
                }}
            >
                {invoiceSignature && isSignature && (
                    <>
                        <Box
                            sx={{
                                width: "190px",
                                height: "90px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                            }}
                        >
                            <Image
                                src={googleImage(invoiceSignature as string)}
                                alt="Selected Logo"
                                width={190}
                                height={90}
                                style={{
                                    objectFit: "contain",
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                }}
                                unoptimized
                            />
                        </Box>
                    </>
                )}
            </Stack>
            <Stack sx={{
                px: "20px",
                mt: { sm: "0px", xs: "20px" },
                width: { sm: "auto", xs: "100%" },
                alignSelf: 'start'
            }}>
                <Typography
                    variant="text-md-regular"
                    sx={{
                        overflow: "hidden",
                        color: palette.color.gray[610],
                        textAlign: 'center'
                    }}
                >
                    {invoiceSignatureDesignation}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default DisplaySignature;
