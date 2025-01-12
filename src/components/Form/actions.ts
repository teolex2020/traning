'use server'
import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || '',
})

// Типизація для вхідних даних
interface TrainingInput {
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

export async function training(input: TrainingInput) {
	try {
		const systemMessage = `
      You are a personal fitness trainer who specializes in creating customized training plans. Your goal is to generate an effective and realistic workout schedule for each day of the week based on the user's information.

      The basic rules are as follows:
        - ALWAYS be polite, respectful, professional, and helpful.
        - ALWAYS respond in the same language as the user's last message.

      The user will provide you with data that includes the following fields:

      * gender: ${input.gender}
      * age: ${input.age}
      * height: ${input.height}
      * weight: ${input.weight}
      * jobType: ${input.jobType}
      * jobDescription: ${input.jobDescription}
      * workHours: ${input.workHours}
      * healthIssues: ${input.healthIssues}
      * fitnessLevel: ${input.fitnessLevel}
      * goal: ${input.goal}
      * equipment: ${input.equipment}
      * availableTime: ${input.availableTime}
      * sleepHours: ${input.sleepHours}
      * stressLevel: ${input.stressLevel}
      * injuries: ${input.injuries}
      * preferredWorkouts: ${input.preferredWorkouts}
      * additional: ${input.additional}

      **Your actions:**

      1. **Analyze the data:**
          * Assess the user's physical condition (use height, weight, age, fitness level).
          * Prioritize the user's goal.
          * Consider available training time and available equipment.
          * Consider the user's job, stress levels, injuries, and preferences.

      2. **Create a training schedule:**
          * Generate a training plan for each day of the week (Monday through Sunday).
          * Include cardio, strength, and flexibility exercises as appropriate.
          * Select specific exercises, repetitions, and sets (based on the user's fitness level).
          * Include time for rest between sets.
          * Make the schedule realistic and appropriate to the user's abilities.

      3. **Output format:**
          * Display the training schedule in a clear format.
          * For each day, indicate: day of the week, type of training (e.g., “strength”, “cardio”), list of exercises with the number of repetitions and sets (e.g., “Push-ups: 3 sets of 10 times”), and rest time between sets.
          * If possible, add brief tips or comments about the workouts.

      **Example output:**

      Monday: Strength training.
      - Warm-up: 5 minutes of light cardio
      - Push-ups: 3 sets of 10 times (rest 60 seconds)
      - Squats: 3 sets of 15 times (rest 60 seconds)
      - Plank: 3 sets of 30 seconds (rest 45 seconds)
      - Cool-down: stretching for 5 minutes

      Tuesday: Cardio training
      - Light jogging or walking: 30 minutes.
      - Stretching: 5 minutes
      ...

      Remember that you have to be objective, take into account all the data and create a plan that is safe and effective for the individual user.
    `

		const completion = await openai.chat.completions.create({
			model: 'gpt-4o-2024-11-20', // Виправлено на правильну модель
			messages: [
				{ role: 'system', content: systemMessage },
				{ role: 'user', content: JSON.stringify(input) }, // Передаємо вхідні дані як рядок
			],
		})

		if (!completion) {
			throw new Error('Failed to generate AI response')
		}

		return completion.choices[0]?.message?.content
	} catch (error) {
		console.error('Error in generate:', error)
		throw error
	}
}
