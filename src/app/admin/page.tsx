import { redirect } from 'next/navigation';

export default function AdminIndex() {
  // Redirect to dashboard by default if logged in (middleware will handle auth)
  redirect('/admin/dashboard');
}
