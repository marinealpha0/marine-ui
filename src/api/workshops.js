// Mock data for workshops
let mockWorkshops = [
  {
    _id: "w1",
    id: "w1",
    title: "React & Next.js Masterclass",
    shortDescription: "Master React 19, Server Components, and Next.js App Router.",
    detailedDescription: "Join us for a hands-on session where we build a modern application using React 19 Server Components, Server Actions, routing, and optimization techniques. Perfect for frontend devs.",
    bannerImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&auto=format&fit=crop&q=60",
    workshopDate: "2026-07-20",
    startTime: "10:00",
    endTime: "13:00",
    duration: "3 hrs",
    registrationStartDate: "2026-07-10T10:00",
    registrationEndDate: "2026-07-19T23:00",
    meetingPlatform: "Google Meet",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    joiningInstructions: "Please join 5 mins before the schedule. Keep your code editor open and Node.js installed.",
    instructorName: "John Doe",
    instructorPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=60",
    instructorDesignation: "Senior Engineer",
    instructorBio: "John is a React core contributor and has been building large-scale frontend apps for a decade.",
    pricingType: "Free",
    fee: 0,
    learningOutcomes: ["Next.js App Routing", "Server Components", "Performance Tuning"],
    topicsCovered: ["Routing", "Server Actions", "Suspense", "Caching"],
    requirements: ["Laptop", "Basic JavaScript", "Node.js installed"],
    maxParticipants: 100,
    certificateAvailable: true,
    registrationStatus: "Open",
    featuredWorkshop: true,
    publishStatus: "Published",
    status: "active",
    createdAt: "2026-07-07T10:00:00Z",
    lastUpdatedAt: "2026-07-07T10:00:00Z"
  },
  {
    _id: "w2",
    id: "w2",
    title: "UI/UX Advanced Workshop",
    shortDescription: "Elevate your design skills with advanced layouts, wireframing, and Figma secrets.",
    detailedDescription: "An intensive session on product UI/UX design. Learn layout systems, typographical hierarchy, color theory, component states, and interactive prototyping tips inside Figma.",
    bannerImage: "https://images.unsplash.com/photo-1561070791-26c113006238?w=800&auto=format&fit=crop&q=60",
    thumbnail: "https://images.unsplash.com/photo-1561070791-26c113006238?w=200&auto=format&fit=crop&q=60",
    workshopDate: "2026-08-05",
    startTime: "14:00",
    endTime: "18:00",
    duration: "4 hrs",
    registrationStartDate: "2026-07-15T09:00",
    registrationEndDate: "2026-08-04T18:00",
    meetingPlatform: "Zoom",
    meetingLink: "https://zoom.us/j/9876543210",
    joiningInstructions: "Figma Desktop app is highly recommended. Set up a free account in advance.",
    instructorName: "Jane Smith",
    instructorPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60",
    instructorDesignation: "Lead Product Designer",
    instructorBio: "Jane has designed products used by millions and loves mentoring upcoming design talent.",
    pricingType: "Paid",
    fee: 499,
    learningOutcomes: ["Figma Design Systems", "Prototyping Hacks", "Accessibility Standards"],
    topicsCovered: ["Autolayout 4.0", "Typography", "Color Palettes", "User Flows"],
    requirements: ["Figma Account", "Internet", "Laptop"],
    maxParticipants: 55,
    certificateAvailable: true,
    registrationStatus: "Open",
    featuredWorkshop: false,
    publishStatus: "Published",
    status: "active",
    createdAt: "2026-07-07T11:00:00Z",
    lastUpdatedAt: "2026-07-07T11:00:00Z"
  },
  {
    _id: "w3",
    id: "w3",
    title: "Python for Data Science",
    shortDescription: "Learn Pandas, Numpy, and Matplotlib from scratch.",
    detailedDescription: "Master the fundamentals of data analysis. Learn how to clean datasets, visualize trends, extract statistics, and build a base prediction model using scikit-learn.",
    bannerImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&auto=format&fit=crop&q=60",
    workshopDate: "2026-09-12",
    startTime: "09:00",
    endTime: "12:00",
    duration: "3 hrs",
    registrationStartDate: "2026-08-01T00:00",
    registrationEndDate: "2026-09-10T12:00",
    meetingPlatform: "Microsoft Teams",
    meetingLink: "https://teams.microsoft.com/meet/python-ds",
    joiningInstructions: "Please install Anaconda Distribution or have a Google Colab notebook ready.",
    instructorName: "Robert Brown",
    instructorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60",
    instructorDesignation: "Data Science Lead",
    instructorBio: "Robert works at tech giants training regression and classification algorithms for production.",
    pricingType: "Free",
    fee: 0,
    learningOutcomes: ["Pandas Dataframes", "Data Visualizations", "Basic Scikit-Learn"],
    topicsCovered: ["Numpy", "Pandas", "Matplotlib", "Supervised Learning"],
    requirements: ["Python Basics", "Laptop"],
    maxParticipants: 150,
    certificateAvailable: false,
    registrationStatus: "Closed",
    featuredWorkshop: false,
    publishStatus: "Draft",
    status: "active",
    createdAt: "2026-07-07T12:00:00Z",
    lastUpdatedAt: "2026-07-07T12:00:00Z"
  }
];

// Mock data for registrations
let mockRegistrations = [
  {
    _id: "r1",
    id: "r1",
    studentName: "Srikant Kumar",
    studentEmail: "srikant@example.com",
    studentPhone: "+919876543210",
    workshopId: "w1",
    workshopTitle: "React & Next.js Masterclass",
    registerDate: "2026-07-11",
    attendanceStatus: "Attended",
    status: "active"
  },
  {
    _id: "r2",
    id: "r2",
    studentName: "Priya Sharma",
    studentEmail: "priya@example.com",
    studentPhone: "+918765432109",
    workshopId: "w1",
    workshopTitle: "React & Next.js Masterclass",
    registerDate: "2026-07-12",
    attendanceStatus: "Registered",
    status: "active"
  },
  {
    _id: "r3",
    id: "r3",
    studentName: "Rahul Verma",
    studentEmail: "rahul@example.com",
    studentPhone: "+917654321098",
    workshopId: "w2",
    workshopTitle: "UI/UX Advanced Workshop",
    registerDate: "2026-07-13",
    attendanceStatus: "Absent",
    status: "active"
  }
];

// Workshop API endpoints
export const getAllWorkshops = async (filters) => {
  const { searchVal = "", page = 1, limit = 10, status = "all", pricingType = "all", publishStatus = "all" } = filters || {};
  
  let filtered = [...mockWorkshops];
  
  if (searchVal) {
    const q = searchVal.toLowerCase();
    filtered = filtered.filter(w => 
      w.title.toLowerCase().includes(q) || 
      w.instructorName.toLowerCase().includes(q)
    );
  }
  
  if (status !== "all") {
    filtered = filtered.filter(w => w.status === status);
  }

  if (pricingType !== "all") {
    filtered = filtered.filter(w => w.pricingType === pricingType);
  }

  if (publishStatus !== "all") {
    filtered = filtered.filter(w => w.publishStatus === publishStatus);
  }

  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  return {
    status: true,
    data: {
      data: {
        results: paginated,
        totalRecords: total
      }
    }
  };
};

export const getWorkshopById = async (id) => {
  const workshop = mockWorkshops.find(w => w._id === id || w.id === id);
  return {
    status: true,
    data: {
      data: workshop || null
    }
  };
};

export const createWorkshop = async (data) => {
  const newWorkshop = {
    ...data,
    _id: `w${mockWorkshops.length + 1}`,
    id: `w${mockWorkshops.length + 1}`,
    status: "active",
    createdAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString()
  };
  mockWorkshops.unshift(newWorkshop); // add to top
  return {
    status: true,
    data: {
      data: newWorkshop
    }
  };
};

export const updateWorkshop = async (data) => {
  const id = data.workshopId || data.id;
  mockWorkshops = mockWorkshops.map(w => {
    if (w._id === id || w.id === id) {
      return { ...w, ...data, lastUpdatedAt: new Date().toISOString() };
    }
    return w;
  });
  const updated = mockWorkshops.find(w => w._id === id || w.id === id);
  return {
    status: true,
    data: {
      data: updated
    }
  };
};

export const deleteWorkshop = async (id) => {
  mockWorkshops = mockWorkshops.filter(w => w._id !== id && w.id !== id);
  return {
    status: true,
    data: {
      success: true
    }
  };
};

export const getWorkshopsDropdown = async () => {
  const minimal = mockWorkshops.map(w => ({
    _id: w._id,
    id: w.id,
    title: w.title
  }));
  return {
    status: true,
    data: {
      data: minimal
    }
  };
};

// Registrations API endpoints
export const getAllRegistrations = async (filters) => {
  const { searchVal = "", page = 1, limit = 10, status = "all", attendanceStatus = "all", workshopId = "all" } = filters || {};

  let filtered = [...mockRegistrations];

  if (searchVal) {
    const q = searchVal.toLowerCase();
    filtered = filtered.filter(r => 
      r.studentName.toLowerCase().includes(q) || 
      r.studentEmail.toLowerCase().includes(q) ||
      r.workshopTitle.toLowerCase().includes(q)
    );
  }

  if (status !== "all") {
    filtered = filtered.filter(r => r.status === status);
  }

  if (attendanceStatus !== "all") {
    filtered = filtered.filter(r => r.attendanceStatus === attendanceStatus);
  }

  if (workshopId !== "all") {
    filtered = filtered.filter(r => r.workshopId === workshopId);
  }

  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  return {
    status: true,
    data: {
      data: {
        results: paginated,
        totalRecords: total
      }
    }
  };
};

export const getRegistrationById = async (id) => {
  const reg = mockRegistrations.find(r => r._id === id || r.id === id);
  return {
    status: true,
    data: {
      data: reg || null
    }
  };
};

export const createRegistration = async (data) => {
  const workshop = mockWorkshops.find(w => w._id === data.workshopId || w.id === data.workshopId);
  const newReg = {
    ...data,
    _id: `r${mockRegistrations.length + 1}`,
    id: `r${mockRegistrations.length + 1}`,
    workshopTitle: workshop ? workshop.title : "Unknown Workshop",
    status: "active",
    registerDate: data.registerDate || new Date().toISOString().split("T")[0]
  };
  mockRegistrations.unshift(newReg);
  return {
    status: true,
    data: {
      data: newReg
    }
  };
};

export const updateRegistration = async (data) => {
  const id = data.registrationId || data.id;
  const workshop = mockWorkshops.find(w => w._id === data.workshopId || w.id === data.workshopId);
  mockRegistrations = mockRegistrations.map(r => {
    if (r._id === id || r.id === id) {
      return { 
        ...r, 
        ...data, 
        workshopTitle: workshop ? workshop.title : r.workshopTitle 
      };
    }
    return r;
  });
  const updated = mockRegistrations.find(r => r._id === id || r.id === id);
  return {
    status: true,
    data: {
      data: updated
    }
  };
};

export const deleteRegistration = async (id) => {
  mockRegistrations = mockRegistrations.filter(r => r._id !== id && r.id !== id);
  return {
    status: true,
    data: {
      success: true
    }
  };
};

export const toggleWorkshopStatus = async (id) => {
  mockWorkshops = mockWorkshops.map(w => {
    if (w._id === id || w.id === id) {
      const nextStatus = w.status === "active" ? "inactive" : "active";
      return { ...w, status: nextStatus };
    }
    return w;
  });
  return {
    status: true,
    data: {
      success: true
    }
  };
};

export const toggleRegistrationStatus = async (id) => {
  mockRegistrations = mockRegistrations.map(r => {
    if (r._id === id || r.id === id) {
      const nextStatus = r.status === "active" ? "inactive" : "active";
      return { ...r, status: nextStatus };
    }
    return r;
  });
  return {
    status: true,
    data: {
      success: true
    }
  };
};
