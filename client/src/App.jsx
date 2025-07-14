import { useState } from 'react';
const BACKEND_URL = 'https://your-backend-host-url.com'; // replace with actual backend

function App() {
  const [inputPrompt, setInputPrompt] = useState('');
  const [refinedPrompt, setRefinedPrompt] = useState('');
  const [finalCode, setFinalCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [refinePasses, setRefinePasses] = useState(3);

  const handleRefine = async () => {
    setLoading(true);
    const response = await fetch(`${BACKEND_URL}/refine`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: inputPrompt }),
    });
    const data = await response.json();
    setRefinedPrompt(data.refinedPrompt);
    setLoading(false);
  };

  const handleGenerate = async () => {
    setLoading(true);
    const response = await fetch(`${BACKEND_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: refinedPrompt, passes: refinePasses }),
    });
    const data = await response.json();
    setFinalCode(data.code);
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>🤖 AI Code Refiner</h1>
      <textarea
        placeholder="Type your rough prompt..."
        value={inputPrompt}
        onChange={(e) => setInputPrompt(e.target.value)}
        rows={6}
        cols={60}
      />
      <br />
      <input
        type="number"
        min="1"
        max="10"
        value={refinePasses}
        onChange={(e) => setRefinePasses(parseInt(e.target.value) || 1)}
        style={{ width: '60px', marginRight: '1rem' }}
      />
      <label>Refinement Passes</label>
      <br />
      <button onClick={handleRefine}>Refine Prompt</button>

      {refinedPrompt && (
        <>
          <h3>✨ Refined Prompt</h3>
          <pre>{refinedPrompt}</pre>
          <button onClick={handleGenerate}>Generate & Refine Code</button>
        </>
      )}
      {loading && <p>⏳ Working with multiple AIs...</p>}
      {finalCode && (
        <>
          <h3>✅ Final Refined Code</h3>
          <pre>{finalCode}</pre>
        </>
      )}
    </div>
  );
}

export default App;