import React, { useRef, useState } from 'react';

const Chirper = () => {
    const initialChirps = [
        { id: 1, message: 'Hello Chirper!', timestamp: new Date().toLocaleString() },
        { id: 2, message: 'Just setting up my Chirp', timestamp: new Date().toLocaleString() },
        { id: 3, message: 'What a great platform!', timestamp: new Date().toLocaleString() }
    ];

    const [chirps, setChirps] = useState(initialChirps);
    const newChirpRef = useRef(null);
    const [validationError, setValidationError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newMessage = newChirpRef.current.value.trim();

        if (newMessage === '') {
            setValidationError(true);
            return;
        }

        const newChirpObj = {
            id: chirps.length + 1,
            message: newMessage,
            timestamp: new Date().toLocaleString()
        };

        setChirps([...chirps, newChirpObj]);
        newChirpRef.current.value = '';
        setValidationError(false);
    };

    return (
        <div className="flex justify-center mt-5">
            <div className="w-full max-w-2xl px-4 py-5 bg-white shadow-lg rounded">
                <header className="text-center mb-4">
                    <h1 className="text-3xl font-bold">Uncontrolled Chirper</h1>
                </header>
                <div className="mb-3">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                        <input
                            type="text"
                            className="p-2 border border-gray-300 rounded"
                            ref={newChirpRef}
                            placeholder="What's happening?"
                        />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Chirp
                        </button>
                    </form>
                    {validationError && <p className="text-red-500">Please enter a message to chirp.</p>}
                </div>
                {chirps.map((chirp) => (
                    <div key={chirp.id} className="mb-2 p-4 bg-white shadow rounded">
                        <p className="font-bold">{chirp.message}</p>
                        <small className="text-gray-600">{chirp.timestamp}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chirper;
