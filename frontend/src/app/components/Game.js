'use client'

import React from 'react'
import styles from '../page.module.css'
import QA from './Questions'
import { useState, useEffect } from 'react'

export default function Game({ gameState }) {

   const timingOfQuestions = 10
	const numOfQuestions = QA.length
   const [questNum, setQuestNum] = useState(0)
   const shuffledQuestions = useState(shuffle(QA))
	const [quizTimer, setQuizTimer] = useState(numOfQuestions * timingOfQuestions)
	const [questTimer, setQuestTimer] = useState(timingOfQuestions)
	const [time, setTime] = useState(0)
   const [gameOver, setGameOver] = useState(false)
   const [correctNum, setCorrectNum] = useState(0)

	function shuffle (array) {
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
		const questionTimer = setTimeout(() => {
			if (questTimer > 1) {
				setQuestTimer(questTimer - 1)
			} else {
				setQuestNum(questNum + 1)
				setQuestTimer(timingOfQuestions)
			}
      }, 1000)
      return () => clearTimeout(questionTimer)
	}, [questTimer])

	useEffect(() => {
		setTimeout(() => {
			if (!gameOver) {
				setTime(time + 1)
			}
		}, 1000)
	}, [time])

	return (
		<main className={styles.gameBox}>
			{!gameOver ? (
				<>
					{shuffledQuestions[0].map((question, index) => {
						if (index == questNum) {
							return (
								<section key={question.id}>
									<p className={styles.timer}>Time Elapsed: {time}s</p>
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
			) : (
				<section>
					<h1>GAME OVER</h1>
					<div className={styles.divider}></div>
					<h3 className={styles.summaryTxt}>Score: {Math.round((correctNum / numOfQuestions) * 100)}%</h3>
					<h3 className={styles.summaryTxt}>Your Time: {time}s</h3>
					<div className={styles.divider}></div>
					<span className={styles.endBtnTwo} onClick={() => gameState(false)}>
						RETURN HOME
					</span>
				</section>
			)}
		</main>
	)
}
