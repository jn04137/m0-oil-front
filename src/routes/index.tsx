import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '../AppLayout'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
      <AppLayout>
        <div>Hello "/"!</div>
      </AppLayout>
  ) 
}
