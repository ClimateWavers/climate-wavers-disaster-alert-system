import Communityselector from './Communityselector'
import Popularaccounts from './Popularaccounts'

const Rightsidebar = () => {
  return (
    <div className=' md:fixed  w-[20% border-l-[1px] border-gray-200 h-[100vh] hidden md:block pt-5'>
        {/* Search btn */}
        <Communityselector />
        <div className="mt-[10%]">
        <Popularaccounts />
        </div>
    </div>
  )
}

export default Rightsidebar