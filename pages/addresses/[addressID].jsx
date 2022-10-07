import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { Card } from 'flowbite-react'

import CoinInfo from '../../components/helpers/coinInfo'

export default function GenerateWallet(){
    const router = useRouter()
    const { addressID } = router.query
    const [wallet, setWallet] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        if(router.isReady){
            let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/addresses/address/${addressID}`;

            fetch(apiUrl)
                .then((res)=>res.json())
                .then((data) =>{
                    setWallet(data);
                    setLoading(false);
                })
        }
    }, [router.isReady])

    if(wallet ){
        const coinMeta = CoinInfo(wallet.coin)
        return (
            <div className="container mx-auto my-6">
                <div className="mx-auto max-w-md">
                    <Card>
                        <img className='w-1/2 mx-auto' 
                        src={coinMeta.logo} />
                        <p className="font-bold tracking-tight text-gray-900">
                            {coinMeta.name} Wallet
                        </p>
                        <p className="font-normal text-gray-700">
                            {wallet.address}
                        </p>
                        <p className="text-sm text-gray-500">
                            ID: {wallet.id}
                        </p>
                        <p className="text-sm text-gray-500">
                            Created at: {new Date(wallet.created_at).toLocaleDateString("default")}
                        </p>
                    </Card>
                </div>
                <div className="my-6 w-143 mx-auto text-center">
                    <Link href="/addresses/">
                    <a>
                        <p className="text-blue-700">Address List</p>
                        <img src="https://cdn-icons-png.flaticon.com/512/8591/8591857.png" alt="Go back" className="w-14 mx-auto"/>
                    </a>
                    </Link>
                </div>
            </div>
        )
    }
}