exports.up = (pgm) => {
    pgm.createExtension("pgcrypto", { ifNotExists: true });
  
    pgm.createTable("leads", {
      id: {
        type: "uuid",
        primaryKey: true,
        default: pgm.func("gen_random_uuid()")
      },
  
      whatsapp_number: {
        type: "varchar(20)",
        notNull: true,
        unique: true
      },
  
      full_name: {
        type: "varchar(150)"
      },
  
      email: {
        type: "varchar(150)"
      },
  
      current_city: {
        type: "varchar(100)"
      },
  
      source: {
        type: "varchar(100)",
        notNull: true,
        default: "WhatsApp"
      },
  
      lead_status: {
        type: "varchar(30)",
        notNull: true,
        default: "New"
      },
  
      conversation_status: {
        type: "varchar(30)",
        notNull: true,
        default: "Active"
      },
  
      current_step: {
        type: "smallint",
        notNull: true,
        default: 1
      },
  
      completed_questions: {
        type: "smallint",
        notNull: true,
        default: 0
      },
  
      total_questions: {
        type: "smallint",
        notNull: true,
        default: 7
      },
  
      completion_percentage: {
        type: "numeric(5,2)",
        notNull: true,
        default: 0
      },
  
      last_customer_message_at: {
        type: "timestamptz"
      },
  
      completed_at: {
        type: "timestamptz"
      },
  
      created_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("CURRENT_TIMESTAMP")
      },
  
      updated_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("CURRENT_TIMESTAMP")
      }
    });
  
    // Indexes
    pgm.createIndex("leads", "lead_status");
    pgm.createIndex("leads", "conversation_status");
    pgm.createIndex("leads", "created_at");
  };
  
  exports.down = (pgm) => {
    pgm.dropTable("leads");
  };