import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import apiService from '../services/api.service';
import { LOADING_MESSAGES, ERROR_MESSAGES, PLACEHOLDERS } from '../config/constants';

export default function ChatSection({ recipe }) {
    const [question, setQuestion] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isAskingAI, setIsAskingAI] = useState(false);

    // Normaliza la respuesta en Markdown para evitar viñetas vacías y espacios extra
    const normalizeAnswer = (text) => {
        if (!text) return '';
        let t = String(text).replace(/\r\n?/g, '\n');
        // Eliminar líneas que son solo marcadores de lista ( -, *, • )
        t = t.replace(/^\s*[-*•]\s*$/gm, '');
        // Quitar espacios al inicio/fin de cada línea
        t = t.replace(/^[\t ]+/gm, '').replace(/[\t ]+$/gm, '');
        // Convertir bullets con "•" a listas markdown y separar en líneas
        t = t
          // Si un bloque empieza con "Puntos clave" u "Opciones recomendadas", forzar salto y bullets por línea
          .replace(/(\*\*Puntos clave:?\*\*):\s*•\s*/i, '$1\n- ')
          .replace(/(\*\*Opciones recomendadas:?\*\*):\s*•\s*/i, '$1\n- ')
          // Bullets en nuevas líneas
          .replace(/\n•\s+/g, '\n- ')
          // Bullets en línea (p.ej. " ...: • item1 • item2 ...")
          .replace(/\s•\s+/g, '\n- ');
        // Asegurar salto de línea antes de listas numeradas en "Cómo hacerlo"
        t = t.replace(/(\*\*C[oó]mo hacerlo:?\*\*):\s*(?=1\.)/i, '$1\n');
        // Colapsar 3+ saltos a uno doble
        t = t.replace(/\n{3,}/g, '\n\n');
        return t.trim();
    };

    const handleAskAI = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        const userMessage = { role: 'user', content: question };
        setIsAskingAI(true);
        setChatHistory(prev => [...prev, userMessage]);
        setQuestion('');

        try {
            const contextualQuestion = `Sobre la receta "${recipe.name}" (${recipe.baureName}): ${question}`;
            
            const recipeData = {
                name: recipe.name,
                baureName: recipe.baureName,
                description: recipe.description,
                ingredients: recipe.ingredients,
                preparation: recipe.preparation,
                utensils: recipe.utensils,
                consumption: recipe.consumption,
                conservation: recipe.conservation,
                sourcePerson: recipe.sourcePerson
            };

            const res = await apiService.askAI(contextualQuestion, recipeData);
            
            let content = res.data.answer;
            if (res.data.usedWebSearch) {
                content = `*Búsqueda web activada*\n\n${content}`;
            }

            content = normalizeAnswer(content);

            const aiMessage = { role: 'assistant', content };
            setChatHistory(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error('Error al consultar IA:', error);
            const errorMessage = { 
                role: 'assistant', 
                content: error.response?.data?.message || ERROR_MESSAGES.AI_CONNECTION
            };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsAskingAI(false);
        }
    };

    return (
        <div className="recipe-detail-section">
            <h3 className="section-title-detail">
                <span className="material-symbols-outlined">smart_toy</span>
                Asistente de Cocina
            </h3>
            <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                Consulta sobre ingredientes, técnicas de preparación, variaciones o datos culturales de esta receta.
            </p>
            
            <div className="chatbot-messages">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.role === 'user' ? 'message-user' : ''}`}>
                        <div className={`message-avatar ${msg.role === 'user' ? 'avatar-user' : 'avatar-assistant'}`}>
                            <span className="material-symbols-outlined">
                                {msg.role === 'user' ? 'person' : 'smart_toy'}
                            </span>
                        </div>
                        <div className={`message-content ${msg.role === 'user' ? 'content-user' : 'content-assistant'}`}>
                            {msg.role === 'assistant' ? (
                                <ReactMarkdown
                                    components={{
                                        p: ({node, ...props}) => <p {...props} />,
                                        ul: ({node, ...props}) => <ul {...props} />,
                                        ol: ({node, ...props}) => <ol {...props} />,
                                        li: ({node, ...props}) => <li {...props} />,
                                        strong: ({node, ...props}) => <strong {...props} />,
                                        em: ({node, ...props}) => <em {...props} />,
                                        h3: ({node, ...props}) => <h3 {...props} />,
                                        h4: ({node, ...props}) => <h4 {...props} />,
                                    }}
                                >
                                    {msg.content}
                                </ReactMarkdown>
                            ) : (
                                msg.content
                            )}
                        </div>
                    </div>
                ))}
                
                {isAskingAI && (
                    <div className="chat-message">
                        <div className="message-avatar avatar-assistant">
                            <span className="material-symbols-outlined">psychology</span>
                        </div>
                        <div className="message-content content-assistant">
                            {LOADING_MESSAGES.AI}
                        </div>
                    </div>
                )}
            </div>
            
            <form onSubmit={handleAskAI} className="chatbot-input-container">
                <input
                    type="text"
                    className="chatbot-input"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder={PLACEHOLDERS.ASK_AI}
                    disabled={isAskingAI}
                />
                <button type="submit" className="chatbot-send" disabled={isAskingAI || !question.trim()}>
                    <span className="material-symbols-outlined">send</span>
                </button>
            </form>
        </div>
    );
}
