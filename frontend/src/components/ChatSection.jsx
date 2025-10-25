import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import apiService from '../services/api.service';
import { LOADING_MESSAGES, ERROR_MESSAGES, PLACEHOLDERS } from '../config/constants';

export default function ChatSection({ recipe }) {
    const [question, setQuestion] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isAskingAI, setIsAskingAI] = useState(false);

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
                content = `🌐 *Búsqueda web activada*\n\n${content}`;
            }
            
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
                                        p: ({node, ...props}) => <p style={{margin: '0.5rem 0'}} {...props} />,
                                        ul: ({node, ...props}) => <ul style={{margin: '0.5rem 0', paddingLeft: '1.25rem'}} {...props} />,
                                        ol: ({node, ...props}) => <ol style={{margin: '0.5rem 0', paddingLeft: '1.25rem'}} {...props} />,
                                        li: ({node, ...props}) => <li style={{margin: '0.25rem 0'}} {...props} />,
                                        strong: ({node, ...props}) => <strong style={{color: 'var(--color-primary)', fontWeight: '700'}} {...props} />,
                                        h3: ({node, ...props}) => <h3 style={{fontSize: '1rem', margin: '0.5rem 0'}} {...props} />,
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
