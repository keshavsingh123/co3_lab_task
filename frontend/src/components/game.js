
// export default ClickerGame;
import React, { useState, useEffect } from "react";
import "./game.css";
import axios from "axios"; // For backend integration

const ClickerGame = () => {
  const [coins, setCoins] = useState(0);
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  // Fetch initial coin balance from backend
  useEffect(() => {
    const fetchBalance = async () => {
      try{
        const { data } = await axios.get(`http://localhost:8080/api/coins/${username}`);
        setCoins(data.coins);
      }catch(err){
        console.log(err);
      }
    };
    fetchBalance();
  }, []);

  const handleTap = () => {
    if (!username) {
      alert('Please set a username first!');
      return;
    }
    setCoins(coins + 1); // Increment the coins

    // Send the new balance to the backend
    axios.post("http://localhost:8080/api/coins/update", { username, coins: coins + 1 })
    .catch(err=>console.error(err))
  };
  const handleUsernameSubmit = async () => {
    if (!username) {
      alert("Please enter a username!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/coins/update", { username, coins });
      setIsUsernameSet(true);
    } catch (error) {
      console.error("Error setting username:", error);
    }
  };

  return (
    <div className="clicker-container">
      <div style={{margin:'5px 0 5px 290px '}}>
      <input
      style={{width:'40rem'}}
        type="text"
        className="form-control m-2"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      </div>
      <button className="btn btn-primary btn-lg mb-2" onClick={handleUsernameSubmit}>Save Name</button>
      <br />
      <button className="tap-button" onClick={handleTap} disabled={!isUsernameSet}>
        Tap to Earn Coins
      </button>
      {
        isUsernameSet && (
          <>
            <p className="text-primary">Username: {username}</p>
      <h2>Coins: {coins}</h2>
          </>
        )
      }
    </div>
  );
};

export default ClickerGame;