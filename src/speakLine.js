const synth = typeof window === 'undefined' ? {} : window.speechSynthesis; // Client side only
const line = words => new SpeechSynthesisUtterance(words);
const speakLine = words => synth.speak(line(words));
export default speakLine;
