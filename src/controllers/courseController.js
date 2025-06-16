const supabase = require("../config/supabaseClient");

exports.getCourses = async (req, res) => {
  const { data, error } = await supabase.from("courses").select("*");
  if (error) return res.status(500).json({ message: error.message });
  res.json({ success: true, data });
};

exports.getCourseById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return res.status(404).json({ message: error.message });
  res.json(data);
};

exports.createCourse = async (req, res) => {
  const {
    title,
    short_description,
    category,
    description,
    level,
    price,
    duration,
    instructor_id,
    total_lessons,
  } = req.body;
  const { data, error } = await supabase.from("courses").insert({
    title,
    short_description,
    category,
    description,
    level,
    price,
    duration,
    total_lessons,
    instructor_id,
  });
  if (error) return res.status(500).json({ message: error.message });
  res.status(201).json(data);
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    short_description,
    category,
    description,
    level,
    price,
    duration,
    instructor_id,
    total_lessons,
  } = req.body;

  const { data, error } = await supabase
    .from("courses")
    .update({
      title,
      short_description,
      category,
      description,
      level,
      price,
      duration,
      total_lessons,
      instructor_id,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json({ message: "Course updated successfully", data });
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return res.status(404).json({ message: error.message });
  return res.json({success: true, data});
}