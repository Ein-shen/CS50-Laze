import Ai from "../Home/Ai"
import Greetings from '../components/Greetings'

const Home = () => {
  return (
    <>
      
      <div className="flex justify-center items-center h-full overflow-y-auto pb-30">
        {/* <Ai /> */}
        <div className="flex flex-col "> 
          <h1 className="font-bold text-2xl text-center pb-10 py-10">
            <Greetings /> Let's go study?
          </h1>

          <h1 className="font-bold text-2xl text-center pb-10">
            <img src="/mortarboard.png" alt="mortarboard" className="inline-block w-40 h-40" />
          </h1>

        </div>
      </div>
    </>
  )
}

export default Home
