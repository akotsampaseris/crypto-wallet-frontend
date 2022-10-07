import Link from 'next/link'
import { Card } from 'flowbite-react'

export default function Home() {
  return (
    <div>
      <main className='my-6'>
        <div className="container py-20 h-fit w-8/12 items-center flex justify-around mx-auto">
          <div className="max-w-sm">
            <Link href='/addresses'>
              <a>
              <Card>
                <img className='w-1/2 mx-auto' 
                  src='https://cdn-icons-png.flaticon.com/512/8378/8378842.png' />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Address List
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Check the wallets generated in our app.
                </p>
              </Card>
              </a>
            </Link>
          </div>
          <div className="max-w-sm">
            <Link href='/addresses/generate'>
              <a>
              <Card>
                <img className='w-1/2 mx-auto' 
                  src='https://cdn-icons-png.flaticon.com/512/4825/4825188.png' />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Generate Wallet
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Generate your own crypto wallet.
                </p>
              </Card>
              </a>
            </Link>
          </div>
        </div>
      </main>
      
    </div>
  )
}
