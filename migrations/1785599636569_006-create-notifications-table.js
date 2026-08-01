exports.up = (pgm) => {
    pgm.createTable("notifications", {
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
  
      channel: {
        type: "varchar(30)",
        notNull: true
      },
  
      recipient: {
        type: "varchar(150)",
        notNull: true
      },
  
      title: {
        type: "varchar(200)"
      },
  
      message: {
        type: "text",
        notNull: true
      },
  
      status: {
        type: "varchar(20)",
        notNull: true,
        default: "Pending"
      },
  
      sent_at: {
        type: "timestamptz"
      },
  
      created_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("CURRENT_TIMESTAMP")
      }
    });
  
    // Indexes
    pgm.createIndex("notifications", "lead_id");
    pgm.createIndex("notifications", "status");
  };
  
  exports.down = (pgm) => {
    pgm.dropTable("notifications");
  };