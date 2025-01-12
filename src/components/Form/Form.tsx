'use client'
import React, { useState, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { training } from './actions'
import { MarkdownRenderer } from '@/lib/markdow'
import { marked } from 'marked'
import { jsPDF } from 'jspdf'


interface FormData {
	gender: string
	age: string
	height: string
	weight: string
	jobType: string
	jobDescription: string
	workHours: string
	healthIssues: string
	fitnessLevel: string
	goal: string
	equipment: string
	availableTime: string
	sleepHours: string
	stressLevel: string
	injuries: string
	preferredWorkouts: string
	additional: string
}

const initialFormData: FormData = {
	gender: '',
	age: '',
	height: '',
	weight: '',
	jobType: '',
	jobDescription: '',
	workHours: '',
	healthIssues: '',
	fitnessLevel: '',
	goal: '',
	equipment: '',
	availableTime: '',
	sleepHours: '',
	stressLevel: '',
	injuries: '',
	preferredWorkouts: '',
	additional: '',
}

export default function MultiStepForm() {
	const [answer, setAnswer] = useState<string | null>(null)
	const [step, setStep] = useState(1)
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState<FormData>(initialFormData)

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value } = e.target
			setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
		},
		[]
	)

	const nextStep = useCallback(() => {
		setStep((prev) => Math.min(prev + 1, 4))
	}, [])
	const prevStep = useCallback(() => {
		setStep((prev) => Math.max(prev - 1, 1))
	}, [])

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			setLoading(true)
			try {
				const aiResponse = await training(formData)
				setAnswer(aiResponse)
				console.log(aiResponse)
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		},
		[formData]
	)

	const downloadFile = useCallback(async () => {
		if (!answer) return
		const doc = new jsPDF()
		const htmlContent = await marked(answer) // Await the promise
		doc.text(htmlContent, 10, 10)
		doc.save('training_plan.pdf')
	}, [answer])

	const renderStepContent = () => {
		switch (step) {
			case 1:
				return (
					<div>
						<div className='mb-4'>
							<Label htmlFor='gender' className=' font-semibold'>
								Стать
							</Label>
							<Select
								name='gender'
								onValueChange={(value) =>
									setFormData((prev) => ({ ...prev, gender: value }))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder='Оберіть стать' />
								</SelectTrigger>
								<SelectContent className='bg-white '>
									<SelectItem value='male' className='focus:bg-black/10'>
										Чоловік
									</SelectItem>
									<SelectItem value='female' className='focus:bg-black/10'>
										Жінка
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='mb-4'>
							<Label htmlFor='age' className=' font-semibold'>
								Вік
							</Label>
							<Input
								type='number'
								name='age'
								value={formData.age}
								onChange={handleChange}
								placeholder='Введіть ваш вік'
							/>
						</div>
						<div className='mb-4'>
							<Label htmlFor='height' className=' font-semibold'>
								Зріст (см)
							</Label>
							<Input
								type='number'
								name='height'
								value={formData.height}
								onChange={handleChange}
								placeholder='Введіть ваш зріст'
							/>
						</div>
						<div className='mb-4'>
							<Label htmlFor='weight' className=' font-semibold'>
								Вага (кг)
							</Label>
							<Input
								type='number'
								name='weight'
								value={formData.weight}
								onChange={handleChange}
								placeholder='Введіть вашу вагу'
							/>
						</div>
						<Button
							type='button'
							onClick={nextStep}
							className='bg-[#0c0e1b] text-white hover:bg-[#191d38] rounded-xl'
						>
							Наступний крок
						</Button>
					</div>
				)
			case 2:
				return (
					<div>
						<div className='mb-4'>
							<Label htmlFor='jobType' className=' font-semibold'>
								Тип роботи
							</Label>
							<Select
								name='jobType'
								onValueChange={(value) =>
									setFormData((prev) => ({ ...prev, jobType: value }))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder='Оберіть тип роботи' />
								</SelectTrigger>
								<SelectContent className='bg-white '>
									<SelectItem value='sedentary' className='focus:bg-black/10'>
										Сидяча
									</SelectItem>
									<SelectItem value='active' className='focus:bg-black/10'>
										Активна
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='mb-4'>
							<Label htmlFor='jobDescription' className=' font-semibold'>
								Опис роботи
							</Label>
							<Textarea
								name='jobDescription'
								value={formData.jobDescription}
								onChange={handleChange}
								placeholder='Опишіть вашу роботу детально'
							/>
						</div>
						<div className='mb-4'>
							<Label htmlFor='workHours' className=' font-semibold'>
								Робочі години
							</Label>
							<Input
								type='text'
								name='workHours'
								value={formData.workHours}
								onChange={handleChange}
								placeholder='Наприклад, 9:00 - 18:00'
							/>
						</div>
						<Button
							type='button'
							onClick={prevStep}
							className='mr-4 bg-[#0c0e1b] text-white hover:bg-[#191d38] rounded-xl'
						>
							Назад
						</Button>
						<Button
							type='button'
							onClick={nextStep}
							className='bg-[#0c0e1b] text-white hover:bg-[#191d38] rounded-xl'
						>
							Наступний крок
						</Button>
					</div>
				)
			case 3:
				return (
					<div>
						<div className='mb-4'>
							<Label htmlFor='goal' className=' font-semibold'>
								Ціль
							</Label>
							<Select
								name='goal'
								onValueChange={(value) =>
									setFormData((prev) => ({ ...prev, goal: value }))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder='Оберіть ціль' />
								</SelectTrigger>
								<SelectContent className='bg-white '>
									<SelectItem value='weight_loss' className='focus:bg-black/10'>
										Схуднення
									</SelectItem>
									<SelectItem value='muscle_gain' className='focus:bg-black/10'>
										Набір м&apos;язів
									</SelectItem>
									<SelectItem value='endurance' className='focus:bg-black/10'>
										Витривалість
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='mb-4'>
							<Label htmlFor='equipment' className=' font-semibold'>
								Доступне обладнання
							</Label>
							<Select
								name='equipment'
								onValueChange={(value) =>
									setFormData((prev) => ({ ...prev, equipment: value }))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder='Оберіть обладнання' />
								</SelectTrigger>
								<SelectContent className='bg-white '>
									<SelectItem value='none' className='focus:bg-black/10'>
										Немає
									</SelectItem>
									<SelectItem value='home' className='focus:bg-black/10'>
										Домашнє обладнання
									</SelectItem>
									<SelectItem value='gym' className='focus:bg-black/10'>
										Зал
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<Button
							type='button'
							onClick={prevStep}
							className='mr-4 bg-[#0c0e1b] text-white hover:bg-[#191d38] rounded-xl'
						>
							Назад
						</Button>
						<Button
							type='button'
							onClick={nextStep}
							className='bg-[#0c0e1b] text-white hover:bg-[#191d38] rounded-xl'
						>
							Наступний крок
						</Button>
					</div>
				)
			case 4:
				return (
					<div>
						<div className='mb-4'>
							<Label htmlFor='preferredWorkouts' className=' font-semibold'>
								Бажані тренування
							</Label>
							<Textarea
								name='preferredWorkouts'
								value={formData.preferredWorkouts}
								onChange={handleChange}
								placeholder='Опишіть бажані тренування'
							/>
						</div>
						<div className='mb-4'>
							<Label htmlFor='injuries' className=' font-semibold'>
								Хвороби або обмеження
							</Label>
							<Textarea
								name='injuries'
								value={formData.injuries}
								onChange={handleChange}
								placeholder='Опишіть обмеження або травми'
							/>
						</div>
						<div className='mb-4'>
							<Label htmlFor='additional' className=' font-semibold'>
								Додаткові побажання
							</Label>
							<Textarea
								name='additional'
								value={formData.additional}
								onChange={handleChange}
								placeholder='Опишіть додаткові побажання'
							/>
						</div>
						<Button
							type='button'
							onClick={prevStep}
							className='mr-4 bg-[#0c0e1b] text-white hover:bg-[#191d38] rounded-xl'
						>
							Назад
						</Button>
						<Button
							type='submit'
							className='bg-[#0c0e1b] text-white hover:bg-[#191d38] rounded-xl'
						>
							Готово
						</Button>
					</div>
				)
			default:
				return null
		}
	}

	return (
		<div className='h-fit relative'>
			{loading && (
				<div className='absolute inset-0 flex items-center justify-center  z-50'>
					<div className='loader'></div>
				</div>
			)}
			<form
				onSubmit={handleSubmit}
				className='max-w-3xl mx-auto bg-white p-6 rounded shadow-lg'
			>
				{/* Прогрес-бар */}
				<div className='mb-6'>
					<div className='flex justify-between font-semibold text-[10px] sm:text-base'>
						<span>Особиста інформація</span>
						<span>Робота та активність</span>
						<span>Мета</span>
						<span>Додатково</span>
					</div>
					<div className='w-full bg-gray-200 h-2 rounded mt-1'>
						<div
							className={`bg-[#0c0e1b] h-2 rounded transition-all duration-300`}
							style={{ width: `${(step / 4) * 100}%` }}
						></div>
					</div>
				</div>

				{renderStepContent()}
			</form>

			{answer && (
				<div className='prose max-w-4xl mx-auto border border-[#0c0e1b] p-6 rounded-xl mt-6 '>
					<MarkdownRenderer content={answer} />
					<Button
						onClick={downloadFile}
						className='mt-4 bg-[#0c0e1b] text-white hover:bg-[#191d38] rounded-xl'
					>
						Завантажити план
					</Button>
				</div>
			)}
		</div>
	)
}
