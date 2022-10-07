import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import CoinInfo from '../../components/helpers/coinInfo'

export default function GenerateWallet(){
    const [coins, setCoins] = useState([])
    const [selectedCoin, setSelectedCoin] = useState(null)
    const [loading,setLoading] = useState(false)

    const router = useRouter()

    useEffect(()=>{
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/coins`

        setLoading(true)
        fetch(apiUrl)
        .then((res) => res.json())
        .then((data)=>{
            setCoins(data)
            setLoading(false)
        })
    }, [])

    function onSelectCoin(e){
        setSelectedCoin({
            id: e.target.id
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/addresses/generate/`
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ coin_id: selectedCoin.id })
        })
        .then(res => res.json())
        .then(data => {
            router.push(`/addresses/${data.id}`)
        })
    }

    if(coins){
        return (
            <div className="container mx-auto my-10">
                <div className="text-center mx-auto p-6 max-w-lg bg-white rounded-lg border border-gray-200 shadow-md">
                    <h1 className="text-2xl font-semibold py-10">Choose a cryptocurrency</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="my-8 flex gap-2 justify-center">
                            {coins.map(coin => {
                                var coinMeta = CoinInfo(coin.id)
                                if(selectedCoin && selectedCoin.id == coin.id){
                                    return (
                                        <button key={coin.id} id={coin.id} type="button" className="w-24 p-2 rounded-full border-4 border-blue-600 hover:border-blue-400">
                                            <img src={coinMeta.logo} alt={coinMeta.name} />
                                        </button>
                                    )
                                } else {
                                    return (
                                        <button onClick={onSelectCoin} key={coin.id} type="button" className="w-24 p-2 rounded-full border-4 border-gray-400 hover:border-blue-400">
                                            <img id={coin.id} src={coinMeta.logo} alt={coinMeta.name} />
                                        </button>
                                    )
                                }
                            })}
                        </div>
                        {selectedCoin ?
                        <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm my-8 px-5 py-3 mb-2">
                            Generate Wallet
                        </button>
                        :
                        <button type="submit" className="text-white bg-purple-400 font-medium rounded-lg text-sm my-8 px-5 py-3 mb-2" disabled>
                            Generate Wallet
                        </button>
                        }
                    </form>
                </div>
            </div>
        )
    }
}