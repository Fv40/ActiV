const { createClient } = require("@supabase/supabase-js");

module.exports = {
  connect() {
    return createClient(
      process.env.DB_HOST,
      process.env.DB_KEY
    );
  },
};
