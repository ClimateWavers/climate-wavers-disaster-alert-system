import Communityselector from './Communityselector'
import Popularaccounts from './Popularaccounts'

const Rightsidebar = () => {
  return (
    <div className='w-full h-full bg-white'>
      <div className="p-4 space-y-6">
        <Communityselector />
        <Popularaccounts />
      </div>
    </div>
  )
}

export default Rightsidebar