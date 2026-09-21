import { LocationObservation } from '@/types'

export const mockLocationObservations: LocationObservation[] = [
  {
    "id": "LO001",
    "locationId": "LOC001",
    "locationName": "North Sector Warehouse Hub",
    "observations": [
      {
        "entityId": "P001",
        "count": 18,
        "dateRange": "2026-08-01 to 2026-09-08"
      },
      {
        "entityId": "P002",
        "count": 14,
        "dateRange": "2026-08-01 to 2026-09-08"
      },
      {
        "entityId": "P006",
        "count": 9,
        "dateRange": "2026-08-11 to 2026-09-07"
      },
      {
        "entityId": "P012",
        "count": 7,
        "dateRange": "2026-08-15 to 2026-09-08"
      },
      {
        "entityId": "P015",
        "count": 6,
        "dateRange": "2026-08-20 to 2026-09-07"
      }
    ],
    "overlaps": [
      {
        "entityA": "P001",
        "entityB": "P002",
        "sharedDays": 12,
        "overlapCount": 14
      },
      {
        "entityA": "P001",
        "entityB": "P006",
        "sharedDays": 7,
        "overlapCount": 8
      },
      {
        "entityA": "P002",
        "entityB": "P006",
        "sharedDays": 8,
        "overlapCount": 9
      },
      {
        "entityA": "P006",
        "entityB": "P015",
        "sharedDays": 5,
        "overlapCount": 6
      },
      {
        "entityA": "P012",
        "entityB": "P006",
        "sharedDays": 4,
        "overlapCount": 5
      }
    ]
  },
  {
    "id": "LO002",
    "locationId": "LOC002",
    "locationName": "Central Freight Terminal",
    "observations": [
      {
        "entityId": "P001",
        "count": 9,
        "dateRange": "2026-08-10 to 2026-09-04"
      },
      {
        "entityId": "P002",
        "count": 11,
        "dateRange": "2026-08-10 to 2026-09-06"
      },
      {
        "entityId": "P003",
        "count": 12,
        "dateRange": "2026-08-12 to 2026-09-06"
      },
      {
        "entityId": "P004",
        "count": 22,
        "dateRange": "2026-08-01 to 2026-09-08"
      },
      {
        "entityId": "P018",
        "count": 6,
        "dateRange": "2026-08-20 to 2026-09-08"
      }
    ],
    "overlaps": [
      {
        "entityA": "P001",
        "entityB": "P003",
        "sharedDays": 6,
        "overlapCount": 7
      },
      {
        "entityA": "P002",
        "entityB": "P003",
        "sharedDays": 9,
        "overlapCount": 11
      },
      {
        "entityA": "P002",
        "entityB": "P004",
        "sharedDays": 10,
        "overlapCount": 11
      },
      {
        "entityA": "P003",
        "entityB": "P004",
        "sharedDays": 7,
        "overlapCount": 8
      },
      {
        "entityA": "P003",
        "entityB": "P018",
        "sharedDays": 5,
        "overlapCount": 6
      }
    ]
  },
  {
    "id": "LO003",
    "locationId": "LOC005",
    "locationName": "Metro Plaza Office Complex",
    "observations": [
      {
        "entityId": "P003",
        "count": 5,
        "dateRange": "2026-08-14 to 2026-09-05"
      },
      {
        "entityId": "P005",
        "count": 16,
        "dateRange": "2026-08-01 to 2026-09-08"
      },
      {
        "entityId": "P010",
        "count": 14,
        "dateRange": "2026-08-01 to 2026-09-08"
      },
      {
        "entityId": "P013",
        "count": 4,
        "dateRange": "2026-08-20 to 2026-09-07"
      },
      {
        "entityId": "P025",
        "count": 3,
        "dateRange": "2026-09-03 to 2026-09-09"
      }
    ],
    "overlaps": [
      {
        "entityA": "P003",
        "entityB": "P005",
        "sharedDays": 4,
        "overlapCount": 5
      },
      {
        "entityA": "P005",
        "entityB": "P010",
        "sharedDays": 12,
        "overlapCount": 13
      },
      {
        "entityA": "P010",
        "entityB": "P025",
        "sharedDays": 3,
        "overlapCount": 3
      },
      {
        "entityA": "P005",
        "entityB": "P013",
        "sharedDays": 3,
        "overlapCount": 4
      }
    ]
  },
  {
    "id": "LO004",
    "locationId": "LOC004",
    "locationName": "Highland Transit Point",
    "observations": [
      {
        "entityId": "P006",
        "count": 4,
        "dateRange": "2026-08-20 to 2026-08-28"
      },
      {
        "entityId": "P007",
        "count": 6,
        "dateRange": "2026-08-15 to 2026-08-28"
      },
      {
        "entityId": "P015",
        "count": 3,
        "dateRange": "2026-08-25 to 2026-09-05"
      }
    ],
    "overlaps": [
      {
        "entityA": "P006",
        "entityB": "P007",
        "sharedDays": 2,
        "overlapCount": 3
      },
      {
        "entityA": "P007",
        "entityB": "P015",
        "sharedDays": 2,
        "overlapCount": 2
      }
    ]
  },
  {
    "id": "LO005",
    "locationId": "LOC009",
    "locationName": "Café Rendezvous",
    "observations": [
      {
        "entityId": "P016",
        "count": 8,
        "dateRange": "2026-08-15 to 2026-09-09"
      },
      {
        "entityId": "P013",
        "count": 5,
        "dateRange": "2026-08-20 to 2026-09-07"
      },
      {
        "entityId": "P003",
        "count": 4,
        "dateRange": "2026-08-25 to 2026-09-09"
      },
      {
        "entityId": "P018",
        "count": 3,
        "dateRange": "2026-08-25 to 2026-09-06"
      }
    ],
    "overlaps": [
      {
        "entityA": "P016",
        "entityB": "P013",
        "sharedDays": 4,
        "overlapCount": 5
      },
      {
        "entityA": "P016",
        "entityB": "P003",
        "sharedDays": 3,
        "overlapCount": 4
      },
      {
        "entityA": "P003",
        "entityB": "P018",
        "sharedDays": 2,
        "overlapCount": 3
      },
      {
        "entityA": "P013",
        "entityB": "P018",
        "sharedDays": 2,
        "overlapCount": 2
      }
    ]
  },
  {
    "id": "LO006",
    "locationId": "LOC003",
    "locationName": "Portview Logistics Park",
    "observations": [
      {
        "entityId": "P009",
        "count": 6,
        "dateRange": "2026-08-25 to 2026-09-08"
      },
      {
        "entityId": "P017",
        "count": 10,
        "dateRange": "2026-08-15 to 2026-09-08"
      },
      {
        "entityId": "P020",
        "count": 8,
        "dateRange": "2026-08-20 to 2026-09-08"
      }
    ],
    "overlaps": [
      {
        "entityA": "P009",
        "entityB": "P017",
        "sharedDays": 5,
        "overlapCount": 6
      },
      {
        "entityA": "P017",
        "entityB": "P020",
        "sharedDays": 7,
        "overlapCount": 8
      },
      {
        "entityA": "P009",
        "entityB": "P020",
        "sharedDays": 4,
        "overlapCount": 4
      }
    ]
  },
  {
    "id": "LO007",
    "locationId": "LOC007",
    "locationName": "Riverside Safe House",
    "observations": [
      {
        "entityId": "P003",
        "count": 3,
        "dateRange": "2026-08-18 to 2026-09-05"
      },
      {
        "entityId": "P018",
        "count": 4,
        "dateRange": "2026-08-15 to 2026-09-06"
      }
    ],
    "overlaps": [
      {
        "entityA": "P003",
        "entityB": "P018",
        "sharedDays": 3,
        "overlapCount": 3
      }
    ]
  },
  {
    "id": "LO008",
    "locationId": "LOC010",
    "locationName": "Abandoned Mill Complex",
    "observations": [
      {
        "entityId": "P024",
        "count": 5,
        "dateRange": "2026-08-25 to 2026-09-07"
      },
      {
        "entityId": "P012",
        "count": 3,
        "dateRange": "2026-09-01 to 2026-09-05"
      }
    ],
    "overlaps": [
      {
        "entityA": "P024",
        "entityB": "P012",
        "sharedDays": 3,
        "overlapCount": 3
      }
    ]
  }
];
