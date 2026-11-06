// BOT Chain mainnet deployment
window.APP_CONFIG = {
  "address": "0xC6E71361d8DAAbDf53B9Bb90604EE10f225aE071",
  "slug": "rotary",
  "name": "Rotary",
  "accent": "#c2410c",
  "tagline": "Save together: everyone pays in, one member takes the pot each round.",
  "about": "A rotating savings group (Ajo / Esusu) paid in BOT. Joining costs a deposit equal to one contribution. Each round everyone contributes and one member, in join order, receives the pot. A missed payment is covered by the deposit and recorded as a default.",
  "tokens": [],
  "amountFields": ["contribution"],
  "timeFields": ["startTime"],
  "enums": { "status": ["Open", "Active", "Completed"] },
  "stats": [
    { "label": "Groups", "fn": "groupCount", "fmt": "raw" }
  ],
  "actions": [
    {
      "title": "Create group",
      "fn": "createGroup",
      "desc": "You join automatically and pay the deposit (one contribution) in BOT.",
      "valueCopy": "c",
      "inputs": [
        { "id": "c", "label": "Contribution per round (BOT)", "type": "amount", "default": "10" },
        { "id": "i", "label": "Round length (seconds)", "type": "uint", "default": "604800" },
        { "id": "m", "label": "Max members (2–20)", "type": "uint", "default": "5" }
      ]
    },
    {
      "title": "Join group",
      "fn": "join",
      "desc": "Pays the deposit (one contribution) in BOT.",
      "value": { "fn": "groups", "pick": "contribution" },
      "inputs": [ { "id": "id", "label": "Group ID", "type": "uint", "default": "0" } ]
    },
    {
      "title": "Start early (creator)",
      "fn": "start",
      "inputs": [ { "id": "id", "label": "Group ID", "type": "uint", "default": "0" } ]
    },
    {
      "title": "Leave open group",
      "fn": "leave",
      "desc": "Refunds your deposit. Not available to the creator.",
      "inputs": [ { "id": "id", "label": "Group ID", "type": "uint", "default": "0" } ]
    },
    {
      "title": "Contribute this round",
      "fn": "contribute",
      "desc": "Pays one contribution in BOT.",
      "value": { "fn": "groups", "pick": "contribution" },
      "inputs": [ { "id": "id", "label": "Group ID", "type": "uint", "default": "0" } ]
    },
    {
      "title": "Pay out round",
      "fn": "payout",
      "desc": "When everyone has paid or the round deadline passed.",
      "inputs": [ { "id": "id", "label": "Group ID", "type": "uint", "default": "0" } ]
    },
    {
      "title": "Withdraw deposit",
      "fn": "withdrawDeposit",
      "desc": "After the group completes.",
      "inputs": [ { "id": "id", "label": "Group ID", "type": "uint", "default": "0" } ]
    }
  ],
  "views": [
    {
      "title": "Group details",
      "fn": "groups",
      "inputs": [ { "id": "id", "label": "Group ID", "type": "uint", "default": "0" } ]
    },
    {
      "title": "Members in payout order",
      "fn": "getMembers",
      "inputs": [ { "id": "id", "label": "Group ID", "type": "uint", "default": "0" } ]
    },
    {
      "title": "Round deadline",
      "fn": "roundDeadline",
      "fmt": "time",
      "inputs": [ { "id": "id", "label": "Group ID", "type": "uint", "default": "0" } ]
    },
    {
      "title": "Paid this round?",
      "fn": "hasContributed",
      "inputs": [
        { "id": "id", "label": "Group ID", "type": "uint", "default": "0" },
        { "id": "a", "label": "Address", "type": "address", "meDefault": true }
      ]
    },
    {
      "title": "Deposit held",
      "fn": "deposits",
      "fmt": "token",
      "inputs": [
        { "id": "id", "label": "Group ID", "type": "uint", "default": "0" },
        { "id": "a", "label": "Address", "type": "address", "meDefault": true }
      ]
    },
    {
      "title": "Defaults of a member",
      "fn": "defaults",
      "inputs": [
        { "id": "id", "label": "Group ID", "type": "uint", "default": "0" },
        { "id": "a", "label": "Address", "type": "address", "meDefault": true }
      ]
    }
  ]
};