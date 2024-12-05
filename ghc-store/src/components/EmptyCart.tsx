import { Link } from 'react-router-dom'
import GridLines from 'react-gridlines';

const EmptyCart = () => {
  return (
    <GridLines lineColor="rgba(0, 0, 0, 0.1)" cellWidth={30} cellHeight={30}>
    <div className="flex flex-col items-center justify-center min-h-screen font-inter">
        <img src="/emptycart.svg" alt="Empty Cart" className="w-full h-[10rem] mx-auto mb-4" />
        <h2 className="text-xl font-medium mb-2">Your cart's feeling lonely!</h2>
        <p className="text-gray-600 mb-6 max-w-[20rem] text-center">
        Go on, explore some good vibes and stock up on better routines.
        </p>
        <Link 
          to="/" 
          className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors flex items-center justify-center text-sm md:text-lg"
        >
          CONTINUE SHOPPING
        </Link>
     
    </div>
    </GridLines>
  )
}

export default EmptyCart

