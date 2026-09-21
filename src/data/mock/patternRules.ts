import { PatternRuleDefinition } from '@/types'

export const mockPatternRuleDefinitions: PatternRuleDefinition[] = [
  {
    "id": "RULE_FREQ_COMMS",
    "name": "Repeated Communication Frequency",
    "category": "COMMUNICATION",
    "description": "High frequency of voice calls (>5 interactions within the observation window).",
    "confidenceBase": 0.88,
    "severity": "HIGH"
  },
  {
    "id": "RULE_SHARED_LOC",
    "name": "Observed Spatial Overlap",
    "category": "LOCATION",
    "description": "Multiple subjects recorded at the same physical hub within identical time intervals.",
    "confidenceBase": 0.85,
    "severity": "MEDIUM"
  },
  {
    "id": "RULE_BRIDGE_ENTITY",
    "name": "Cross-Network Bridge Entity",
    "category": "TOPOLOGY",
    "description": "Subject connects otherwise separate operational clusters with high betweenness centrality.",
    "confidenceBase": 0.92,
    "severity": "HIGH"
  },
  {
    "id": "RULE_COMMS_SPIKE",
    "name": "Telecommunication Surge Window",
    "category": "TEMPORAL",
    "description": "Rapid succession of voice interactions across multiple handsets during key event windows.",
    "confidenceBase": 0.9,
    "severity": "HIGH"
  },
  {
    "id": "RULE_CASE_COMMS",
    "name": "Case-Linked Communication Pattern",
    "category": "LEGAL",
    "description": "Communication between parties with concurrent involvement in formal case dossiers.",
    "confidenceBase": 0.86,
    "severity": "HIGH"
  },
  {
    "id": "RULE_CROSS_CLUSTER",
    "name": "Cross-Cluster Intermediation",
    "category": "TOPOLOGY",
    "description": "Active financial and transport linkages between separate organizational consortia.",
    "confidenceBase": 0.89,
    "severity": "MEDIUM"
  },
  {
    "id": "RULE_NIGHT_ACTIVITY",
    "name": "Late-Hour Operational Activity",
    "category": "TEMPORAL",
    "description": "High concentration of vehicle movement and calls between 20:00 and 05:00.",
    "confidenceBase": 0.82,
    "severity": "MEDIUM"
  },
  {
    "id": "RULE_VEHICLE_SHARING",
    "name": "Multi-Subject Vehicle Association",
    "category": "ASSET",
    "description": "Commercial vehicle operated or authorized by multiple distinct subjects.",
    "confidenceBase": 0.87,
    "severity": "MEDIUM"
  },
  {
    "id": "RULE_EVENT_WINDOW",
    "name": "Multi-Subject Event Convergence",
    "category": "EVENT",
    "description": "Simultaneous presence of multiple key entities during organized event timelines.",
    "confidenceBase": 0.91,
    "severity": "HIGH"
  },
  {
    "id": "RULE_HIGH_CENTRALITY",
    "name": "High-Degree Hub Entity",
    "category": "TOPOLOGY",
    "description": "Subject maintaining greater than 6 direct heterogeneous relationships.",
    "confidenceBase": 0.84,
    "severity": "MEDIUM"
  },
  {
    "id": "RULE_HAWALA_PATTERN",
    "name": "Informal Value Transfer Chain",
    "category": "FINANCIAL",
    "description": "Coordinated phone contacts between hawala operators preceding known transfer events.",
    "confidenceBase": 0.88,
    "severity": "HIGH"
  },
  {
    "id": "RULE_SHELL_COMPANY",
    "name": "Shell Company Vehicle Registration",
    "category": "ASSET",
    "description": "Vehicles registered to entities with no verifiable commercial operations.",
    "confidenceBase": 0.85,
    "severity": "HIGH"
  }
];
