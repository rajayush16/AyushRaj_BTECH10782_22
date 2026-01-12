import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, deleteProfile, logout } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    const payload = Object.fromEntries(
      Object.entries(form).filter(([, value]) => value && value.length > 0)
    );

    if (Object.keys(payload).length === 0) {
      setError('Enter at least one field to update.');
      return;
    }

    try {
      await updateProfile(payload);
      setMessage('Profile updated successfully.');
      setForm((prev) => ({ ...prev, password: '' }));
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) {
      return;
    }
    try {
      await deleteProfile();
      navigate('/register');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-2xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Profile settings</h1>
            <p className="text-sm text-slate-400">Manage your account information.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200"
            >
              Logout
            </button>
            <button
              onClick={() => navigate('/board')}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900"
            >
              Back to board
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-400">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-400">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-400">New password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            />
          </div>
          {message ? (
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
              {message}
            </div>
          ) : null}
          {error ? (
            <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
              {error}
            </div>
          ) : null}
          <div className="flex justify-between gap-3">
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-full border border-rose-600/60 px-4 py-2 text-sm text-rose-200"
            >
              Delete account
            </button>
            <button
              type="submit"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;