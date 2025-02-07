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

    const normalizeInput = (input) => {
        // ひらがなやカタカナをローマ字に変換する処理を追加
        const romajiMap = {
            'ピカチュウ': 'pikachu',
            'リザードン': 'charizard',
            'フシギダネ': 'bulbasaur',
            'ゼニガメ': 'squirtle',
            'イシツブテ': 'geodude',
            'ミュウツー': 'mewtwo',
            'ミュウ': 'mew',
            'サンダース': 'jolteon',
            'シャワーズ': 'vaporeon',
            'ブースター': 'flareon',
            'カビゴン': 'snorlax',
            'ゴースト': 'gastly',
            'ルギア': 'lugia',
            'ホウオウ': 'ho-oh',
            'アチャモ': 'torchic',
            'リオル': 'riolu',
            'メルタン': 'melton',
            'メルメタル': 'melmetal',
            'ゼラオラ': 'zeraora',
            'ドダイトス': 'torterra',
        };
        return romajiMap[input] || input.toLowerCase(); // マップにない場合はそのまま小文字に
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const normalizedInput = normalizeInput(userInput);
        if (normalizedInput === pokemon.name.toLowerCase()) {
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
