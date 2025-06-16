const supabase = require('../config/supabaseClient');

exports.getUsers = async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) return res.status(500).json({ message: error.message });
  res.json(data);
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ message: error.message });
  res.json(data);
};
