import React, { useState, useRef, useEffect } from 'react';
import AuthForms from './components/auth';

// --- Helper Components (Icons) ---
const PlayIcon = ({ size = 24 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 5.27487C5 4.57203 5.78947 4.06361 6.44721 4.44299L19.2111 11.8681C19.822 12.218 19.822 13.0547 19.2111 13.4046L6.44721 20.8297C5.78947 21.2091 5 20.7007 5 20.0028V5.27487Z" fill="currentColor" /></svg>;
const PauseIcon = ({ size = 24 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" /><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" /></svg>;
const SkipBackIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 5L4 12L11 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 5L13 12L20 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const SkipForwardIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 5L20 12L13 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 5L11 12L4 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const HeartIcon = ({ isLiked }) => <svg width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const PlusIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const LogoutIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const CameraIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;


// --- Expanded Song Library ---
const allSongs = [
    // Happy & Energetic
    /*
    { id: "S001", title: "Walking on Sunshine", artist: "The Good Vibes", genre: "Pop", moods: ['happy', 'energetic', 'upbeat'], url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "https://placehold.co/300x300/f9d423/000000?text=Sunshine" },
    { id: "S002", title: "Dance Party", artist: "DJ Pulse", genre: "Electronic", moods: ['energetic', 'workout', 'happy'], url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "https://placehold.co/300x300/ff4e50/ffffff?text=Dance" },
    { id: "S003", title: "Summer Festival", artist: "Indie Rockers", genre: "Indie", moods: ['happy', 'energetic', 'upbeat'], url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", cover: "https://placehold.co/300x300/f2709c/ffffff?text=Summer" },
    { id: "S004", title: "Good Morning", artist: "Acoustic Cafe", genre: "Acoustic", moods: ['happy', 'calm'], url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", cover: "https://placehold.co/300x300/a8e063/000000?text=Morning" },
    { id: "S005", title: "Victory Lap", artist: "The Champions", genre: "Rock", moods: ['energetic', 'upbeat'], url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", cover: "https://placehold.co/300x300/fc4a1a/ffffff?text=Victory" },
    { id: "S006", title: "City Lights", artist: "Urban Groove", genre: "Pop", moods: ['happy', 'driving'], url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", cover: "https://placehold.co/300x300/7f7fd5/ffffff?text=City" },
    { id: "S007", title: "Road Trip", artist: "The Wanderers", genre: "Indie", moods: ['happy', 'driving'], url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", cover: "https://placehold.co/300x300/3a7bd5/ffffff?text=Road" },
    { id: "S008", title: "Unstoppable", artist: "Power Hour", genre: "Electronic", moods: ['workout', 'energetic'], url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", cover: "https://placehold.co/300x300/e52d27/ffffff?text=Power" },
    { id: "S009", title: "Fiesta", artist: "Latin Heat", genre: "Latin", moods: ['happy', 'energetic'], url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", cover: "https://placehold.co/300x300/ff512f/ffffff?text=Fiesta" },
    { id: "S010", title: "Top of the World", artist: "Summit Singers", genre: "Pop", moods: ['happy', 'upbeat'], url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", cover: "https://placehold.co/300x300/1fab89/ffffff?text=Top" },

    // Calm & Relaxing
    { id: "S011", title: "Peaceful Morning", artist: "Ambient Dreams", genre: "Ambient", moods: ['calm', 'study', 'relaxing'], url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "https://placehold.co/300x300/8e9eab/ffffff?text=Peace" },
    { id: "S012", title: "Forest Walk", artist: "Nature Sounds", genre: "Instrumental", moods: ['calm', 'relaxing', 'focus'], url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "https://placehold.co/300x300/4a5c3e/ffffff?text=Forest" },
    { id: "S013", title: "Study Session", artist: "Lofi Beats", genre: "Lofi", moods: ['study', 'focus', 'calm'], url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", cover: "https://placehold.co/300x300/5c258d/ffffff?text=Study" },
    { id: "S014", title: "Starlight", artist: "Cosmic Drifters", genre: "Ambient", moods: ['calm', 'relaxing', 'late-night'], url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3", cover: "https://placehold.co/300x300/2c3e50/ffffff?text=Starlight" },


    // Sad & Melancholy
    { id: "S021", title: "Midnight Jazz", artist: "The Night Owls", genre: "Jazz", moods: ['sad', 'relaxing', 'late-night'], url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "https://placehold.co/300x300/3c3b3f/ffffff?text=Jazz" },
    { id: "S022", title: "Rainy Day", artist: "Sorrowful Strings", genre: "Classical", moods: ['sad', 'relaxing', 'calm'], url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", cover: "https://placehold.co/300x300/606c88/ffffff?text=Rainy" },
  

    // Focus & Driving
    { id: "S031", title: "Ocean Drive", artist: "Synthwave Rider", genre: "Electronic", moods: ['driving', 'energetic'], url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "https://placehold.co/300x300/0052d4/ffffff?text=Drive" },
     */
    { id: "S032", title: "Stronger", artist: "Kanye West", genre: "Electronic", moods: ['energetic', 'workout', 'happy'], url: "/songs/stronger.mp3", cover: "https://placehold.co/300x300/ff4e50/ffffff?text=Stronger" },
  
    {
        id: "S033",
        title: "Thunderstruck",
        artist: "AC/DC",
        genre: "Rock",
        moods: ["energetic", "workout", "driving"],
        url: "/songs/Thunderstruck.mp3",
        cover: "https://placehold.co/300x300/111111/ffffff?text=Thunder"
    },
    {
        id: "S034",
        title: "Back In Black",
        artist: "AC/DC",
        genre: "Rock",
        moods: ["power", "confident", "party"],
        url: "/songs/Back In Black.mp3",
        cover: "https://placehold.co/300x300/222222/ffffff?text=Back+in+Black"
    },
    {
        id: "S035",
        title: "T.N.T.",
        artist: "AC/DC",
        genre: "Rock",
        moods: ["rebellious", "anthem", "energetic"],
        url: "/songs/tnt.mp3",
        cover: "https://placehold.co/300x300/333333/ffffff?text=TNT"
    },
    {
        id: "S036",
        title: "Chill Music by the Fire",
        artist: "Jazzy Loft",
        genre: "Lo-fi",
        moods: ["chill", "relax", "sleep"],
        url: "/songs/Chill Music by the fire.mp3",
        cover: "https://placehold.co/300x300/604020/ffffff?text=Chill"
    },

    { id: "S001", title: "Walking on Sunshine", artist: "The Good Vibes", genre: "Pop", moods: ['happy', 'energetic', 'upbeat'], url: "/songs/SoundHelix-Song-2.mp3", cover: "https://placehold.co/300x300/f9d423/000000?text=Sunshine" },
    { id: "S002", title: "Dance Party", artist: "DJ Pulse", genre: "Electronic", moods: ['energetic', 'workout', 'happy'], url: "/songs/SoundHelix-Song-5.mp3", cover: "https://placehold.co/300x300/ff4e50/ffffff?text=Dance" },
    { id: "S003", title: "Summer Festival", artist: "Indie Rockers", genre: "Indie", moods: ['happy', 'energetic', 'upbeat'], url: "/songs/SoundHelix-Song-6.mp3", cover: "https://placehold.co/300x300/f2709c/ffffff?text=Summer" },
    { id: "S004", title: "Good Morning", artist: "Acoustic Cafe", genre: "Acoustic", moods: ['happy', 'calm'], url: "/songs/SoundHelix-Song-10.mp3", cover: "https://placehold.co/300x300/a8e063/000000?text=Morning" },
    { id: "S005", title: "Victory Lap", artist: "The Champions", genre: "Rock", moods: ['energetic', 'upbeat'], url: "/songs/SoundHelix-Song-11.mp3", cover: "https://placehold.co/300x300/fc4a1a/ffffff?text=Victory" },

    {
        id: "S037",
        title: "Titanium",
        artist: "David Guetta ft. Sia",
        genre: "EDM",
        moods: ["uplifting", "motivational", "energetic"],
        url: "/songs/Titanium.mp3",
        cover: "https://placehold.co/300x300/0052d4/ffffff?text=Titanium"
    },
    {
        id: "S038",
        title: "Lose Yourself",
        artist: "Eminem",
        genre: "Hip-Hop",
        moods: ["motivational", "intense", "workout"],
        url: "/songs/lose-yourself.mp3",
        cover: "https://placehold.co/300x300/000000/ffffff?text=Lose"
    },
    { id: "S006", title: "City Lights", artist: "Urban Groove", genre: "Pop", moods: ['happy', 'driving'], url: "/songs/SoundHelix-Song-12.mp3", cover: "https://placehold.co/300x300/7f7fd5/ffffff?text=City" },
    { id: "S007", title: "Road Trip", artist: "The Wanderers", genre: "Indie", moods: ['happy', 'driving'], url: "/songs/SoundHelix-Song-13.mp3", cover: "https://placehold.co/300x300/3a7bd5/ffffff?text=Road" },
    { id: "S008", title: "Unstoppable", artist: "Power Hour", genre: "Electronic", moods: ['workout', 'energetic'], url: "/songs/SoundHelix-Song-14.mp3", cover: "https://placehold.co/300x300/e52d27/ffffff?text=Power" },
    { id: "S009", title: "Fiesta", artist: "Latin Heat", genre: "Latin", moods: ['happy', 'energetic'], url: "/songs/SoundHelix-Song-15.mp3", cover: "https://placehold.co/300x300/ff512f/ffffff?text=Fiesta" },
    { id: "S010", title: "Top of the World", artist: "Summit Singers", genre: "Pop", moods: ['happy', 'upbeat'], url: "/songs/SoundHelix-Song-16.mp3", cover: "https://placehold.co/300x300/1fab89/ffffff?text=Top" },
    {
        id: "S039",
        title: "21 Guns",
        artist: "Green Day",
        genre: "Rock",
        moods: ["reflective", "anthemic", "emotional"],
        url: "/songs/Green Day - 21 Guns.mp3",
        cover: "https://placehold.co/300x300/006400/ffffff?text=21+Guns"
    },
    {
        id: "S040",
        title: "Sign of the Times",
        artist: "Harry Styles",
        genre: "Pop-Rock",
        moods: ["melancholic", "epic", "emotional"],
        url: "/songs/Harry Styles - Sign of the Times.mp3",
        cover: "https://placehold.co/300x300/800080/ffffff?text=Times"
    },
    {
        id: "S041",
        title: "Carry You Home",
        artist: "James Blunt",
        genre: "Pop",
        moods: ["nostalgic", "sad", "soft"],
        url: "/songs/James Blunt - Carry You Home.mp3",
        cover: "https://placehold.co/300x300/2c3e50/ffffff?text=Home"
    },
    {
        id: "S042",
        title: "Goodbye My Lover",
        artist: "James Blunt",
        genre: "Pop",
        moods: ["breakup", "sad", "emotional"],
        url: "/songs/James Blunt - Goodbye My Lover.mp3",
        cover: "https://placehold.co/300x300/34495e/ffffff?text=Goodbye"
    },
    {
        id: "S043",
        title: "The Girl I Haven't Met",
        artist: "kudasaibeats",
        genre: "Lo-fi",
        moods: ["chill", "romantic", "study"],
        url: "/songs/kudasaibeats - the girl i haven't met.mp3",
        cover: "https://placehold.co/300x300/ffb6c1/000000?text=kudasai"
    },
    {
        id: "S044",
        title: "Levels",
        artist: "Avicii",
        genre: "Electronic",
        moods: ["party", "happy", "energetic"],
        url: "/songs/levels.mp3",
        cover: "https://placehold.co/300x300/f5a623/ffffff?text=Levels"
    },
    {
        id: "S045",
        title: "Vampire Diaries",
        artist: "Machine Gun Kelly",
        genre: "Hip-Hop",
        moods: ["dark", "intense"],
        url: "/songs/mgk  - vampire diaries.mp3",
        cover: "https://placehold.co/300x300/800000/ffffff?text=Vampire"
    },
    {
        id: "S046",
        title: "Burn It to the Ground",
        artist: "Nickelback",
        genre: "Rock",
        moods: ["party", "energetic", "rebellious"],
        url: "/songs/Nickelback - Burn It to the Ground.mp3",
        cover: "https://placehold.co/300x300/ff4e50/ffffff?text=Burn"
    },
    {
        id: "S047",
        title: "We Will Rock You",
        artist: "Queen",
        genre: "Rock",
        moods: ["anthem", "sports", "power"],
        url: "/songs/Queen - We Will Rock You.mp3",
        cover: "https://placehold.co/300x300/9b59b6/ffffff?text=Rock+You"
    },
    {
        id: "S048",
        title: "Beautiful Girls",
        artist: "Sean Kingston",
        genre: "Reggae-Pop",
        moods: ["summer", "happy", "chill"],
        url: "/songs/Sean Kingston - Beautiful Girls.mp3",
        cover: "https://placehold.co/300x300/00b894/ffffff?text=Beautiful"
    },
    {
        id: "S049",
        title: "Be More",
        artist: "Stephen Sanchez",
        genre: "Indie Pop",
        moods: ["romantic", "feel-good"],
        url: "/songs/Stephen Sanchez - Be More.mp3",
        cover: "https://placehold.co/300x300/0984e3/ffffff?text=Be+More"
    },
    {
        id: "S050",
        title: "In Too Deep",
        artist: "Sum 41",
        genre: "Punk Rock",
        moods: ["nostalgic", "energetic", "teen"],
        url: "/songs/Sum 41 - In Too Deep.mp3",
        cover: "https://placehold.co/300x300/1abc9c/ffffff?text=Too+Deep"
    },
    {
        id: "S051",
        title: "Eye of the Tiger",
        artist: "Survivor",
        genre: "Rock",
        moods: ["motivational", "workout", "anthem"],
        url: "/songs/Survivor - Eye Of The Tiger.mp3",
        cover: "https://placehold.co/300x300/e67e22/ffffff?text=Tiger"
    },
    {
        id: "S052",
        title: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
        genre: "Funk-Pop",
        moods: ["party", "funky", "happy"],
        url: "/songs/uptown-funk-ft-bruno-mars.mp3",
        cover: "https://placehold.co/300x300/f1c40f/000000?text=Funk"
    }


    // More variety
    ];


// --- Main App Components ---

const LoginScreen = ({ onLogin }) => {
    // const [username, setUsername] = useState('');
    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     if (username.trim()) onLogin({ username: username.trim() });
    // };

    // return (
    //     <div className="flex items-center justify-center h-screen bg-gray-900">
    //         <div className="text-center p-8 bg-gray-800 rounded-lg shadow-xl">
    //             <h1 className="text-5xl font-bold text-cyan-400 mb-4">Melody Music</h1>
    //             <p className="text-gray-400 mb-8">Your Personal Music Recommendation System</p>
    //             <form onSubmit={handleLogin}>
    //                 <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Login Name" className="w-full bg-gray-700 p-3 rounded-md mb-4 text-center text-white focus:outline-none focus:ring-2 focus:ring-cyan-400" />
    //                 <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold py-3 px-8 rounded-full transition-colors">Login</button>
    //             </form>
    //         </div>
    //     </div>
    // );
    return (<div className="flex items-center justify-center h-screen bg-gray-900">

     <AuthForms/>
     </div>)
};

const MoodDetector = ({ onMoodSelect }) => {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [detectedEmotion, setDetectedEmotion] = useState(null);
    const videoRef = useRef();
    const canvasRef = useRef();
    const intervalRef = useRef();

    const loadModels = async () => {
        if (isLoading || modelsLoaded) return;

        if (typeof window.faceapi === 'undefined') {
            alert("Face detection library not available. Please check your internet connection and ensure the script tag is in index.html.");
            return;
        }

        setIsLoading(true);
        try {
            const MODEL_URL = '/models';
            console.log("Loading face detection models...");
            await window.faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
            await window.faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
            setModelsLoaded(true);
            console.log("Face-api models loaded successfully.");
        } catch (error) {
            console.error("Error loading face-api models:", error);
            alert("Failed to load AI models. Make sure the 'models' folder is in your 'public' directory.");
        }
        setIsLoading(false);
    };

    const startVideo = () => {
        setIsCameraOn(true);
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(err => {
                console.error("Error accessing webcam:", err);
                setIsCameraOn(false);
            });
    };

    const stopVideo = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setIsCameraOn(false);
        setDetectedEmotion(null);
    };

    const handleVideoPlay = () => {
        intervalRef.current = setInterval(async () => {
            if (videoRef.current && canvasRef.current && window.faceapi) {
                canvasRef.current.innerHTML = window.faceapi.createCanvasFromMedia(videoRef.current);
                const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
                window.faceapi.matchDimensions(canvasRef.current, displaySize);

                const detections = await window.faceapi.detectAllFaces(videoRef.current, new window.faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

                if (detections && detections.length > 0) {
                    const expressions = detections[0].expressions;
                    const primaryEmotion = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);
                    setDetectedEmotion(primaryEmotion);

                    const moodMap = { happy: 'happy', sad: 'sad', angry: 'energetic', surprised: 'upbeat', neutral: 'calm' };
                    if (moodMap[primaryEmotion]) onMoodSelect(moodMap[primaryEmotion]);
                }
            }
        }, 500);
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><CameraIcon /> Mood Detector</h3>
            {!modelsLoaded ? (
                <button onClick={loadModels} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-600">
                    {isLoading ? 'Loading Models...' : 'Load AI Models'}
                </button>
            ) : (
                <>
                    {!isCameraOn ? (
                        <button onClick={startVideo} className="w-full bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold py-2 px-4 rounded">Start Camera</button>
                    ) : (
                        <button onClick={stopVideo} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">Stop Camera</button>
                    )}
                </>
            )}
            {isCameraOn && (
                <div className="relative mt-4">
                    <video ref={videoRef} autoPlay muted width="300" height="225" onPlay={handleVideoPlay} className="rounded-md w-full transform scale-x-[-1]"></video>
                    <canvas ref={canvasRef} className="absolute top-0 left-0"></canvas>
                    {detectedEmotion && <p className="text-center text-lg font-bold text-cyan-400 mt-2 capitalize">{detectedEmotion}</p>}
                </div>
            )}
        </div>
    );
};


const SongCard = ({ song, onPlay, onLike, onAddToPlaylist, isLiked, isPlaying }) => (
    <div className="bg-gray-800 rounded-lg p-4 flex flex-col group relative">
        <div className="relative">
            <img src={song.cover} alt={song.title} className="w-full h-auto rounded-md mb-4" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/2d3748/718096?text=Music'; }} />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={onPlay} className="text-white bg-cyan-500 rounded-full p-4">
                    {isPlaying ? <PauseIcon size={32} /> : <PlayIcon size={32} />}
                </button>
            </div>
        </div>
        <div className="flex-grow">
            <h3 className="font-bold text-lg truncate">{song.title}</h3>
            <p className="text-gray-400 text-sm truncate">{song.artist}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
            <button onClick={onLike} className={`text-gray-400 hover:text-white ${isLiked ? 'text-red-500' : ''}`}><HeartIcon isLiked={isLiked} /></button>
            <button onClick={onAddToPlaylist} className="text-gray-400 hover:text-white"><PlusIcon /></button>
        </div>
    </div>
);

const Player = ({ currentSong, isPlaying, onPlayPause, onNext, onPrev, progress }) => {
    if (!currentSong) return null;
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md p-4 shadow-2xl z-50">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4 w-1/4">
                    <img src={currentSong.cover} alt={currentSong.title} className="w-16 h-16 rounded-md" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x300/2d3748/718096?text=Music'; }} />
                    <div>
                        <h3 className="font-bold text-lg">{currentSong.title}</h3>
                        <p className="text-gray-400">{currentSong.artist}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2 w-1/2">
                    <div className="flex items-center gap-6">
                        <button onClick={onPrev} className="text-gray-400 hover:text-white"><SkipBackIcon /></button>
                        <button onClick={onPlayPause} className="bg-white text-gray-900 rounded-full p-3">
                            {isPlaying ? <PauseIcon size={28} /> : <PlayIcon size={28} />}
                        </button>
                        <button onClick={onNext} className="text-gray-400 hover:text-white"><SkipForwardIcon /></button>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                        <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
                <div className="flex items-center justify-end w-1/4"></div>
            </div>
        </div>
    );
};

const HomePage = ({ user, onLogout }) => {
    const [activeMood, setActiveMood] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [likedSongs, setLikedSongs] = useState(new Set());
    const [playlists, setPlaylists] = useState([]);

    // State for all three recommendation types
    const [similarityData, setSimilarityData] = useState(null);
    const [collaborativeRecs, setCollaborativeRecs] = useState([]); // User-Based: "Listeners Also Liked"
    const [itemBasedRecs, setItemBasedRecs] = useState([]);         // Item-Based: "Similar to what you're hearing"
    const [userBasedRecs, setUserBasedRecs] = useState([]);         // Content-Based: "Based on your likes"

    const audioRef = useRef(null);

    const getFilenameFromUrl = (url) => url.split('/').pop().replace(/%20/g, ' ');

    // Effect to load the cosine similarity data
    useEffect(() => {
        const fetchSimilarities = async () => {
            try {
                const response = await fetch('/songs_similarity.json');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setSimilarityData(data);
            } catch (error) {
                console.error("Failed to load or parse songs_similarity.json:", error);
            }
        };
        fetchSimilarities();
    }, []);

    // Effect to load user data from localStorage
    useEffect(() => {
        try {
            const savedLikes = localStorage.getItem(`melody-likedSongs-${user.username}`);
            if (savedLikes) setLikedSongs(new Set(JSON.parse(savedLikes)));
            const savedPlaylists = localStorage.getItem(`melody-playlists-${user.username}`);
            if (savedPlaylists) setPlaylists(JSON.parse(savedPlaylists));
        } catch (error) { console.error("Failed to load data from localStorage", error); }
    }, [user.username]);

    // Effect to control audio play/pause
    useEffect(() => {
        if (isPlaying && currentSong) {
            audioRef.current.play().catch(e => e.name !== 'AbortError' && console.error("Audio play error:", e));
        } else if (audioRef.current) {
            audioRef.current.pause();
        }
    }, [isPlaying, currentSong]);

    // 1. User-Based Collaborative Filtering ("Listeners Also Liked")
    useEffect(() => {
        if (!currentSong) {
            setCollaborativeRecs([]);
            return;
        }
        const findSimilarUsersSongs = () => {
            const similarSongs = new Set();
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith('melody-likedSongs-') && key !== `melody-likedSongs-${user.username}`) {
                    const otherUserLikes = new Set(JSON.parse(localStorage.getItem(key)));
                    if (otherUserLikes.has(currentSong.id)) {
                        otherUserLikes.forEach(songId => {
                            if (songId !== currentSong.id && !likedSongs.has(songId)) {
                                similarSongs.add(songId);
                            }
                        });
                    }
                }
            }
            const recommendedSongs = allSongs.filter(song => similarSongs.has(song.id));
            setCollaborativeRecs(recommendedSongs.slice(0, 6));
        };
        findSimilarUsersSongs();
    }, [currentSong, user.username, likedSongs]);

    // 2. Item-Based Recommendations (using cosine similarity)
    useEffect(() => {
        if (!currentSong || !similarityData) {
            setItemBasedRecs([]);
            return;
        }
        const currentFilename = getFilenameFromUrl(currentSong.url);
        const songSimilarities = similarityData.find(s => getFilenameFromUrl(s.filename) === currentFilename);
        if (songSimilarities) {
            const similarFilenames = songSimilarities.similar_songs.map(s => getFilenameFromUrl(s.filename));
            const recommendedSongs = allSongs.filter(song =>
                similarFilenames.includes(getFilenameFromUrl(song.url)) && !likedSongs.has(song.id) && song.id !== currentSong.id
            ).sort((a, b) =>
                similarFilenames.indexOf(getFilenameFromUrl(a.url)) - similarFilenames.indexOf(getFilenameFromUrl(b.url))
            );
            setItemBasedRecs(recommendedSongs.slice(0, 6));
        } else {
            setItemBasedRecs([]);
        }
    }, [currentSong, similarityData, likedSongs]);

    // 3. Content-Based Recommendations (based on all liked songs)
    useEffect(() => {
        if (likedSongs.size === 0 || !similarityData) {
            setUserBasedRecs([]);
            return;
        }
        const recommendationsMap = new Map();
        const likedSongDetails = allSongs.filter(s => likedSongs.has(s.id));
        likedSongDetails.forEach(likedSong => {
            const likedFilename = getFilenameFromUrl(likedSong.url);
            const songSimilarities = similarityData.find(s => getFilenameFromUrl(s.filename) === likedFilename);
            if (songSimilarities) {
                songSimilarities.similar_songs.forEach(similar => {
                    const similarSongObject = allSongs.find(s => getFilenameFromUrl(s.url) === getFilenameFromUrl(similar.filename));
                    if (similarSongObject && !likedSongs.has(similarSongObject.id)) {
                        if (!recommendationsMap.has(similar.filename) || recommendationsMap.get(similar.filename) < similar.similarity) {
                            recommendationsMap.set(similar.filename, similar.similarity);
                        }
                    }
                });
            }
        });
        const sortedRecs = Array.from(recommendationsMap.entries()).sort(([, aSim], [, bSim]) => bSim - aSim).map(([filename]) => getFilenameFromUrl(filename));
        const finalRecommendations = allSongs.filter(song => sortedRecs.includes(getFilenameFromUrl(song.url))).sort((a, b) => sortedRecs.indexOf(getFilenameFromUrl(a.url)) - sortedRecs.indexOf(getFilenameFromUrl(b.url)));
        setUserBasedRecs(finalRecommendations.slice(0, 6));
    }, [likedSongs, similarityData]);

    // --- Handler Functions (unchanged) ---
    const handlePlay = (song) => {
        if (currentSong?.id === song.id && isPlaying) setIsPlaying(false);
        else {
            setCurrentSong(song);
            setIsPlaying(true);
        }
    };
    const handlePlayPause = () => setIsPlaying(!isPlaying);
    const handleNext = () => {
        const currentIndex = allSongs.findIndex(s => s.id === currentSong.id);
        const nextIndex = (currentIndex + 1) % allSongs.length;
        setCurrentSong(allSongs[nextIndex]);
    };
    const handlePrev = () => {
        const currentIndex = allSongs.findIndex(s => s.id === currentSong.id);
        const prevIndex = (currentIndex - 1 + allSongs.length) % allSongs.length;
        setCurrentSong(allSongs[prevIndex]);
    };
    const handleTimeUpdate = () => { if (audioRef.current) { const { currentTime, duration } = audioRef.current; if (duration) setProgress((currentTime / duration) * 100); } };
    const toggleLikeSong = (songId) => {
        const newLikes = new Set(likedSongs);
        if (newLikes.has(songId)) newLikes.delete(songId);
        else newLikes.add(songId);
        setLikedSongs(newLikes);
        localStorage.setItem(`melody-likedSongs-${user.username}`, JSON.stringify([...newLikes]));
    };
    const addSongToPlaylist = (songId) => {
        if (playlists.length === 0) { alert("Create a playlist first!"); return; }
        const playlistIndex = parseInt(prompt(`Add to which playlist? (0-${playlists.length - 1})\n\n` + playlists.map((p, i) => `${i}: ${p.name}`).join('\n')));
        if (!isNaN(playlistIndex) && playlists[playlistIndex]) {
            const newPlaylists = [...playlists];
            if (!newPlaylists[playlistIndex].songs.includes(songId)) {
                newPlaylists[playlistIndex].songs.push(songId);
                setPlaylists(newPlaylists);
                localStorage.setItem(`melody-playlists-${user.username}`, JSON.stringify(newPlaylists));
            } else alert("Song already in playlist.");
        }
    };

    // --- Variables for Rendering ---
    const moods = ['happy', 'sad', 'energetic', 'calm'];
    const filteredSongs = activeMood ? allSongs.filter(s => s.moods.includes(activeMood)) : allSongs;

    return (
        <div className="pb-32">
            {/* ✨ FIXED: Header JSX restored */}
            <header className="flex justify-between items-center mb-8 p-4 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">Melody Music</h1>
                <div>
                    <span className="text-gray-400 mr-4">Welcome, {user.username}!</span>
                    <button onClick={onLogout} className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-colors"><LogoutIcon /> Logout</button>
                </div>
            </header>

            <main className="container mx-auto px-4 md:px-8">
                {/* ✨ FIXED: Mood selection and detector JSX restored */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold mb-4">What's your mood today?</h2>
                        <div className="flex flex-wrap gap-3">
                            {moods.map(mood => (
                                <button key={mood} onClick={() => setActiveMood(mood)} className={`px-4 py-2 rounded-full font-semibold transition-colors ${activeMood === mood ? 'bg-cyan-500 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'}`}>{mood.charAt(0).toUpperCase() + mood.slice(1)}</button>
                            ))}
                            {activeMood && <button onClick={() => setActiveMood(null)} className="px-4 py-2 rounded-full font-semibold bg-gray-600 hover:bg-gray-500">Show All</button>}
                        </div>
                    </div>
                    <MoodDetector onMoodSelect={setActiveMood} />
                </div>

                {/* ✨ FIXED: Mood-based song list JSX restored */}
                {activeMood && (
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Songs for {activeMood.charAt(0).toUpperCase() + activeMood.slice(1)}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {filteredSongs.map(song => <SongCard key={song.id} song={song} onPlay={() => handlePlay(song)} onLike={() => toggleLikeSong(song.id)} onAddToPlaylist={() => addSongToPlaylist(song.id)} isLiked={likedSongs.has(song.id)} isPlaying={isPlaying && currentSong?.id === song.id} />)}
                        </div>
                    </div>
                )}

                {/* --- Recommendation Sections --- */}
                {collaborativeRecs.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Listeners Also Liked</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {collaborativeRecs.map(song => <SongCard key={`collab-${song.id}`} song={song} onPlay={() => handlePlay(song)} onLike={() => toggleLikeSong(song.id)} onAddToPlaylist={() => addSongToPlaylist(song.id)} isLiked={likedSongs.has(song.id)} isPlaying={isPlaying && currentSong?.id === song.id} />)}
                        </div>
                    </div>
                )}

                {itemBasedRecs.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Because You're Listening to <span className="text-cyan-400">{currentSong.title}</span></h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {itemBasedRecs.map(song => <SongCard key={`item-${song.id}`} song={song} onPlay={() => handlePlay(song)} onLike={() => toggleLikeSong(song.id)} onAddToPlaylist={() => addSongToPlaylist(song.id)} isLiked={likedSongs.has(song.id)} isPlaying={isPlaying && currentSong?.id === song.id} />)}
                        </div>
                    </div>
                )}

                {userBasedRecs.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-6">Recommended For You</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {userBasedRecs.map(song => <SongCard key={`user-${song.id}`} song={song} onPlay={() => handlePlay(song)} onLike={() => toggleLikeSong(song.id)} onAddToPlaylist={() => addSongToPlaylist(song.id)} isLiked={likedSongs.has(song.id)} isPlaying={isPlaying && currentSong?.id === song.id} />)}
                        </div>
                    </div>
                )}

                {/* --- Featured Songs Section --- */}
                <h2 className="text-3xl font-bold mb-6">Featured Songs</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {allSongs.slice(0, 20).map(song => <SongCard key={song.id} song={song} onPlay={() => handlePlay(song)} onLike={() => toggleLikeSong(song.id)} onAddToPlaylist={() => addSongToPlaylist(song.id)} isLiked={likedSongs.has(song.id)} isPlaying={isPlaying && currentSong?.id === song.id} />)}
                </div>
            </main>

            <Player currentSong={currentSong} isPlaying={isPlaying} onPlayPause={handlePlayPause} onNext={handleNext} onPrev={handlePrev} progress={progress} />
            {currentSong && <audio ref={audioRef} src={currentSong.url} onTimeUpdate={handleTimeUpdate} onEnded={handleNext} />}
        </div>
    );
};

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        function handleLoggedInUser(){
            const loggedInUser = sessionStorage.getItem('melody-user');
            if (loggedInUser) setUser(JSON.parse(loggedInUser));

        }
        handleLoggedInUser()
        window.addEventListener("storage",handleLoggedInUser)
    }, []);

    const handleLogin = (newUser) => {
        sessionStorage.setItem('melody-user', JSON.stringify(newUser));
        setUser(newUser);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('melody-user');
        setUser(null);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans">
            {!user ? <LoginScreen onLogin={handleLogin} /> : <HomePage user={user} onLogout={handleLogout} />}
        </div>
    );
}
