'use client'

import styles from './page.module.css'
import Nav from './components/Nav'
import { useState } from 'react'
import Game from './components/Game'
import Footer from './components/Footer'

export default function Home() {
	const [playGame, setPlayGame] = useState(false)
	return (
		<main className={styles.main}>
			<Nav />
			{!playGame ? (
				<>
					<div className={styles.homeTxt}>
						<h1>Think you know everything about Trash Taste?</h1>
						<h1>How about we put that to the test...</h1>
					</div>
					<span className={styles.playBtn} onClick={() => setPlayGame(true)}>
						PLAY
					</span>
				</>
			) : (
				<Game gameState={setPlayGame} />
      )}
      <Footer />
		</main>
	)
}
