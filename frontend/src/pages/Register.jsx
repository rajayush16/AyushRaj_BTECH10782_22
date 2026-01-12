import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/board');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
        <h1 className="text-3xl font-semibold">Create your account</h1>
        <p className="mt-2 text-sm text-slate-400">
          Start organizing tasks in your personal kanban board.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-400">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-400">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-400">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
            />
          </div>
          {error ? (
            <div className="rounded-lg border border-rose-500/50 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
              {error}
            </div>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-70"
          >
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-400">
          Already have an account?{' '}
          <Link className="text-slate-100 underline" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;