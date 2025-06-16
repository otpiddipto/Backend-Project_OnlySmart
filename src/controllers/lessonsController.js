const supabase = require('../config/supabaseClient');

exports.getLessons = async (req, res) => {
  const { data, error } = await supabase.from('lessons').select('*');
  if (error) return res.status(500).json({ message: error.message });
  res.json(data);
};

exports.getLessonById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('lessons').select('*').eq('id', id).single();
  if (error) return res.status(404).json({ message: error.message });
  res.json(data);
};

exports.createLesson = async (req, res) => {
  const { section_id, title, duration, type, content_url, order_index } = req.body;
  const { data, error } = await supabase.from('lessons').insert({
    section_id,
    title,
    duration,
    type,
    content_url,
    order_index,
  });
  if (error) return res.status(500).json({ message: error.message });
  res.status(201).json(data);
};
