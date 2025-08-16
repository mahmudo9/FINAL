import React from 'react'
import useDarkSide from "../configs/useDarkSide"
const Home = () => {
	const [theme, toggleTheme] = useDarkSide()
  return (
	 <div>
		<button onClick={toggleTheme} className='dark:bg-red-500'>
			Toggle to {theme === 'dark' ? 'light' : 'dark'} mode
		</button>
	 </div>
  )
}

export default Home
