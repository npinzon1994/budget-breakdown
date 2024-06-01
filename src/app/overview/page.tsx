import '../../index.css'
import { ClientOnly } from './client'
 
export function generateStaticParams() {
  return [{ slug: [''] }]
}
 
export default function Page() {
  //this renders the entire app in its current state
  
  return <ClientOnly />
}