'use client';

import {Box, Button, Container, Stack, Typography} from "@mui/material";
import {StarRounded, FacebookRounded, LinkRounded} from "@mui/icons-material";
import {grey} from "@mui/material/colors";
import {Icon} from "@/components/Icon";
import {useRouter} from "next/navigation";

const buttonsData = [
    {
        icon: <FacebookRounded sx={{color: '#3E5999', height: '50px', width: "50px"}}/>,
        label: "Facebook"
    },
    {
        icon: <Icon icon={"linkedinRounded"} height={48} width={48}/>,
        label: "LinkedIn"
    },
    {
        icon:
            <Stack sx={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', borderRadius: '50%', padding: '0.29rem', marginBottom: '0.125rem'}}>
                <Icon icon={"xIcon"} height={32} width={32}/>
            </Stack>
        ,
        label: "Twitter(X)"
    },
    {
        icon: <Icon icon={"instagramRounded"} height={44} width={44}/>,
        label: "Instagram"
    },
    {
        icon:
            <Stack sx={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: '50%', padding: '0.29rem', border: `1px solid ${grey[600]}`, marginBottom: '0.125rem'}}>
                <LinkRounded sx={{height: 32, width: 32, color: 'black'}} />
            </Stack>,
        label: "Copy Link"
    }
]

const InvoiceCreatedSuccessfully = () => {
    const router = useRouter();

    const handleNavigate = (path: string) : void => {
        router.push(path);
    }

    return(
        <Container maxWidth={'lg'}>
            <Stack sx={{alignItems: 'center', justifyContent: 'center', marginTop: {xs: '56px', md: '64px'}, rowGap: '1rem', paddingY: '3rem', textAlign: 'center'}}>
                <Icon icon={"invoiceSuccessIcon"} height={150} width={150} />
                <Typography variant='h6' sx={{fontSize: '2rem', fontWeight: '600', color: 'black', marginTop: '0.75rem'}}>
                    Thank you for invoicing with us!
                </Typography>
                <Typography variant='h6' sx={{fontSize: '1.05rem', color: grey[700], textAlign: 'center'}}>
                    Your invoice has been generated, if the invoice did not open automatically than you can find it in your
                    download folder. A copy has also been saved in your device. You can return to you invoices history page to
                    make changes to the invoice any time.
                </Typography>
                <Button onClick={()=> handleNavigate("/")} variant='outlined' sx={{borderColor: '#3210EF', borderRadius: '0.25rem', paddingX: '2.5rem !important', marginBottom: '2rem'}}>
                    Back to Home
                </Button>

                <Typography variant='h6' sx={{fontSize: '1rem', fontWeight: '600', color: 'black'}}>
                    How was your experience? Let others know.
                </Typography>

                <Button startIcon={<StarRounded />} variant='contained' sx={{
                    backgroundColor: '#3210EF',
                    '&:hover': {
                        backgroundColor: '#3210EF',
                    },
                    borderRadius: '0.25rem',
                    marginBottom: '2rem'
                }}>
                    Review us on Trustpilot
                </Button>

                <Typography variant='h6' sx={{fontSize: '1rem', fontWeight: '600', color: 'black'}}>
                    Share with Friends.
                </Typography>

                <Stack direction='row' sx={{alignItems: 'center', justifyContent: 'center', columnGap: '2rem', flexWrap: 'wrap', rowGap: '1rem'}}>
                    {buttonsData.map((button, index) =>(
                        <Stack key={index} sx={{cursor: 'pointer', alignItems: 'center', textAlign: 'center', justifyContent: 'end', height: '75px'}}>
                            {button.icon}
                            <Typography variant='body2' sx={{marginTop: '1rem'}}>{button.label}</Typography>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Container>
    )
}

export default InvoiceCreatedSuccessfully;