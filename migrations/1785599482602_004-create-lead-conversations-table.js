exports.up = (pgm) => {
    pgm.createTable("lead_conversations", {
      id: {
        type: "uuid",
        primaryKey: true,
        default: pgm.func("gen_random_uuid()")
      },
  
      lead_id: {
        type: "uuid",
        notNull: true,
        references: "leads(id)",
        onDelete: "CASCADE"
      },
  
      sender: {
        type: "varchar(20)",
        notNull: true
      },
  
      message: {
        type: "text",
        notNull: true
      },
  
      message_type: {
        type: "varchar(20)",
        notNull: true,
        default: "text"
      },
  
      created_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("CURRENT_TIMESTAMP")
      }
    });
  
    // Indexes
    pgm.createIndex("lead_conversations", "lead_id");
    pgm.createIndex("lead_conversations", "created_at");
  };
  
  exports.down = (pgm) => {
    pgm.dropTable("lead_conversations");
  };