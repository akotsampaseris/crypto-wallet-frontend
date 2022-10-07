import { useState, useEffect } from 'react'
import Link from 'next/link'
import CoinInfo from '../../components/helpers/coinInfo'

export default function AddressList(){
    const [loading, setLoading] = useState(false)
    const [wallets, setWallets] = useState([])
    const [pagination, setPagination] = useState({})

    useEffect(() => {
        setLoading(true);
        
        let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/addresses`;
        fetch(apiUrl)
            .then((res)=>res.json())
            .then((data) =>{
                setPagination({
                    totalItems: data.count,
                    totalPages: data.total_pages,
                    pageSize: data.page_size,
                    itemsInPage: data.results.length,
                    current: data.current,
                    previous: data.previous,
                    next: data.next
                })
                setWallets(data.results);
                setLoading(false);
            })
    }, [])

    function onPageSizeChange(e) {
        setLoading(true)

        let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/addresses` 
        apiUrl += `?page_size=${e.target.value}`

        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                setWallets(data.results)
                setPagination({
                    totalItems: data.count,
                    totalPages: data.total_pages,
                    pageSize: data.page_size,
                    itemsInPage: data.results.length,
                    current: data.current,
                    previous: data.previous,
                    next: data.next
                })
                setLoading(false)
            })
    }

    const onPageChange = (e) => {
        setLoading(true);
        fetch(pagination[e.target.id])
            .then((res)=>res.json())
            .then((data) =>{
                setPagination({
                    totalItems: data.count,
                    totalPages: data.total_pages,
                    pageSize: data.page_size,
                    itemsInPage: data.results.length,
                    current: data.current,
                    previous: data.previous,
                    next: data.next
                })
                setWallets(data.results);
                setLoading(false);
            })

    }

    if (loading) return (
        <div className="container w-1/12 my-6 py-6 mx-auto">
            <div className="text-center">
                <div role="status">
                    <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    )

    return (
        <div className="container mt-5 mx-auto px-5"> 
            <div className="flex justify-between items-center">
                <h1 className='text-lg font-semibold my-2 py-2'>Address List</h1>
                <div className='flex gap-2 items-center'>
                    <label className="text-sm font-medium text-gray-900">
                        Items per page: 
                    </label>
                    <select value={pagination.pageSize} onChange={onPageSizeChange} name="pageSize" id="pageSize" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <option key={5} value={5}>5</option>
                        <option key={10} value={10}>10</option>
                        <option key={25} value={25}>25</option>
                        <option key={50} value={50}>50</option>
                        <option key={100} value={100}>100</option>
                    </select>
                </div>
            </div>

            <div className="h-80 overflow-y-auto relativeshadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                ID
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Coin
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Address
                            </th>
                            <th scope="col" className="py-3 px-6">
                                <span className="sr-only">Details</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {wallets.map(wallet => {
                        var coinMeta = CoinInfo(wallet.coin)
                        return (
                            <tr key={wallet.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="py-4 px-6">
                                    {wallet.id}
                                </td>
                                <td className="py-4 px-6 w-20">
                                    <img src={coinMeta.logo} />
                                </td>
                                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {wallet.address}
                                </th>
                                <td className="py-4 px-6 text-right">
                                    <Link href={{
                                        pathname: '/addresses/[addressID]',
                                        query: { addressID: wallet.id },
                                    }}>
                                        <a className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                            Details
                                        </a>
                                    </Link>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <AddressPagination pagination={pagination} onPageChange={onPageChange} />
        </div>
    )
}

function AddressPagination(params){
    const onPageChange = params.onPageChange
    const pagination = params.pagination
    
    const pageFirstItem = (pagination.current-1)*pagination.pageSize + 1
    const pageLastItem = (pagination.current-1)*pagination.pageSize + pagination.itemsInPage

    return (
    <div className="container flex justify-between my-4 py-4">
        <div>
            <p>Showing {pageFirstItem} - {pageLastItem} of {pagination.totalItems} addresses</p>
        </div>
        <div>
            {
                pagination.previous 
                ? <button id='previous' type='button' onClick={onPageChange} className="text-start py-2 px-3 text-blue-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-blue-700">
                    Previous
                </button> 
                : <button id='previous' type='button' onClick={onPageChange} className="text-start py-2 px-3 text-gray-500 bg-white rounded-l-lg border border-gray-300" disabled>
                    Previous
                </button>
            }
            {
                pagination.next 
                ? <button id='next' type='button' onClick={onPageChange} className="text-start py-2 px-3 text-blue-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-blue-700">
                    Next
                </button> 
                : <button id='previous' type='button' onClick={onPageChange} className="text-start py-2 px-3 text-gray-500 bg-white rounded-r-lg border border-gray-300" disabled>
                    Next
                </button>
            }
        </div>
    </div>
    )
}