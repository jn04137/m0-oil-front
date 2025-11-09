import { createFileRoute, Link } from '@tanstack/react-router';
import { AppLayout } from '../../AppLayout';
import { useEffect, useState } from 'react';
import type { ICar } from '../../types';

import { Route as addMaintenancePage } from "./AddMaintenance";

export const Route = createFileRoute('/garage/$carId')({
  component: RouteComponent,
})

function RouteComponent() {

    return(
        <AppLayout>
            <Content />
        </AppLayout>
    )
}

function Content() {
    const [car, setCar] = useState<ICar>()
    async function getCarData(carId: string) {
        const url = `${import.meta.env.VITE_SERVER_ADDR}/car/garage/mycars/${carId}`
        try {
            const req = await fetch(url)
            const car:ICar = await req.json()
            setCar(car)
        } catch(err) {
            console.error(err)
        }
    }

    const { carId } = Route.useParams()
    useEffect(() => {
        getCarData(carId)
    }, [])

    return(
        <div className="w-full">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold">{car?.model}</h1>
                    <h2 className="italic">{car?.make}</h2>
                </div>
                <div>
                    <h2 className="text-2xl items-center">{car?.year}</h2>
                </div>
            </div>
            <div className="py-4 space-y-2">
                <h1 className="text-2xl italic">Maintenance</h1>
				<AddMaintenance />
                <MaintenanceCard />
                <MaintenanceCard />
                <MaintenanceCard />
                <MaintenanceCard />
                <MaintenanceCard />
            </div>
        </div>
    )
}

function MaintenanceCard() {
    return(
        <div className="bg-white/5 rounded p-3">
            <h1 className="text-2xl">Maintenance Title</h1>
            <h2 className="text-lg">Date</h2>
            <h2 className="text-lg">Miles</h2>
            <ul>
                <li>Oil Change</li>
                <li>Oil Filter Change</li>
                <li>Topped Off Windshield Wiper Fluid</li>
            </ul>
        </div>
    )
}

function AddMaintenance() {
	return(
		<div>
			<Link to={addMaintenancePage.to}>
				<div className="flex justify-center text-3xl bg-white/5 rounded p-5">
					+
				</div>
			</Link>
		</div>
	)
}


