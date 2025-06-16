const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const supabase = require('../config/supabaseClient');
const { generateToken } = require('../utils/jwtUtils');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password_hash, first_name, last_name, phone } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password_hash, 10);

  const { data: user, error } = await supabase.from('users').insert({
    email,
    password_hash: hashedPassword,
    first_name,
    last_name,
    phone,
    role: 'user', // Default role, can be changed later
    is_verified: false,
  }).select("id, email, first_name, last_name, is_verified, phone").single();

  if (error) return res.status(500).json({ message: error.message });
  res.status(201).json({ message: 'User registered successfully', data: {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
    id: user.id,
    is_verified: user.is_verified
  } });
  
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password_hash } = req.body;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);

  if (error || data.length === 0) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const user = data[0];

  // Verify password
  const isPasswordValid = await bcrypt.compare(password_hash, user.password_hash);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate token
  const token = generateToken({ id: user.id, role: user.role });

  return res.status(200).json({success: true,
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
};

exports.getProfile = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is stored in req.user by the auth middleware

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    return res.status(404).json({ message: error.message });
  }

  return res.json({ success: true, data });
}