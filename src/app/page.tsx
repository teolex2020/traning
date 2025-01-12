
import Image from 'next/image'
import Form from '@/components/Form/Form'


export default function Home() {
	return (
		<main className='  '>
			<section className='mb-8 p-5 relative min-h-screen flex-1'>
				<Image
					src={`/train.webp`}
					alt={`Platform`}
					className='object-cover'
					fill
				/>
				<div
					className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0c0e1bf5] text-white sm:p-10 p-5 text-center sm:h-72 grid place-content-center border-2 w-[95%] sm:w-fit '
					style={{ borderRadius: '0.7rem' }}
				>
					<h2 className='text-4xl sm:text-6xl font-extrabold mb-4 w-full '>
						Ваш віртуальний тренер
					</h2>
					<p className='sm:text-3xl mb-8'>унікальні, індивідуальні тренування</p>
				</div>
			</section>
			<section className='container mx-auto px-4 py-6'>
				<h2 className='text-2xl sm:text-4xl font-bold text-center mb-8'>
					Створіть власну програму на 7 днів
				</h2>
				<div ><Form/></div>
			</section>
		</main>
	)
}
