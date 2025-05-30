import { Close, ExpandMore } from "@mui/icons-material";
import ChatbotIcon from "./ChatbotIcon";
import { IconButton } from "@mui/material";
import ChartForm from "./ChatForm";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useGetAllCoursesQuery } from "@services/rootApi";

const ChatAi = () => {
  const { data } = useGetAllCoursesQuery();
  console.log(data);
  const [chatHistory, setChatHistory] = useState([]); // Khởi tạo rỗng

  useEffect(() => {
    if (data?.courses && data.courses.length > 0) {
      setChatHistory([
        {
          hideInChat: true,
          role: "model",
          text: data.courses
            .map(
              (course) =>
                `- ${course?.description} - ${course?.price}đ - ${course?.image} - ${course?._id || ""} -`,
            )
            .join("\n"),
        },
      ]);
    }
  }, [data]);

  const [showChatbot, setShowChatbot] = useState(false);

  const chatBodyRef = useRef();
  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Đang tìm kiếm..."),
        { role: "model", text, isError },
      ]);
    };

    // Lọc các message không có text hoặc text rỗng
    const filteredHistory = history.filter(
      (msg) => typeof msg.text === "string" && msg.text.trim() !== "",
    );

    const mappedHistory = filteredHistory.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: mappedHistory,
      }),
    };

    try {
      const response = await fetch(import.meta.env.VITE_AI_URL, requestOptions);
      const data = await response.json();
      if (!response.ok)
        throw new Error(data?.error?.message || "Failed to fetch response");
      const apiResponseText = data?.candidates[0]?.content?.parts[0]?.text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <>
      {/* Nút mở/đóng chatbot */}
      <button
        id="chatbot-toggler"
        className="fixed bottom-4 right-4 z-[100] flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full border-none bg-primary-main p-2 shadow-lg"
        onClick={() => setShowChatbot(!showChatbot)}
      >
        {showChatbot ? (
          <Close className="text-white" />
        ) : (
          <ChatbotIcon className="fill-white" />
        )}
      </button>

      {/* Cửa sổ chat AI */}
      <div
        className={`fixed bottom-4 right-4 z-[101] w-[420px] flex-col overflow-hidden rounded-[15px] bg-[#fff] shadow-lg transition-all duration-300 ${
          showChatbot ? "flex" : "hidden"
        }`}
      >
        <div className="flex items-center justify-between border-b bg-primary-main px-[22px] py-[15px]">
          <div className="flex items-center gap-2">
            <ChatbotIcon className="h-[35px] w-[35px] flex-shrink-0 rounded-full bg-white fill-primary-main p-2" />
            <h2 className="cursor-pointer p-2 font-bold text-white">
              Chatbot AI
            </h2>
          </div>
          <IconButton
            className="size-[35px] !bg-white !text-primary-main"
            onClick={() => setShowChatbot(false)}
          >
            <ExpandMore />
          </IconButton>
        </div>
        <div className="flex h-[520px] flex-col">
          <div
            ref={chatBodyRef}
            className="flex flex-1 flex-col gap-4 overflow-y-auto p-[20px] pb-[72px]"
          >
            <div className="flex items-center gap-3">
              <ChatbotIcon className="h-[35px] w-[35px] flex-shrink-0 rounded-full bg-primary-main fill-white p-2" />
              <p className="max-w-[75%] px-[16px] py-[12px]">
                Xin chào <br />
                Tôi là WeConnect Academy, tôi có thể giúp gì cho bạn?
              </p>
            </div>

            {chatHistory
              .filter((message) => !message.hideInChat) // chỉ render message không bị ẩn
              .map((message, index) =>
                message.role === "user" ? (
                  <div
                    key={index}
                    className="flex flex-col items-end justify-end"
                  >
                    <p className="max-w-[75%] rounded-lg bg-primary-main px-[16px] py-[12px] text-white">
                      {message.text}
                    </p>
                  </div>
                ) : (
                  <div key={index} className="flex items-center gap-3">
                    <ChatbotIcon className="h-[35px] w-[35px] flex-shrink-0 rounded-full bg-primary-main fill-white p-2" />
                    <div
                      className={`max-w-[75%] rounded-lg px-[16px] py-[12px] ${
                        message.isError ? "text-primary-main" : "text-black"
                      }`}
                    >
                      {/* Hiển thị từng dòng sản phẩm đẹp hơn */}
                      {message.text.split("\n").map((line, i) => {
                        // Tìm link ảnh và link sản phẩm trong từng dòng
                        const imgMatch = line.match(
                          /https?:\/\/.*\.(?:png|jpg|jpeg|gif)/gi,
                        );
                        const linkMatch = line.match(
                          /https?:\/\/[^\s]+\/course\/[a-zA-Z0-9]+/gi,
                        );
                        // Lấy phần text trước link

                        const textOnly = line
                          .replace(/https?:\/\/.*\.(?:png|jpg|jpeg|gif)/gi, "")
                          .replace(
                            /https?:\/\/localhost:5173\/course\/[a-zA-Z0-9]+/gi,
                            "",
                          )
                          .replace(/^\s*[*-]\s*/g, "") // Xóa dấu * hoặc - ở đầu dòng
                          .replace(/\[Hình ảnh\]\(\)/gi, "") // Xóa [Hình ảnh]()
                          .replace(/\[Chi tiết\]\(\)/gi, "") // Xóa [Chi tiết]()
                          .replace(/\[Ảnh\]\(\)/gi, "") // Xóa [Chi tiết]()
                          .replace(/\s*-\s*/g, " ") // Xóa dấu - giữa các trường
                          .trim();

                        return (
                          <div
                            key={i}
                            style={{
                              marginBottom: 16,
                              display: "flex",
                              gap: 16,
                              alignItems: "start",

                              width: 320,
                            }}
                          >
                            {imgMatch ? (
                              linkMatch ? (
                                <a
                                  href={linkMatch[0]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    display: "inline-block",
                                  }}
                                >
                                  <img
                                    src={imgMatch[0]}
                                    alt="product"
                                    style={{
                                      width: 270,
                                      height: 100,

                                      objectFit: "cover",
                                      borderRadius: 8,

                                      background: "#f3f3f3",
                                    }}
                                  />
                                </a>
                              ) : (
                                <img
                                  src={imgMatch[0]}
                                  alt="product"
                                  style={{
                                    width: 80,
                                    height: 80,
                                    objectFit: "cover",
                                    borderRadius: 8,
                                    marginBottom: 8,
                                    background: "#f3f3f3",
                                  }}
                                />
                              )
                            ) : null}
                            <div style={{ textAlign: "start" }}>
                              {textOnly &&
                                (linkMatch ? (
                                  <a
                                    href={linkMatch[0]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      color: "black",
                                      fontWeight: "normal",
                                      textDecoration: "none",
                                    }}
                                  >
                                    {textOnly}
                                  </a>
                                ) : (
                                  <span>{textOnly}</span>
                                ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ),
              )}
          </div>
          <div className="border-t bg-white p-2">
            <ChartForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatAi;
