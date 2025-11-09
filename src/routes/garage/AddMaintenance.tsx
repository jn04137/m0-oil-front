import { createFileRoute } from '@tanstack/react-router';
import { AppLayout } from '../../AppLayout';

export const Route = createFileRoute('/garage/AddMaintenance')({
  component: RouteComponent,
});

function RouteComponent() {
  return(
	  <AppLayout>
  		<div>Hello "/garage/AddMaintenance"!</div>
	  </AppLayout>
  );
}
