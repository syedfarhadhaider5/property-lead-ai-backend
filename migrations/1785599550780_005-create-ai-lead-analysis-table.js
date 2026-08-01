exports.up = (pgm) => {
    pgm.createTable("ai_lead_analysis", {
      id: {
        type: "uuid",
        primaryKey: true,
        default: pgm.func("gen_random_uuid()")
      },
  
      lead_id: {
        type: "uuid",
        notNull: true,
        unique: true,
        references: "leads(id)",
        onDelete: "CASCADE"
      },
  
      ai_summary: {
        type: "text"
      },
  
      lead_score: {
        type: "smallint",
        notNull: true,
        default: 0
      },
  
      buying_intent: {
        type: "varchar(20)"
      },
  
      urgency_level: {
        type: "varchar(20)"
      },
  
      qualification_status: {
        type: "varchar(30)"
      },
  
      confidence_score: {
        type: "numeric(5,2)"
      },
  
      objections: {
        type: "text"
      },
  
      next_best_action: {
        type: "text"
      },
  
      recommended_property: {
        type: "text"
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
    pgm.createIndex("ai_lead_analysis", "lead_score");
    pgm.createIndex("ai_lead_analysis", "qualification_status");
  };
  
  exports.down = (pgm) => {
    pgm.dropTable("ai_lead_analysis");
  };