import { createFileRoute } from '@tanstack/react-router';
import { AppLayout } from '../../AppLayout';
import { useState } from 'react';

export const Route = createFileRoute('/garage/AddMaintenance')({
  component: RouteComponent,
});

function RouteComponent() {
  return(
	  <AppLayout>
		  <MaintenanceForm />
	  </AppLayout>
  );
}

function submitForm(e: React.SyntheticEvent) {
	e.preventDefault()
}

function MaintenanceForm() {
	const inputStyle = "bg-white/5 p-2 rounded"
	const [maintenanceItems, setMaintenanceItems] = useState<[]>()

	return(
		<form className="space-y-3 w-full">
			<label htmlFor='make'></label>
			<select 
				className={`${inputStyle} appearance-none w-full`} 
				name="make"
			>
				<option className="w-full" value="something">some options</option>
				<option className="w-full" value="something">some options</option>
			</select>
			<div className="flex flex-col">
				<label>Date</label>
				<input className={`${inputStyle}`} type="date"/>
			</div>
			<div className="flex flex-col">
				<label>Miles</label>
				<input className={`${inputStyle}`} type="number"/>
			</div>
			<div className="flex flex-col">
				<label>Details</label>
				<textarea className={`${inputStyle}`}></textarea>
			</div>
			<div>
				<button onClick={submitForm} className="rounded bg-blue-600 py-2 w-full hover:cursor-pointer">Submit</button>
			</div>
		</form>
	)
}
