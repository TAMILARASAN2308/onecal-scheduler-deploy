import { useNavigate,useLocation } from 'react-router-dom';


const EventConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {email, urlSlug} = location.state || {};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="w-full max-w-md border shadow-md border-gray-200 rounded-lg p-6 flex flex-col items-center">
        {/* Green checkmark circle */}
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <p className="text-gray-600 text-center mb-6">We emailed you all the details, including the Google Meet link!</p>
        {/* Close button */}
        <button
          onClick={() => navigate(`/OneCal/${email}/${urlSlug}`)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-colors"
        >
          Close this Page
        </button>
      </div>
    </div>
  )
}

export default EventConfirmation

