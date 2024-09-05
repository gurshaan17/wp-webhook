import { useState } from 'react';
import axios from 'axios'; 


export default function Landing() {
  const [message, setMessage] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [chatHistory, setChatHistory] = useState([]); 
  
  const sendMessage = async () => {
    if (!message || !phoneNumber) {
      alert("Please enter a message and a phone number!");
      return;
    }
    try {
      const response = await axios.post('/api/messages', {
        message,
        phoneNumber
      });

      setChatHistory([...chatHistory, {
        type: 'sent',
        content: message,
        time: new Date().toLocaleTimeString(),
      }]);

      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message, please try again.');
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-[#f0f2f5]">
      <div className="flex h-16 items-center border-b border-[#e9edef] bg-[#f0f2f5] px-4">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-[#e9edef] p-2">
            <ChevronLeftIcon className="h-5 w-5 text-[#54656f]" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full border-2 border-[#e9edef] bg-gray-300"></div>
            <div>
              <div className="text-[#111b21] font-semibold">John Doe</div>
              <div className="text-[#54656f] text-sm">Online</div>
            </div>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <button className="rounded-full p-2">
            <SearchIcon className="h-5 w-5 text-[#54656f]" />
          </button>
          <button className="rounded-full p-2">
            <MoveVerticalIcon className="h-5 w-5 text-[#54656f]" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-end gap-2">
          <div className="h-8 w-8 rounded-full bg-gray-300"></div>
          <div className="max-w-[60%] rounded-t-2xl rounded-br-2xl bg-white p-3 text-sm text-[#111b21] shadow-md">
            <p>Hey, how's it going?</p>
            <div className="mt-1 text-xs text-[#54656f]">10:30 AM</div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <div className="max-w-[60%] rounded-t-2xl rounded-bl-2xl bg-[#d9fdd3] p-3 text-sm text-[#111b21] shadow-md">
            <p>I'm doing great, thanks for asking!</p>
            <div className="mt-1 text-xs text-[#54656f]">10:31 AM</div>
          </div>
        </div>

      </div>
      <div className="flex h-20 items-center border-t border-[#e9edef] bg-[#f0f2f5] px-4">
        <div className="flex flex-1 items-center gap-2">
          <button className="rounded-full p-2">
            <PaperclipIcon className="h-5 w-5 text-[#54656f]" />
          </button>
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 rounded-full bg-[#e9edef] px-4 py-2 text-sm text-[#111b21] focus:outline-none"
          />
          <button className="rounded-full p-2">
            <SmileIcon className="h-5 w-5 text-[#54656f]" />
          </button>
        </div>
        <button className="rounded-full bg-[#25d366] px-4 py-2 text-sm font-medium text-white">Send</button>
      </div>
    </div>
  );
}

function ChevronLeftIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    )
  }
  

function MoveVerticalIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="8 18 12 22 16 18" />
        <polyline points="8 6 12 2 16 6" />
        <line x1="12" x2="12" y1="2" y2="22" />
      </svg>
    )
  }
  
  
  function PaperclipIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
      </svg>
    )
  }
  
  
  function SearchIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    )
  }
  
  
  function SmileIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
      </svg>
    )
  }