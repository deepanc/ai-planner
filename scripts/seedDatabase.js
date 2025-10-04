const mongoose = require("mongoose");
const Template = require("../models/Template");
const config = require("../config");

// Sample template data
const templatesData = [
  {
    id: "travel",
    name: "Travel",
    description:
      "Plan your next adventure with a detailed itinerary, packing lists, and budget tracking.",
    thumbnail: "travel-thumbnail",
    category: "lifestyle",
    tasks: [
      {
        id: "book-flights",
        title: "Book Flights",
        description: "Research and book flights for your trip",
        icon: "fas fa-plane",
        action: "flights",
        priority: "high",
        category: "transportation",
        order: 1,
      },
      {
        id: "reserve-hotels",
        title: "Reserve Hotels",
        description: "Find and book accommodation for your stay",
        icon: "fas fa-bed",
        action: "hotels",
        priority: "high",
        category: "accommodation",
        order: 2,
      },
      {
        id: "plan-itinerary",
        title: "Plan Itinerary",
        description: "Create a detailed day-by-day itinerary",
        icon: "fas fa-map-pin",
        action: "itinerary",
        priority: "medium",
        category: "planning",
        order: 3,
      },
      {
        id: "schedule-activities",
        title: "Schedule Activities",
        description: "Book tours, activities, and experiences",
        icon: "fas fa-calendar-day",
        action: "activities",
        priority: "medium",
        category: "activities",
        order: 4,
      },
      {
        id: "purchase-tickets",
        title: "Purchase Tickets",
        description: "Buy tickets for attractions and events",
        icon: "fas fa-ticket-alt",
        action: "tickets",
        priority: "low",
        category: "tickets",
        order: 5,
      },
      {
        id: "budget-expenses",
        title: "Budget Expenses",
        description: "Plan and track your travel budget",
        icon: "fas fa-coins",
        action: "budget",
        priority: "medium",
        category: "finance",
        order: 6,
      },
    ],
  },
  {
    id: "event-planning",
    name: "Event Planning",
    description:
      "Organize every detail of your event, from venue to guest list.",
    thumbnail: "event-thumbnail",
    category: "business",
    tasks: [
      {
        id: "choose-venue",
        title: "Choose Venue",
        description: "Select and book the perfect venue for your event",
        icon: "fas fa-building",
        action: "venue",
        priority: "high",
        category: "venue",
        order: 1,
      },
      {
        id: "create-guest-list",
        title: "Create Guest List",
        description: "Compile and manage your guest list",
        icon: "fas fa-users",
        action: "guests",
        priority: "high",
        category: "guests",
        order: 2,
      },
      {
        id: "plan-catering",
        title: "Plan Catering",
        description: "Arrange food and beverage services",
        icon: "fas fa-utensils",
        action: "catering",
        priority: "medium",
        category: "catering",
        order: 3,
      },
      {
        id: "book-entertainment",
        title: "Book Entertainment",
        description: "Hire entertainment and speakers",
        icon: "fas fa-music",
        action: "entertainment",
        priority: "medium",
        category: "entertainment",
        order: 4,
      },
      {
        id: "send-invitations",
        title: "Send Invitations",
        description: "Design and send event invitations",
        icon: "fas fa-envelope",
        action: "invitations",
        priority: "medium",
        category: "communication",
        order: 5,
      },
      {
        id: "manage-budget",
        title: "Manage Budget",
        description: "Track and manage event expenses",
        icon: "fas fa-calculator",
        action: "budget",
        priority: "high",
        category: "finance",
        order: 6,
      },
    ],
  },
  {
    id: "house-shifting",
    name: "House/Office Shifting",
    description:
      "Manage your move with checklists, timelines, and vendor contacts.",
    thumbnail: "house-thumbnail",
    category: "lifestyle",
    tasks: [
      {
        id: "find-movers",
        title: "Find Movers",
        description: "Research and hire professional movers",
        icon: "fas fa-truck",
        action: "movers",
        priority: "high",
        category: "logistics",
        order: 1,
      },
      {
        id: "pack-belongings",
        title: "Pack Belongings",
        description: "Organize and pack all your belongings",
        icon: "fas fa-box",
        action: "packing",
        priority: "high",
        category: "packing",
        order: 2,
      },
      {
        id: "update-address",
        title: "Update Address",
        description: "Change address with all relevant services",
        icon: "fas fa-address-book",
        action: "address",
        priority: "medium",
        category: "administration",
        order: 3,
      },
      {
        id: "transfer-utilities",
        title: "Transfer Utilities",
        description: "Set up utilities at new location",
        icon: "fas fa-bolt",
        action: "utilities",
        priority: "medium",
        category: "utilities",
        order: 4,
      },
      {
        id: "clean-old-place",
        title: "Clean Old Place",
        description: "Clean and prepare old location for handover",
        icon: "fas fa-broom",
        action: "cleaning",
        priority: "low",
        category: "cleaning",
        order: 5,
      },
      {
        id: "settle-in",
        title: "Settle In",
        description: "Unpack and organize new space",
        icon: "fas fa-home",
        action: "settling",
        priority: "medium",
        category: "settling",
        order: 6,
      },
    ],
  },
  {
    id: "product-roadmap",
    name: "Product Roadmap",
    description: "Visualize your product's journey and prioritize features.",
    thumbnail: "roadmap-thumbnail",
    category: "business",
    tasks: [
      {
        id: "define-vision",
        title: "Define Vision",
        description: "Establish product vision and goals",
        icon: "fas fa-eye",
        action: "vision",
        priority: "high",
        category: "strategy",
        order: 1,
      },
      {
        id: "research-market",
        title: "Research Market",
        description: "Conduct market research and competitor analysis",
        icon: "fas fa-search",
        action: "research",
        priority: "high",
        category: "research",
        order: 2,
      },
      {
        id: "define-features",
        title: "Define Features",
        description: "List and prioritize product features",
        icon: "fas fa-list",
        action: "features",
        priority: "high",
        category: "features",
        order: 3,
      },
      {
        id: "create-timeline",
        title: "Create Timeline",
        description: "Develop project timeline and milestones",
        icon: "fas fa-calendar-alt",
        action: "timeline",
        priority: "medium",
        category: "planning",
        order: 4,
      },
      {
        id: "assign-resources",
        title: "Assign Resources",
        description: "Allocate team members and budget",
        icon: "fas fa-users-cog",
        action: "resources",
        priority: "medium",
        category: "resources",
        order: 5,
      },
      {
        id: "track-progress",
        title: "Track Progress",
        description: "Monitor development progress and adjust plans",
        icon: "fas fa-chart-line",
        action: "tracking",
        priority: "medium",
        category: "monitoring",
        order: 6,
      },
    ],
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongodb.uri, config.mongodb.options);
    console.log("Connected to MongoDB");

    // Clear existing templates
    await Template.deleteMany({});
    console.log("Cleared existing templates");

    // Insert new templates
    const templates = await Template.insertMany(templatesData);
    console.log(`Inserted ${templates.length} templates`);

    // Display summary
    console.log("\nTemplates created:");
    templates.forEach((template) => {
      console.log(`- ${template.name}: ${template.tasks.length} tasks`);
    });

    console.log("\nDatabase seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
