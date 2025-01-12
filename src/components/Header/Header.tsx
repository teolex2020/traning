import React from 'react'


const Header = () => {
  return (
		<header className='bg-[#0c0e1bf5] border-b shadow-md sticky top-0 z-50 text-white'>
			<div className='container mx-auto px-4 py-3 flex justify-between items-center'>
				<h1 className='text-2xl font-bold'>Fitness Hub</h1>
				<nav>
					{/* <ul className='flex space-x-6'>
						<li>
							<a href='#' className=' hover:text-blue-500'>
								Home
							</a>
						</li>
						<li>
							<a href='#' className=' hover:text-blue-500'>
								Programs
							</a>
						</li>
						<li>
							<a href='#' className=' hover:text-blue-500'>
								Contact
							</a>
						</li>
					</ul> */}
				</nav>
			</div>
		</header>
	)
}

export default Header