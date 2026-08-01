exports.up = (pgm) => {
    pgm.createTable("lead_answers", {
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
  
      question_key: {
        type: "varchar(100)",
        notNull: true
      },
  
      question_order: {
        type: "smallint",
        notNull: true
      },
  
      answer: {
        type: "text",
        notNull: true
      },
  
      extracted_value: {
        type: "text"
      },
  
      answered_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("CURRENT_TIMESTAMP")
      }
    });
  
    // Indexes
    pgm.createIndex("lead_answers", "lead_id");
    pgm.createIndex("lead_answers", "question_key");
  };
  
  exports.down = (pgm) => {
    pgm.dropTable("lead_answers");
  };