import React from 'react'

const Footer = () => {
  return (
		<footer className='bg-[#0c0e1b] text-white py-4'>
			<div className='container mx-auto px-4 text-center'>
				<p>
					&copy; {new Date().getFullYear()} Fitness Hub. All Rights Reserved.
				</p>
			</div>
		</footer>
	)
}

export default Footer