
import { useState } from "react";
import confetti from "canvas-confetti";
import "./roulette.css";

const prizes = [
  "☕ 스타벅스 쿠폰",
  "🧁 디저트 세트",
  "🏖️ 반반반차",
  "🍱 피플런치",
  "🎁 기타 1",
  "🎊 기타 2",
];

export default function PraiseRoulette() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");
  const [angle, setAngle] = useState(0);

  const handleSpin = () => {
    if (spinning) return;
    const randIndex = Math.floor(Math.random() * prizes.length);
    const baseAngle = 360 / prizes.length;
    const randomOffset = Math.floor(Math.random() * baseAngle);
    const totalRotation = 360 * 5 + (360 - randIndex * baseAngle - randomOffset);
    setSpinning(true);
    setAngle(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(prizes[randIndex]);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }, 7000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">🎡 칭찬왕 룰렛 이벤트</h1>

      {!spinning && !result && (
        <button
          onClick={handleSpin}
          className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg text-lg"
        >
          돌리기 🎯
        </button>
      )}

      <div className={\`roulette-container \${spinning ? "spinning" : ""}\`}
        style={{ transform: \`rotate(\${angle}deg)\` }}>
        {prizes.map((prize, index) => (
          <div
            key={index}
            className="roulette-slice"
            style={{ transform: \`rotate(\${index * 60}deg)\` }}
          >
            <span>{prize}</span>
          </div>
        ))}
      </div>

      <div className="roulette-pointer">▲</div>

      {result && (
        <div className="text-center mt-6 space-y-2">
          <p className="text-3xl">🐋 짠!</p>
          <p className="text-xl">축하합니다! 당신의 선물은...</p>
          <p className="text-2xl font-bold">{result}</p>
        </div>
      )}
    </div>
  );
}
