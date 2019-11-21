
export const data = {
    id: 0,
    title: "Graph Title",
    lines: [
      {
        id: 0,
        label: "Customer Segment",
        tick: [
          { id: 0, label: "Business", position: 1 },
          { id: 1, label: "Education", position: 2 },
          { id: 2, label: "SME", position: 3 },
          { id: 3, label: "Entertainment", position: 4 },
          { id: 4, label: "Healthcare", position: 5 }
        ]
      },
      {
        id: 1,
        label: "Product",
        tick: [
          { id: 0, label: "Courses", position: 1 },
          { id: 1, label: "Dashboard", position: 2 },
          { id: 2, label: "Analytics", position: 3 },
          { id: 3, label: "Paths", position: 4 },
          { id: 4, label: "Assessments", position: 5 },
          { id: 5, label: "Channels", position: 6 }
        ]
      },
      {
        id: 2,
        label: "Content",
        tick: [
          { id: 0, label: "F-end", position: 1 },
          { id: 1, label: "B-end", position: 2 },
          { id: 2, label: "Security", position: 3 },
          { id: 3, label: "Data", position: 4 },
          { id: 4, label: "Mobile", position: 5 },
          { id: 5, label: "Offline", position: 6 }
        ]
      },
      {
        id: 3,
        label: "Experience",
        tick: [
          { id: 0, label: "Rookie", position: 1 },
          { id: 1, label: "Proficient", position: 2 },
          { id: 2, label: "Pro", position: 3 },
          { id: 3, label: "Veteran", position: 4 },
          { id: 4, label: "Legend", position: 5 }
        ]
      },
      {
        id: 4,
        label: "New Business",
        tick: [
          { id: 0, label: "SDL Tool", position: 1 },
          { id: 1, label: "SDL Data", position: 2 },
          { id: 2, label: "Blogs", position: 3 },
          { id: 3, label: "Projects", position: 4 },
          { id: 4, label: "Video Ads", position: 5 }
        ]
      },
      {
        id: 5,
        label: "Geographies",
        tick: [
          { id: 0, label: "N America", position: 1 },
          { id: 1, label: "UK", position: 2 },
          { id: 2, label: "Australia", position: 3 },
          { id: 3, label: "EMEA", position: 4 },
          { id: 4, label: "India", position: 5 },
          { id: 4, label: "S America", position: 5 }
        ]
      },
      {
        id: 6,
        label: "Channel",
        tick: [
          { id: 0, label: "www", position: 1 },
          { id: 1, label: "Marketplace", position: 2 },
          { id: 2, label: "3rd Party", position: 3 },
          { id: 3, label: "EMEA", position: 4 },
          { id: 4, label: "Internet", position: 5 },
          { id: 4, label: "Social", position: 5 }
        ]
      }
    ],
  
    areas: [
      {
        "Customer Segment": "SME",
        Product: "Dashboard",
        Content: "Security",
        Experience: "Proficient",
        "New Business": "SDL Tool",
        Geographies: "Australia",
        Channel: "3rd Party"
      },
      {
        "Customer Segment": "Entertainment",
        Product: "Assessments",
        Content: "Mobile",
        Experience: "Pro",
        "New Business": "Blogs",
        Geographies: "India",
        Channel: "Internet"
      },
      {
        "Customer Segment": "Healthcare",
        Product: "Channels",
        Content: "Offline",
        Experience: "Veteran",
        "New Business": "Projects",
        Geographies: "S America",
        Channel: "Social"
      }
    ]
  };
  
