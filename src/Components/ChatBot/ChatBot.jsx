import { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes, FaSmile } from "react-icons/fa";
import Picker from "emoji-picker-react";
import api from "../../Action/Api";
import { TbMessageChatbot } from "react-icons/tb";

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { from: "bot", text: "Hi! How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const inactivityTimeoutRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
            inactivityTimeoutRef.current = setTimeout(() => {
                setIsOpen(false);
                setShowEmojiPicker(false);
            }, 40000);
        }
        return () => {
            if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
        };
    }, [isOpen, messages, input]);

    const resetInactivityTimeout = () => {
        if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
        inactivityTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
            setShowEmojiPicker(false);
        }, 40000);
    };

    const onEmojiClick = (emojiObject) => {
        setInput((prev) => prev + emojiObject.emoji);
        setShowEmojiPicker(false);
        resetInactivityTimeout();
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { from: "user", text: input.trim() };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setLoading(true);
        setShowEmojiPicker(false);
        resetInactivityTimeout();

        try {
            const response = await api.post("/chatbot", { messages: newMessages });
            const data = response.data;
            if (data.reply) {
                setMessages([...newMessages, { from: "bot", text: data.reply }]);
            } else {
                setMessages([...newMessages, { from: "bot", text: "Sorry, I couldn't get a response." }]);
            }
        } catch (err) {
            const serverMsg = err?.response?.data?.error;
            const errorMsg = serverMsg || err.message || "Error contacting the server.";
            setMessages([...newMessages, { from: "bot", text: errorMsg }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        } else {
            resetInactivityTimeout();
        }
    };

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-3 shadow"
                    style={{ width: "56px", height: "56px" }}
                    aria-label="Open Chatbot"
                    title="Open Chatbot"
                >
                    <FaComments size={28} />
                </button>
            )}

            {isOpen && (
                <div
                    className="card position-fixed bottom-0 end-0 m-3 shadow-lg border border-0"
                    style={{ width: "350px", maxWidth: "90vw", maxHeight: "500px", display: "flex", flexDirection: "column" }}
                >
                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <TbMessageChatbot
                                className="me-2"
                                style={{width: "24px", height: "24px", objectFit: "contain", }}
                            />
                            ChatBot
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="btn btn-link text-white p-0"
                            aria-label="Close Chatbot"
                            title="Close Chatbot"
                        >
                            <FaTimes />
                        </button>
                    </div>


                    <div
                        className="card-body bg-light overflow-auto flex-grow-1"
                        style={{ height: "300px" }}
                    >
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`d-flex mb-2 ${msg.from === "user" ? "justify-content-end" : "justify-content-start"}`}
                            >
                                <div
                                    className={`p-2 rounded ${msg.from === "user" ? "bg-primary text-white" : "bg-white border"}`}
                                    style={{ maxWidth: "75%", wordWrap: "break-word" }}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && <div className="text-muted fst-italic">Typing...</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="card-footer d-flex align-items-center gap-2">
                        <button
                            onClick={() => setShowEmojiPicker((val) => !val)}
                            type="button"
                            className="btn btn-light"
                            aria-label="Toggle Emoji Picker"
                            title="Toggle Emoji Picker"
                            disabled={loading}
                        >
                            <FaSmile />
                        </button>
                        <textarea
                            className="form-control flex-grow-1"
                            rows={1}
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                resetInactivityTimeout();
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            disabled={loading}
                            style={{ resize: "none" }}
                        />
                        <button className="btn btn-primary" onClick={handleSend} disabled={loading}>
                            Send
                        </button>
                    </div>

                    {showEmojiPicker && (
                        <div className="position-absolute" style={{ bottom: "60px", right: "10px", zIndex: 1200 }}>
                            <Picker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ChatBot;
