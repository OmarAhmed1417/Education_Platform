import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function MultipleChoiceQuestion() {
  const [questionText, setQuestionText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const [choices, setChoices] = useState<string[]>([""]); // Initialize with an empty choice

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files[0]);
    }
  };

  const handleChoiceChange = (index: number, value: string) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const addChoice = () => {
    setChoices([...choices, ""]); // Add a new empty choice
  };

  const removeChoice = (index: number) => {
    const newChoices = choices.filter((_, i) => i !== index);
    setChoices(newChoices);
    // Reset correct answer if it's removed
    if (correctAnswer === choices[index]) {
      setCorrectAnswer("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare JSON payload
    const data = {
      questionText,
      correctAnswer,
      choiceList: choices,
      questionImage: img ? await convertImageToBase64(img) : null, // Convert image to base64 if uploaded
    };

    try {
      const response = await axios.post(
        'http://localhost:5049/Api/Question/CreateChooseQuestionWithAnswer', // API endpoint
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
        setQuestionText("");
        setCorrectAnswer("");
        setImg(null);
        setChoices([""]); // Reset choices for multiple-choice
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

  // Helper function to convert image to Base64
  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Submit a Multiple Choice Question</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
        <div className="mb-4">
          <label htmlFor="question" className="block text-gray-700 font-semibold">Question Text:</label>
          <textarea
            id="question"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your question here"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="correctAnswer" className="block text-gray-700 font-semibold">Correct Answer:</label>
          <input
            type="text"
            id="correctAnswer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter the correct answer"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Choices:</label>
          {choices.map((choice, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
                placeholder={`Choice ${index + 1}`}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button type="button" onClick={() => removeChoice(index)} className="ml-2 text-red-500 font-bold hover:underline">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addChoice} className="text-blue-600 font-semibold hover:underline">
            Add Choice
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-semibold">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 border border-gray-300 rounded-lg p-2"
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
