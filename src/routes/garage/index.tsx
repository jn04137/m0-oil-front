import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '../../AppLayout'
import { useEffect, useState } from 'react';
import type { ICar } from '../../types';

export const Route = createFileRoute('/garage/')({
  component: RouteComponent,
})

function RouteComponent() {
    const [cars, setCars] = useState<ICar[]>([])

    async function getCars() {
        const url = `http://${import.meta.env.VITE_SERVER_ADDR}/car/garage/mycars`
        try {
            const data = await fetch(url)
            setCars(await data.json())
        } catch(err) {
            console.error(err)
        }
    }
    
    useEffect(() => {
        getCars()
    }, [])

    return(
        <AppLayout>
            <div className="w-full space-y-3">
                <h1 className="text-3xl">My Garage</h1>
                <div className="space-y-4">
                    { cars.map((car: ICar, index: number) => {
                        return <CarCard key={index} car={car} />
                    }) }
                </div>
            </div>
        </AppLayout>
  ) 
}

function CarCard({car}: {
    car: ICar
}) {
    return(
        <div className="bg-white/5 p-3 rounded flex justify-between">
            <div>
                <h1 className="text-2xl font-bold">{car.model}</h1>
                <h2 className="italic">{car.make}</h2>
                <h2 className="italic">{car.year}</h2>
            </div>
            <div className="flex flex-col justify-end">
                <h2 className="italic">{car.vin}</h2>
            </div>
        </div>
    )
}
