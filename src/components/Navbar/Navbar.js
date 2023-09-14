import React from 'react'
import styles from "./Navbar.module.css"
const Navbar = () => {
  return (
    <div className={styles.parentNavDiv}>
      <div style={{color:"white", padding:"15px 15px 15px 15px", fontFamily:"'Kanit', sans-serif", letterSpacing: "1px", fontSize: "20px"}}>
        Frontend Tasks
      </div>
    </div>
  )
}

export default Navbar
