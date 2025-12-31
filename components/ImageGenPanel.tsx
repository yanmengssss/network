
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { AspectRatio, ImageSize } from '../types';

const ImageGenPanel: React.FC = () => {
  const [prompt, setPrompt] = useState('A futuristic high-tech automated shipping port at sunset, 8k resolution, cinematic lighting');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [size, setSize] = useState<ImageSize>('1K');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio,
            imageSize: size
          }
        }
      });

      let foundImage = false;
      for (const candidate of response.candidates || []) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
        if (foundImage) break;
      }
      
      if (!foundImage) {
        throw new Error('No image was generated in the response.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 h-full overflow-y-auto">
      <div className="flex flex-col gap-2">
        <textarea
          className="w-full bg-slate-950/50 border border-cyan-500/20 rounded p-2 text-[10px] text-cyan-100 focus:outline-none focus:border-cyan-500 transition-colors h-16 resize-none"
          placeholder="Describe your port visualization..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[8px] text-slate-500 uppercase font-bold">Aspect Ratio</label>
            <select 
              className="bg-slate-900 border border-cyan-500/20 text-[10px] p-1 text-cyan-400 rounded outline-none"
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
            >
              <option value="1:1">1:1</option>
              <option value="3:4">3:4</option>
              <option value="4:3">4:3</option>
              <option value="16:9">16:9</option>
              <option value="21:9">21:9</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[8px] text-slate-500 uppercase font-bold">Size</label>
            <select 
              className="bg-slate-900 border border-cyan-500/20 text-[10px] p-1 text-cyan-400 rounded outline-none"
              value={size}
              onChange={(e) => setSize(e.target.value as ImageSize)}
            >
              <option value="1K">1K</option>
              <option value="2K">2K</option>
              <option value="4K">4K</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateImage}
          disabled={loading}
          className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold py-1.5 px-4 rounded text-[10px] uppercase tracking-widest transition-all"
        >
          {loading ? 'Synthesizing...' : 'Generate Port Visual'}
        </button>
      </div>

      <div className="relative flex-1 bg-slate-950/50 border border-cyan-500/10 rounded overflow-hidden flex items-center justify-center min-h-[120px]">
        {loading && (
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-[8px] text-cyan-400 font-bold uppercase tracking-widest animate-pulse">Processing Neural Net</span>
          </div>
        )}
        
        {!loading && imageUrl && (
          <img src={imageUrl} alt="AI Generated Port" className="w-full h-full object-cover" />
        )}
        
        {!loading && !imageUrl && !error && (
          <div className="text-[9px] text-slate-600 font-bold uppercase tracking-tight text-center px-4">
            Input prompt to generate AI conceptual port imagery
          </div>
        )}
        
        {error && (
          <div className="text-[9px] text-rose-400 font-bold uppercase text-center px-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenPanel;
