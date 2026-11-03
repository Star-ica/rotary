// Hardcoded contract address — update after deploy.
// Edit address to point this front end at an existing deployment.
window.APP_CONFIG = {
  "address": "0x0000000000000000000000000000000000000000",
  "slug": "rotary",
  "name": "Rotary",
  "accent": "#c2410c",
  "tagline": "Save together: everyone pays in, one member takes the pot each round.",
  "about": "A rotating savings group (Ajo / Esusu). Joining costs a deposit equal to one contribution. Each round everyone contributes and one member, in join order, receives the pot. A missed payment is covered by the deposit and recorded as a default.",
  "tokens": [
    "token"
  ],
  "deploy": {
    "tokens": [
      {
        "name": "Mock USD",
        "symbol": "mUSD"
      }
    ],
    "args": [
      "$t0"
    ]
  },
  "amountFields": [
    "contribution"
  ],
  "timeFields": [
    "startTime"
  ],
  "enums": {
    "status": [
      "Open",
      "Active",
      "Completed"
    ]
  },
  "stats": [
    {
      "label": "Groups",
      "fn": "groupCount",
      "fmt": "raw"
    }
  ],
  "actions": [
    {
      "title": "Create group",
      "fn": "createGroup",
      "desc": "You join automatically and pay the deposit.",
      "inputs": [
        {
          "id": "c",
          "label": "Contribution per round",
          "type": "amount",
          "default": "10"
        },
        {
          "id": "i",
          "label": "Round length (seconds)",
          "type": "uint",
          "default": "604800"
        },
        {
          "id": "m",
          "label": "Max members",
          "type": "uint",
          "default": "5"
        }
      ]
    },
    {
      "title": "Join group",
      "fn": "join",
      "inputs": [
        {
          "id": "id",
          "label": "Group ID",
          "type": "uint",
          "default": "0"
        }
      ]
    },
    {
      "title": "Start early (creator)",
      "fn": "start",
      "inputs": [
        {
          "id": "id",
          "label": "Group ID",
          "type": "uint",
          "default": "0"
        }
      ]
    },
    {
      "title": "Leave open group",
      "fn": "leave",
      "inputs": [
        {
          "id": "id",
          "label": "Group ID",
          "type": "uint",
          "default": "0"
        }
      ]
    },
    {
      "title": "Contribute this round",
      "fn": "contribute",
      "inputs": [
        {
          "id": "id",
          "label": "Group ID",
          "type": "uint",
          "default": "0"
        }
      ]
    },
    {
      "title": "Pay out round",
      "fn": "payout",
      "desc": "When everyone has paid or the round deadline passed.",
      "inputs": [
        {
          "id": "id",
          "label": "Group ID",
          "type": "uint",
          "default": "0"
        }
      ]
    },
    {
      "title": "Withdraw deposit",
      "fn": "withdrawDeposit",
      "desc": "After the group completes.",
      "inputs": [
        {
          "id": "id",
          "label": "Group ID",
          "type": "uint",
          "default": "0"
        }
      ]
    }
  ],
  "views": [
    {
      "title": "Group details",
      "fn": "groups",
      "inputs": [
        {
          "id": "id",
          "label": "Group ID",
          "type": "uint",
          "default": "0"
        }
      ]
    },
    {
      "title": "Members in payout order",
      "fn": "getMembers",
      "inputs": [
        {
          "id": "id",
          "label": "Group ID",
          "type": "uint",
          "default": "0"
        }
      ]
    },
    {
      "title": "Round deadline",
      "fn": "roundDeadline",
      "inputs": [
        {
          "id": "id",
          "label": "Group ID",
          "type": "uint",
          "default": "0"
        }
      ]
    },
    {
      "title": "Paid this round?",
      "fn": "hasContributed",
      "inputs": [
        {
          "id": "id",
          "label": "Group ID",
          "type": "uint",
          "default": "0"
        },
        {
          "id": "a",
          "label": "Address",
          "type": "address",
          "meDefault": true
        }
      ]
    },
    {
      "title": "Defaults of a member",
      "fn": "defaults",
      "inputs": [
        {
          "id": "id",
          "label": "Group ID",
          "type": "uint",
          "default": "0"
        },
        {
          "id": "a",
          "label": "Address",
          "type": "address",
          "meDefault": true
        }
      ]
    }
  ]
};
