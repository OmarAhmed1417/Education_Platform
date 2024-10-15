import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Writing() {
  const [Ques, setQues] = useState("");
  const [Ans, setAns] = useState("");
  const [img, setImg] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare JSON payload
    const data = {
      questionText: Ques,
      correctAnswer: Ans,
      questionImage: img ? await convertImageToBase64(img) : null, // Convert image to base64 if uploaded
    };

    try {
      const response = await axios.post(
        'http://localhost:5049/Api/Question/CreateChooseQuestionWithAnswer',
        data,
        {
          headers: {
            'Content-Type': 'application/json', // Set content type to JSON
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Question Submitted Successfully!',
        });
        // Clear form after successful submission
        setQues("");
        setAns("");
        setImg(null);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error submitting the question.',
      });
    }
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-center text-white mb-6">Submit Your Question</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
        <div className="mb-4">
          <label htmlFor="question" className="block text-gray-800 font-semibold mb-2">Question Text:</label>
          <textarea
            id="question"
            value={Ques}
            onChange={(e) => setQues(e.target.value)}
            required
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your question here"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="answer" className="block text-gray-800 font-semibold mb-2">Correct Answer:</label>
          <textarea
            id="answer"
            value={Ans}
            onChange={(e) => setAns(e.target.value)}
            required
            rows={2}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the correct answer"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-800 font-semibold mb-2">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div>
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200">
            Submit Question
          </button>
        </div>
      </form>
    </div>
  );
}
