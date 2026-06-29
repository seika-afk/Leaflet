const supabase = require("../config/db");

async function createNote(title, content, userId) {
  const { data, error } = await supabase
    .from("notes")
    .insert([{ title, content, user_id: userId }])
    .select()
    .single();
  if (error) throw error;
  return data;
}
async function getNoteById(id) {
  const { data, error } = await supabase
    .from("notes")
    .select("*, users(username)")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

async function getAllNotes() {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

module.exports = { createNote, getNoteById, getAllNotes };
