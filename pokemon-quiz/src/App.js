import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [pokemon, setPokemon] = useState(null);
    const [userInput, setUserInput] = useState('');
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchPokemon();
    }, []);

    const fetchPokemon = async () => {
        const randomId = Math.floor(Math.random() * 898) + 1; // 1から898までのランダムなポケモンID
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        setPokemon(response.data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput.toLowerCase() === pokemon.name.toLowerCase()) {
            setScore(score + 1);
            setMessage('正解！');
        } else {
            setMessage(`不正解！正解は ${pokemon.name} です。`);
        }
        setUserInput('');
        fetchPokemon(); // 次のポケモンを取得
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>ポケモン名前当てクイズ</h1>
                {pokemon && <img src={pokemon.sprites.front_default} alt={pokemon.name} />}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="ポケモンの名前を入力"
                    />
                    <button type="submit">送信</button>
                </form>
                <p>{message}</p>
                <p>スコア: {score}</p>
            </header>
        </div>
    );
}

export default App;
