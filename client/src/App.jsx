import { useState } from 'react';

const BACKEND_URL = 'https://faf8f975-dc9c-4748-97a9-a1a3b7f7d972-00-ry5sa16bzjdi.janeway.replit.dev';

function App() {
  const [inputPrompt, setInputPrompt] = useState('');
  const [refinedPrompt, setRefinedPrompt] = useState('');
  const [finalCode, setFinalCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRefine = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/refine`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputPrompt }),
      });
      const data = await response.json();
      setRefinedPrompt(data.refinedPrompt);
    } catch (error) {
      console.error('Error refining prompt:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: refinedPrompt }),
      });
      const data = await response.json();
      setFinalCode(data.code);
    } catch (error) {
      console.error('Error generating code:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🤖 AI Ricochet</h1>
      <textarea
        placeholder="Type your rough prompt..."
        value={inputPrompt}
        onChange={(e) => setInputPrompt(e.target.value)}
        rows={6}
        cols={60}
      />
      <br />
      <button onClick={handleRefine} disabled={loading || !inputPrompt.trim()}>
        Refine Prompt
      </button>

      {refinedPrompt && (
        <>
          <h3>✨ Refined Prompt</h3>
          <pre>{refinedPrompt}</pre>
          <button onClick={handleGenerate} disabled={loading || !refinedPrompt.trim()}>
            Generate & Refine Code
          </button>
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
