/**
 * Data structures for Pulse Studio CRM
 * Note: This is client-side only storage. For production, wire this up to a real backend.
 */

let members = [
  ['RS', 'Riya Shah', 'Checked in 6 min ago', 'Unlimited', 'Active', ''],
  ['VN', 'Vikram Nair', 'Membership expires in 2 days', 'Core 8', 'Due soon', 'due'],
  ['SD', 'Sana Dsouza', 'Checked in 19 min ago', 'Annual', 'Active', ''],
  ['AM', 'Arjun Malhotra', 'Personal training session tomorrow', 'Elite', 'Active', ''],
  ['ZK', 'Zara Khan', 'Membership expires in 4 days', 'Core 8', 'Due soon', 'due']
];

let leads = [
  { name: 'Aisha Khan', note: 'Free trial completed', pct: 80, tag: 'Hot', cls: 'hot' },
  { name: 'Naveen Thomas', note: 'Studio tour booked today', pct: 52, tag: 'Warm', cls: '' },
  { name: 'Priyanka Pillai', note: 'Enquiry from Instagram', pct: 24, tag: 'New', cls: '' }
];

let sessions = [
  { time: '06:00 AM', name: 'Vinyasa Flow', trainer: 'Meera Joshi', studio: 'Studio A', booked: '17/20' },
  { time: '07:30 AM', name: 'Strength Circuit', trainer: 'Kabir Anand', studio: 'Studio B', booked: '15/16' },
  { time: '06:30 PM', name: 'Mat Pilates', trainer: 'Tanya Bose', studio: 'Studio A', booked: '12/15' }
];

let statMembers = 968;
let statEnquiries = 21;

// In-memory credentials (session-only, static front-end file)
// IMPORTANT: For production, use a proper authentication system with secure password hashing
let credentials = [
  { user: 'owner', pass: 'owner123', role: 'Owner', display: 'Meera Joshi' },
  { user: 'staff', pass: 'staff123', role: 'Staff', display: 'Front Desk' }
];

let currentUser = null;
