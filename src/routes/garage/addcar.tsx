import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AppLayout } from '../../AppLayout'
import React, { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import type { ICarMake, ICarModel } from '../../types'

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

	const [make, setMake] = useState("None")
	const [model, setModel] = useState("")
	const [trim, setTrim] = useState("")
	const [year, setYear] = useState(0)
	const [vin, setVIN] = useState("")
	const [visibility, setVisibility] = useState("")

	const [modelOptions, setModelOptions] = useState<string[]>([])

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
					make: make,
					model: model,
					trim: trim,
					year: year,
					vin: vin,
					isPrivate: (visibility === "true" ? true : false)
				})
			})
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

    if(isLoading) {
        return <div>Loading...</div>
    }

	return(
		<form className="space-y-3 w-full">
			<h1 className='text-2xl font-bold'>Add Car</h1>
			<div className="flex flex-col grid">
				<label htmlFor='make'>Make</label>
				<select 
					className={`${inputStyle} appearance-none`} 
					name="make"
					onChange={e => setMake(e.target.value)}
				>
                    {carMakes.map((car: ICarMake) => {
                        return <option className='w-full' key={car.id} value={car.make}>{car.make}</option>
                    })}
                </select>
			</div>
			<CarModelSelect 
				make={make}
				setModel={setModel}
				modelOptions={modelOptions}
				setModelOptions={setModelOptions}
			/>
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
			<div className="flex flex-col grid">
				<label htmlFor='make'>Visibility</label>
				<select 
					className={`${inputStyle} appearance-none`} 
					name="visibility"
					onChange={e => setVisibility(e.target.value)}
				>
                    <option value="false">public</option>
                    <option value="true">private</option>
                </select>
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

async function getCarModels(make: string, setModelOptions: Dispatch<SetStateAction<string[]>>) {
	try {
		const url = `${import.meta.env.VITE_SERVER_ADDR}/car/listOfModels/${make}`
		console.log("Getting car models at ", url)
		const res = await fetch(url, {
			method: 'GET'
		})
		const models = await res.json()
		setModelOptions(models)
	} catch(err) {
		console.error(err)
	}
}

function CarModelSelect({make, setModel, modelOptions, setModelOptions}: {
	make: string,
	setModel: Dispatch<SetStateAction<string>>,
	modelOptions: string[],
	setModelOptions: Dispatch<SetStateAction<string[]>> 
}) {
	useEffect(() => {
		getCarModels(make, setModelOptions)
	}, [make])

	if(make !== "None" && make !== "Other" && modelOptions !== null) {
		return (
			<div className="flex flex-col">
				<label htmlFor='model'>Model</label>
				<select 
					className={`${inputStyle} appearance-none`} 
					name="model"
					onChange={e => setModel(e.target.value)}
				>
					{modelOptions.map((model: ICarModel) => {
						return <option key={model.id}>{model.model}</option>
					})}
				</select>
			</div>
		)
	}
}
