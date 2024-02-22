import React from 'react';

const Navbar = () => {
const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 20px",
      height: "60px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#f4f4f4",
    },
    brand: {
        fontSize: "1.3em",
        fontWeight: "bold",
        // backgroundColor: "blue"
    },
    userSection: {
        display: "flex",
        alignItems: "center",
        maxWidth: "350px",
        minWidth: "200px",
        justifyContent: "space-between",
        // backgroundColor: "red"
    },
    userName:{
        display: "flex",
        
    },
    logOut:{
        display: "flex"
        
    }

};

  return (
    <nav style={styles.nav}>
      <div className="navbar-brand" style={styles.brand}>MindMapxForm</div>
      <div className="navbar-user" style={styles.userSection}>
        <span className="user-name" style={styles.userName}>User Name</span>
        <button className="logout-button"style={styles.logOut}>Log Out</button>
      </div> 
    </nav>
  );
};

export default Navbar;
