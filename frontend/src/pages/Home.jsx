import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../components/Header";
import { ChatData } from "../context/ChatContext";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { LoadingBig, LoadingSmall } from "../components/Loading";
import { IoMdSend } from "react-icons/io";

const parseResponse = (text) => {
    let formattedText = text;

    // Bold text between '**' (styled with yellow)
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');

    // Handle Line breaks marked with '*' (removed '*' after parsing and added line breaks)
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<br class="my-3" />$1');

    // Handle Main Title - '##' for headings (with added margin and white text color)
    formattedText = formattedText.replace(/^## (.*?)$/gm, '<h2 class="text-4xl font-extrabold text-white mb-6">$1</h2>');

    // Remove all '*' characters after parsing and additional line break space handling
    formattedText = formattedText.replace(/\*/g, '');

    // Handle ordered list format, e.g., "I. Foundations:" becomes a styled list
    formattedText = formattedText.replace(/^([A-Z]+)\. (.*?):/gm, '<h3 class="text-xl font-semibold text-white mb-2">$1. $2</h3>');

    // Add margin-right to sublist items (like "a. Understanding the Exam:")
    formattedText = formattedText.replace(/^([a-zA-Z]+)\. (.*)$/gm, '<div class="ml-8 mr-4 text-md text-gray-300">$1. $2</div>');

    // Add additional spacing between blocks of text
    formattedText = formattedText.replace(/(\n|\r|\r\n)/g, '<div class="mb-4"></div>');

    // Add a padding around the content for better text flow (optional)
    formattedText = `<div class="p-4">${formattedText}</div>`;

    return formattedText;
};

const Home = () => {
  // Sidebar state management
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the sidebar open/close state
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Destructure values from the ChatContext
  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoading,
    loading,
    chats,
  } = ChatData();

  // Form submission handler
  const submitHandler = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  // Ref to scroll the message container
  const messagecontainerRef = useRef();

  useEffect(() => {
    if (messagecontainerRef.current) {
      messagecontainerRef.current.scrollTo({
        top: messagecontainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar Component */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 flex-col">
        {/* Sidebar Toggle Button for mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-4 bg-gray-800 text-2xl"
        >
          <GiHamburgerMenu />
        </button>

        <div className="flex-1 p-6 mb-20 md:mb-0">
          <Header />

          {/* Loading or Chat Messages */}
          {loading ? (
            <LoadingBig />
          ) : (
            <div
              className="flex-1 p-6 max-h-[600px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar"
              ref={messagecontainerRef}
            >
              {messages && messages.length > 0 ? (
                messages.map((e, i) => (
                  <div key={i}>
                    {/* Question Message */}
                    <div className="mb-4 p-4 rounded bg-blue-700 text-white flex gap-1">
                      <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
                        <CgProfile />
                      </div>
                      {e.question}
                    </div>

                    {/* Answer Message with parsed response */}
                    <div className="mb-4 p-4 rounded bg-gray-700 text-white flex gap-1">
                      <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
                        <FaRobot />
                      </div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: parseResponse(e.answer),
                        }}
                      ></p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No chat yet</p>
              )}

              {/* Loading Indicator for New Request */}
              {newRequestLoading && <LoadingSmall />}
            </div>
          )}
        </div>
      </div>

      {/* Message Input Box */}
      {chats && chats.length === 0 ? (
        ""
      ) : (
        <div className="fixed bottom-0 right-0 left-auto p-4 bg-gray-900 w-full md:w-[75%]">
          <form onSubmit={submitHandler} className="flex justify-center items-center">
            <input
              className="flex-grow p-4 bg-gray-700 rounded-l text-white outline-none"
              type="text"
              placeholder="Enter a prompt here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
            <button className="p-4 bg-gray-700 rounded-r text-2xl text-white">
              <IoMdSend />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
