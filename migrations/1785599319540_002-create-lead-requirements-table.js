exports.up = (pgm) => {
    pgm.createTable("lead_requirements", {
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
  
      intent: {
        type: "varchar(30)"
      },
  
      purpose: {
        type: "varchar(30)"
      },
  
      property_type: {
        type: "varchar(100)"
      },
  
      city: {
        type: "varchar(100)"
      },
  
      society: {
        type: "varchar(150)"
      },
  
      phase: {
        type: "varchar(100)"
      },
  
      block: {
        type: "varchar(100)"
      },
  
      plot_size: {
        type: "varchar(50)"
      },
  
      property_size_unit: {
        type: "varchar(20)"
      },
  
      bedrooms: {
        type: "smallint"
      },
  
      bathrooms: {
        type: "smallint"
      },
  
      furnished: {
        type: "boolean",
        default: false
      },
  
      parking_required: {
        type: "boolean",
        default: false
      },
  
      servant_room: {
        type: "boolean",
        default: false
      },
  
      preferred_floor: {
        type: "varchar(50)"
      },
  
      commercial_type: {
        type: "varchar(100)"
      },
  
      road_width: {
        type: "varchar(50)"
      },
  
      corner_plot: {
        type: "boolean",
        default: false
      },
  
      park_facing: {
        type: "boolean",
        default: false
      },
  
      boulevard_facing: {
        type: "boolean",
        default: false
      },
  
      possession_plot: {
        type: "boolean",
        default: false
      },
  
      approved_society_only: {
        type: "boolean",
        default: false
      },
  
      file_or_plot: {
        type: "varchar(30)"
      },
  
      min_budget: {
        type: "numeric(15,2)"
      },
  
      max_budget: {
        type: "numeric(15,2)"
      },
  
      currency: {
        type: "varchar(10)"
      },
  
      payment_type: {
        type: "varchar(30)"
      },
  
      installment_duration: {
        type: "varchar(50)"
      },
  
      purchase_timeline: {
        type: "varchar(50)"
      },
  
      first_time_buyer: {
        type: "boolean",
        default: false
      },
  
      investor: {
        type: "boolean",
        default: false
      },
  
      bank_financing: {
        type: "boolean",
        default: false
      },
  
      bank_name: {
        type: "varchar(100)"
      },
  
      expected_roi: {
        type: "varchar(50)"
      },
  
      holding_period: {
        type: "varchar(50)"
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
    pgm.createIndex("lead_requirements", "lead_id");
    pgm.createIndex("lead_requirements", "city");
    pgm.createIndex("lead_requirements", "society");
    pgm.createIndex("lead_requirements", "property_type");
  };
  
  exports.down = (pgm) => {
    pgm.dropTable("lead_requirements");
  };