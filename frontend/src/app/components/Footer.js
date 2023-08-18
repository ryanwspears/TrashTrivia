'use client'

import React from 'react'
import styles from '../page.module.css'

export default function Footer() {
  return (
		<div className={styles.foot}>
			<p>
				::DISCLAIMER:: I am not affiliated, associated, authorized, endorsed by, or in any way officially connected with Trash Taste, or any of its subsidiaries or its affiliates. More information about Trash Taste can be found at <a href='https://www.geexplus.co.jp/en/creators/trashtaste/' target='_blank'>https://www.geexplus.co.jp/en/creators/trashtaste/</a>.
        </p>
        <p>All marks, emblems, logos, and images are registered trademarks of their respective owners.</p>
			<p>&copy;{new Date().getFullYear()} playerUnknown</p>
		</div>
	)
}
