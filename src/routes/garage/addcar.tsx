import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AppLayout } from '../../AppLayout'
import React, { useEffect, useState } from 'react'
import type { ICarMake } from '../../types'

export const Route = createFileRoute('/garage/addcar')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
	  <AppLayout>
		  <Content />
	  </AppLayout>
  )
}

const inputStyle = "bg-white/5 p-2 rounded"

function Content() {
    const [isLoading, setIsLoading] = useState(true)

	const [make, setMake] = useState("")
	const [model, setModel] = useState("")
	const [trim, setTrim] = useState("")
	const [year, setYear] = useState(0)
	const [vin, setVIN] = useState("")

    const [carMakes, setCarMakes] = useState<ICarMake[]>([])
	const nav = useNavigate({from: "/garage"})

	async function submitCar(e: React.SyntheticEvent, make: string, 
							 model: string, trim: string, year: number, vin: string) {
		e.preventDefault()
		const url = `${import.meta.env.VITE_SERVER_ADDR}/car/garage/create`
		try {
			const res = await fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					make,
					model,
					trim,
					year,
					vin
				})
			})
			console.log("submitCar pressed")
			if(res.ok) {
				nav({to: "/garage"})
			}

		} catch(err) {
			console.error(err)
		}
	}
    
    async function getCarMakes() {
        try {
            const url = `${import.meta.env.VITE_SERVER_ADDR}/car/listOfMakes`
            const res = await fetch(url, {
                method: 'GET'
            })
            const data = await res.json()
            setCarMakes(data)
            setIsLoading(false)
        } catch(err) {
            console.error(err)
        }
    }
 
    useEffect(() => {
        getCarMakes()
    }, [])

    console.log("Car makes: ", carMakes)
    if(isLoading) {
        return <div>Loading...</div>
    }

	return(
		<form className="space-y-3 w-full">
			<h1 className='text-2xl font-bold'>Add Car</h1>
			<div className="flex flex-col">
				<label htmlFor='make'>Make</label>
				<select 
					className={inputStyle} 
					name="make"
					onChange={e => setMake(e.target.value)}
				>
                    {carMakes.map((car: ICarMake) => {
                        return <option key={car.id} value={car.id}>{car.make}</option>
                    })}
                </select>
			</div>
			<div className="flex flex-col">
				<label htmlFor='model'>Model</label>
				<input 
					className={inputStyle} 
					type="text" 
					name="model"
					onChange={e => setModel(e.target.value)}
				/>
			</div>
			<div className="flex flex-col">
				<label htmlFor='model'>Trim</label>
				<input 
					className={inputStyle} 
					type="text" 
					name="trim"
					onChange={e => setTrim(e.target.value)}
				/>
			</div>
			<div className="flex flex-col">
				<label htmlFor='year'>Year</label>
				<input 
					className={inputStyle} 
					type="number" 
					name="year"
					onChange={e => setYear(parseInt(e.target.value))}
				/>
			</div>
			<div className="flex flex-col">
				<label htmlFor='vin'>VIN</label>
				<input 
					className={inputStyle} 
					type="text" 
					name="vin"
					onChange={e => setVIN(e.target.value)}
				/>
			</div>
			<button 
				onClick={async (e) => await submitCar(e, make, model, trim, year, vin)} 
				className="bg-blue-600 rounded py-2 w-full hover:cursor-pointer"
			>
				Submit
			</button>
		</form>
	)
}

