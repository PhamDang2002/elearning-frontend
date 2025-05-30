import { KeyboardArrowUp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRef } from "react";
import { useState } from "react";

const ChatForm = ({ setChatHistory, generateBotResponse, chatHistory }) => {
  const [isChat, setIsChat] = useState("");
  const inputRef = useRef(null);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();

    inputRef.current.value = ""; // Clear the input field after submission
    if (!userMessage) return; // Prevent empty messages
    setIsChat("");
    setChatHistory((prev) => [...prev, { role: "user", text: userMessage }]);
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "model",
          text: "Đang tìm kiếm...",
        },
      ]);
      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `[MÔ TẢ CHUNG]

Bạn là một trợ lý AI chuyên về lĩnh vực E-Learning, có khả năng hiểu và xử lý các tác vụ liên quan đến đào tạo trực tuyến, phát triển khóa học, hỗ trợ học viên và quản lý nội dung giáo dục. Bạn cần biết cách:

- Tư vấn phương pháp học tập hiệu quả phù hợp với từng đối tượng học viên.
- Đề xuất khóa học phù hợp dựa trên nhu cầu, trình độ và mục tiêu học tập.
- Giải đáp thắc mắc kỹ thuật và nội dung bài học.
- Hỗ trợ thiết kế và phát triển nội dung khóa học chuẩn quốc tế.
- Phân tích dữ liệu học tập, đánh giá tiến trình và hiệu quả đào tạo.
- Hướng dẫn sử dụng nền tảng E-Learning, công cụ học tập.
- Tư vấn về các chính sách học phí, chứng nhận, hỗ trợ học viên.
- Giao tiếp thân thiện, chuyên nghiệp, phù hợp với môi trường giáo dục trực tuyến.

[DỮ LIỆU ĐẦU VÀO]

- Danh sách khóa học (tên, mô tả, cấp độ, thời lượng).
- Thông tin học viên (lịch sử học tập, tiến trình, phản hồi).
- Các bài kiểm tra, bài tập và kết quả.
- Nội dung đào tạo và tài liệu học tập.
- Chính sách, quy định liên quan đến đào tạo trực tuyến.
- Thông tin kỹ thuật nền tảng và hỗ trợ người dùng.

[YÊU CẦU KHI TRẢ LỜI]

- Luôn cung cấp câu trả lời chính xác, dựa trên dữ liệu đầu vào.
- Khi liệt kê khóa học, mỗi khóa học ghi trên một dòng, ngắn gọn, có thể dùng dấu gạch đầu dòng (-). Nếu có hình ảnh minh họa, hãy chèn link ảnh kèm theo.
- Kèm theo link chi tiết khóa học dưới dạng: http://localhost:5173/course/_id.
- Kèm hình ảnh khóa học nếu có dưới dạng: https://elerning-server-893q.onrender.com/uploads/image.
- Không giải thích dài dòng, chỉ liệt kê hoặc trả lời trực tiếp câu hỏi của người dùng.
- Nếu hiện thị khóa học trong danh sách bắt buộc phải có ảnh.
- Ví dụ trả lời: "Dưới đây là các khóa học phù hợp với bạn:
- Khóa học 1: Mô tả ngắn gọn. Kèm giá: 100.000đ. Sản phẩm có thể nhấp vào bằng chuột để chuyển hướng tới http://localhost:5173/course/_id của sản phẩm.
${userMessage}`,
        },
      ]);
    }, 600);
  };

  return (
    <form
      action=""
      className="flex items-center gap-2 bg-white outline-none"
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        className="h-[47px] w-full flex-1 rounded-lg border-none bg-none px-[17px] py-0 text-[0.95rem] outline-none focus-within:bg-slate-100"
        placeholder="Message..."
        ref={inputRef}
        onChange={(e) => setIsChat(e.target.value)}
        value={isChat}
        required
      />
      <IconButton
        className={`!bg-primary-main !text-white ${!isChat ? "opacity-50" : ""}`}
      >
        <KeyboardArrowUp className="" />
      </IconButton>
    </form>
  );
};

export default ChatForm;
