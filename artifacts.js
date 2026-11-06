// ABI of the deployed Rotary contract (native BOT version) on BOT Chain mainnet.
// The empty create() and join() functions are left out on purpose: join() would clash with join(uint256).
window.ARTIFACTS = {
  main: {
    abi: [
      "function groupCount() view returns (uint256)",
      "function groups(uint256) view returns (address creator, uint256 contribution, uint64 interval, uint8 maxMembers, uint8 status, uint8 round, uint64 startTime)",
      "function getMembers(uint256 id) view returns (address[])",
      "function isMember(uint256, address) view returns (bool)",
      "function deposits(uint256, address) view returns (uint256)",
      "function defaults(uint256, address) view returns (uint8)",
      "function contributed(uint256, uint8, address) view returns (bool)",
      "function paidCount(uint256, uint8) view returns (uint8)",
      "function hasContributed(uint256 id, address a) view returns (bool)",
      "function roundDeadline(uint256 id) view returns (uint256)",
      "function createGroup(uint256 contribution, uint64 interval, uint8 maxMembers) payable returns (uint256 id)",
      "function join(uint256 id) payable",
      "function start(uint256 id)",
      "function leave(uint256 id)",
      "function contribute(uint256 id) payable",
      "function payout(uint256 id)",
      "function withdrawDeposit(uint256 id)",
      "event GroupCreated(uint256 indexed id, address indexed creator, uint256 contribution, uint64 interval, uint8 maxMembers)",
      "event Joined(uint256 indexed id, address indexed member)",
      "event Started(uint256 indexed id)",
      "event Contributed(uint256 indexed id, uint8 round, address indexed member)",
      "event PaidOut(uint256 indexed id, uint8 round, address indexed recipient, uint256 amount)"
    ]
  }
};