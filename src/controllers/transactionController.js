const supabase = require('../config/supabaseClient');

exports.getTransactions = async (req, res) => {
  const { data, error } = await supabase.from('transactions').select('*');
  if (error) return res.status(500).json({ message: error.message });
  res.json(data);
};

exports.getTransactionById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('transactions').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ message: error.message });
  res.json(data);
};

exports.createTransaction = async (req, res) => {
  const { user_id, course_id, amount, status, payment_method, payment_details } = req.body;
  const { data, error } = await supabase.from('transactions').insert({
    user_id,
    course_id,
    amount,
    status,
    payment_method,
    payment_details,
  });
  if (error) return res.status(500).json({ message: error.message });
  res.status(201).json(data);
};
