import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '../AppLayout'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
      <AppLayout>
        <div>Hello "/about"!</div>
      </AppLayout>
  ) 
}
