import React from 'react'
import Image from 'next/image'
import styles from '../page.module.css'
import { useRouter } from 'next/navigation'

export default function Nav() {
   const router = useRouter()
  return (
		<main className={styles.navMain}>
			<Image src={'/ttlogo.png'} alt='TT Logo' width={200} height={200} priority />
			<div className={styles.navLinks}>
				<span onClick={() => router.push('/')}>HOME</span>
				<span onClick={() => router.push('/leaderboard')}>LEADERBOARD</span>
				<span onClick={() => router.push('/contact')}>CONTACT</span>
			</div>
		</main>
	)
}
