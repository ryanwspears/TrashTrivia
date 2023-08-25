'use client'

import React from 'react'
import styles from '../page.module.css'
import QA from './Questions'
import { useState, useEffect } from 'react'

export default function Game({ gameState }) {
	const timingOfQuestions = 10
	const [questNum, setQuestNum] = useState(0)
	const shuffledQuestions = useState(shuffle(QA))
	const [quizTimer, setQuizTimer] = useState(60)
	const [questTimer, setQuestTimer] = useState(timingOfQuestions)
	const [time, setTime] = useState(0)
	const [gameOver, setGameOver] = useState(false)
	const [correctNum, setCorrectNum] = useState(0)
	const [totalScore, setTotalScore] = useState(0)
	const [loading, setLoading] = useState(false)

	function shuffle(array) {
		return array
			.map((a) => ({ sort: Math.random(), value: a }))
			.sort((a, b) => a.sort - b.sort)
			.map((a) => a.value)
	}

	function checkAnswer(answer, index) {
		let arr = shuffledQuestions[0]
		if (answer == arr[index].correctAnswer) {
			setCorrectNum(correctNum + 1)
			setQuestNum(questNum + 1)
			setQuestTimer(timingOfQuestions)
		} else {
			setQuestNum(questNum + 1)
			setQuestTimer(timingOfQuestions)
		}
	}

	function calculateTotalScore() {
		let score = Math.round((correctNum / questNum) * 100) + correctNum
		if (score < 0) {
			setTotalScore(0)
		} else {
			setTotalScore(score)
		}
	}

	useEffect(() => {
		if (gameOver) {
			calculateTotalScore()
			setLoading(true)
			setTimeout(() => {
				setLoading(false)
			}, 3000)
		}
	}, [gameOver])

	useEffect(() => {
		if (questNum > shuffledQuestions[0].length - 1) {
			setGameOver(true)
		}
	}, [questNum])

	useEffect(() => {
		setTimeout(() => {
			if (quizTimer > 1) {
				setQuizTimer(quizTimer - 1)
			} else {
				setGameOver(true)
			}
		}, 1000)
	}, [quizTimer])

	useEffect(() => {
		if (gameOver == false) {
			const questionTimer = setTimeout(() => {
				if (questTimer > 1) {
					setQuestTimer(questTimer - 1)
				} else {
					setQuestNum(questNum + 1)
					setQuestTimer(timingOfQuestions)
				}
			}, 1000)
			return () => clearTimeout(questionTimer)
		}
	}, [questTimer])

	useEffect(() => {
		if (gameOver == false) {
			const timer = time < 60 && setInterval(() => setTime(time + 1), 1000)
			return () => clearInterval(timer)
		}
	}, [time])

	return (
		<main className={styles.gameBox}>
			{!gameOver && !loading && (
				<>
					{shuffledQuestions[0].map((question, index) => {
						if (index == questNum) {
							return (
								<section key={question.id}>
									<h3>{question.question}</h3>
									<div className={styles.answers}>
										<h4 onClick={() => checkAnswer(question.aOne, index)}>{question.aOne}</h4>
										<h4 onClick={() => checkAnswer(question.aTwo, index)}>{question.aTwo}</h4>
										<h4 onClick={() => checkAnswer(question.aThree, index)}>{question.aThree}</h4>
										<h4 onClick={() => checkAnswer(question.aFour, index)}>{question.aFour}</h4>
									</div>
									<div className={styles.divider}></div>
									<div className={styles.gameBottom}>
										<p className={styles.timer}>Time Left: {quizTimer}s</p>
										<span className={styles.endBtn} onClick={() => gameState(false)}>
											END GAME
										</span>
										<p className={styles.timer}>Next Question In: {questTimer}s</p>
									</div>
								</section>
							)
						}
					})}
				</>
			)}
			{gameOver && !loading && (
				<section>
					<h1>GAME OVER</h1>
					<h2 className={styles.totalScore}>Total Score: {totalScore} points</h2>
					<div className={styles.divider}></div>
					<h3 className={styles.summaryTxt}>Grade: {Math.round((correctNum / questNum) * 100)}%</h3>
					<h3 className={styles.summaryTxt}>Questions Answered: {questNum}</h3>
					<h3 className={styles.summaryTxt}>Correctly Answered: {correctNum}</h3>
					<div className={styles.divider}></div>
					<span className={styles.endBtnTwo} onClick={() => gameState(false)}>
						RETURN HOME
					</span>
				</section>
			)}
			{gameOver && loading && (
				<section>
					<h2 className={styles.calculate}>Calculating Score...</h2>
				</section>
			)}
		</main>
	)
}
