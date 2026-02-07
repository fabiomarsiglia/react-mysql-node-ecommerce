import {LoginForm} from '../components/AuthComponents.jsx';



export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Accedi</h1>
          <p className="text-gray-600">Bentornato su Marsiglia Ricambi</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
