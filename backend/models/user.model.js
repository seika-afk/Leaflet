const supabase = require("../config/db");

async function createUser(username, email, password) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ username, email, password }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function getUser(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw error;
  return data;
}

async function getUserByUsername(username) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (error) throw error;
  return data;
}

module.exports = { createUser, getUser, getUserByUsername };
