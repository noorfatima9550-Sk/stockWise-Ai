import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import Input from './Input.jsx';
import Button from './Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'staff'
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setIsSubmitting(true);
      await register(formData.name, formData.email, formData.password, formData.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-card border border-gray-100 p-8 sm:p-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          Create Account ✨
        </h2>
        <p className="text-gray-500 text-sm">
          Get started with your StockWise AI account
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5 mb-5">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          type="text"
          name="name"
          placeholder="Enter your full name"
          icon={User}
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Password"
          name="password"
          placeholder="Create a password (min 6 chars)"
          icon={Lock}
          isPassword
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
          >
            <option value="staff">Staff Member</option>
            <option value="manager">Warehouse Manager</option>
            <option value="admin">System Administrator</option>
          </select>
        </div>

        <Button type="submit" variant="primary" icon={UserPlus} fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-primary-600 hover:text-primary-700"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default Register;
