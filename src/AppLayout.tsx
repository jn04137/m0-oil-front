export const AppLayout = ({children}: {
    children: any
}) => {
    return (
        <div className="dark:bg-[#121212] dark:text-white min-h-screen max-w-screen">
            <Navbar/>
            <main className="flex pt-4 justify-center grow px-5">
                {children}
            </main>
        </div>
    )
}

const Navbar = () => {
    return(
        <div className="flex justify-between px-4 py-2">
            <div>
                <h1 className="text-xl font-bold">v0_oil</h1>
            </div>
            <div className="flex space-x-5">
                <div>Home</div>
                <div>My Garage</div>
                <div>About</div>
            </div>
        </div>
    )
}
