import Link from "next/link";
import { Navbar } from "flowbite-react";

export default function Header(){
    return (
        <div className="container mx-auto">
            <Navbar fluid={true} rounded={true}>
                <Link href='/'>
                    <a>
                    <div className="flex">
                        <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="mr-3 h-6 sm:h-9"
                        alt="Logo"
                        />
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                            Crypto Wallet
                        </span>
                    </div>
                    </a>
                </Link>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/addresses/">
                        Address List
                    </Link>
                    <Link href="/addresses/generate">
                        Generate Wallet
                    </Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}